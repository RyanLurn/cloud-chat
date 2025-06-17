import { api, internal } from "backend/_generated/api";
import {
  action,
  httpAction,
  internalMutation,
  query
} from "backend/_generated/server";
import { ConvexError, v } from "convex/values";
import {
  APICallError,
  generateText,
  JSONValue,
  LanguageModel,
  streamText
} from "ai";
import { groq } from "backend/ai/providers/groq";
import {
  formatPromptForTitleGenerator,
  titleGeneratorPrompt
} from "backend/ai/prompts/titleGenerator";
import {
  getCurrentIdentity,
  getCurrentUser
} from "backend/auth/lib/authenticate";
import { AiStreamRequestBody } from "backend/ai/lib/validator";
import { Id } from "backend/_generated/dataModel";
import { hasDelimiter } from "backend/ai/lib/utils";
import getChatAccess from "backend/chat/lib/authorize";
import decrypt from "backend/lib/crypto/decrypt";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const generateChatTitle = action({
  args: {
    chatId: v.id("chats"),
    firstMessageContent: v.string()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await getCurrentIdentity(ctx);

    const formattedPrompt = formatPromptForTitleGenerator({
      assistantPrompt: null,
      firstMessageContent: args.firstMessageContent
    });

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      system: titleGeneratorPrompt,
      prompt: formattedPrompt
    });

    await ctx.runMutation(api.chat.functions.updateChatTitle, {
      chatId: args.chatId,
      newTitle: text
    });
  }
});

const prepareAiPayload = query({
  args: {
    chatId: v.id("chats")
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    const chat = await getChatAccess({ ctx, chatId: args.chatId });

    let openRouterKey: string | undefined = undefined;
    if (chat.model.provider === "openrouter") {
      if (user.openRouterKey) {
        openRouterKey = await decrypt(user.openRouterKey);
      } else {
        throw new ConvexError(
          "This provider requires bringing your own key. Please add it before proceeding."
        );
      }
    }

    const allMessages = await ctx.db
      .query("messages")
      .withIndex("by_chatId", (query) => query.eq("chatId", chat._id))
      .collect();

    const messages = allMessages.slice(0, -1);

    return {
      chat,
      openRouterKey,
      messages
    };
  }
});

const finishStream = internalMutation({
  args: {
    assistantMessageId: v.id("messages"),
    finalContent: v.string(),
    streamId: v.id("streams")
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.assistantMessageId, {
      content: args.finalContent,
      streamId: null
    });
    await ctx.db.delete(args.streamId);
  }
});

const aiStreamEndpointHandler = httpAction(async (ctx, req) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await req.json();

  const result = AiStreamRequestBody.safeParse(body);
  if (!result.success) {
    console.error("Invalid request body", body);
    return new Response("Invalid request body", { status: 400 });
  }

  const { assistantMessageId, streamId, chatId, isResumable } = result.data;

  try {
    const { chat, openRouterKey, messages } = await ctx.runQuery(
      api.ai.functions.prepareAiPayload,
      {
        chatId: chatId as Id<"chats">
      }
    );

    const provider = chat.model.provider;
    let model: LanguageModel;
    let providerOptions: Record<string, Record<string, JSONValue>> | undefined =
      undefined;
    if (provider === "openrouter") {
      const openrouter = createOpenRouter({
        apiKey: openRouterKey
      });
      model = openrouter.chat(chat.model.name);
      if (chat.model.name === "openai/o4-mini") {
        providerOptions = {
          openrouter: {
            reasoning: {
              effort: "low",
              summary: "auto"
            }
          }
        };
      }
    } else {
      model = groq(chat.model.name);
      if (chat.model.name === "deepseek-r1-distill-llama-70b") {
        providerOptions = {
          groq: { reasoningFormat: "parsed" }
        };
      }
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const textEncoder = new TextEncoder();

    async function streamAiResponse() {
      let content: string = "";
      let thinkStatus: "started" | "ended" | null = null;
      try {
        const { fullStream } = streamText({
          model,
          providerOptions,
          messages
        });

        for await (const streamPart of fullStream) {
          if (streamPart.type === "reasoning") {
            if (thinkStatus === null) {
              content += "<think>";
              await writer.write(textEncoder.encode("<think>"));
              thinkStatus = "started";
            }
          } else if (streamPart.type === "text-delta") {
            if (thinkStatus === "started") {
              content += "</think>";
              await writer.write(textEncoder.encode("</think>"));
              thinkStatus = "ended";
            }
          } else {
            continue;
          }
          content += streamPart.textDelta;
          await writer.write(textEncoder.encode(streamPart.textDelta));

          if (!isResumable) {
            continue;
          }

          if (hasDelimiter(streamPart.textDelta)) {
            await ctx.runMutation(internal.stream.functions.updateContent, {
              streamId: streamId as Id<"streams">,
              newContent: content
            });
          }
        }

        await ctx.runMutation(internal.ai.functions.finishStream, {
          assistantMessageId: assistantMessageId as Id<"messages">,
          finalContent: content,
          streamId: streamId as Id<"streams">
        });

        await writer.close();
      } catch (error) {
        if (error instanceof APICallError) {
          console.error("AI call error", error);
          return new Response("Something went wrong", { status: 500 });
        }
      }
    }

    void streamAiResponse();

    return new Response(readable, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Vary: "origin"
      }
    });
  } catch (error) {
    if (error instanceof ConvexError) {
      console.error("Convex error occured", error.data as string);
      return new Response(error.data as string, { status: 400 });
    } else {
      console.error("Unknown error occured", error);
      return new Response("Something went wrong", { status: 500 });
    }
  }
});

export {
  generateChatTitle,
  prepareAiPayload,
  finishStream,
  aiStreamEndpointHandler
};
