import { api, internal } from "backend/_generated/api";
import {
  action,
  httpAction,
  internalMutation,
  query
} from "backend/_generated/server";
import { ConvexError, v } from "convex/values";
import { APICallError, generateText, streamText } from "ai";
import { groq, groqOptions } from "backend/ai/providers/groq";
import {
  formatPromptForTitleGenerator,
  titleGeneratorPrompt
} from "backend/ai/prompts/titleGenerator";
import { getCurrentIdentity } from "backend/auth/lib/authenticate";
import { AiStreamRequestBody } from "backend/ai/lib/validator";
import { Id } from "backend/_generated/dataModel";
import { hasDelimiter } from "backend/ai/lib/utils";
import getChatAccess from "backend/chat/lib/authorize";

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
    const chat = await getChatAccess({ ctx, chatId: args.chatId });

    const allMessages = await ctx.db
      .query("messages")
      .withIndex("by_chatId", (query) => query.eq("chatId", chat._id))
      .collect();

    const messages = allMessages.slice(0, -1);

    return {
      chat,
      messages
    };
  }
});

const finishStream = internalMutation({
  args: {
    assistantMessageId: v.id("messages"),
    finalContent: v.string()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.assistantMessageId, {
      content: args.finalContent,
      isStreaming: false
    });
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
    const { chat, messages } = await ctx.runQuery(
      api.ai.functions.prepareAiPayload,
      {
        chatId: chatId as Id<"chats">
      }
    );

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const textEncoder = new TextEncoder();

    async function streamAiResponse() {
      let content: string = "";
      try {
        const { textStream } = streamText({
          model: groq(chat.model.name),
          providerOptions:
            chat.model.name === "deepseek-r1-distill-llama-70b"
              ? {
                  groq: groqOptions
                }
              : undefined,
          messages
        });

        for await (const text of textStream) {
          content += text;
          await writer.write(textEncoder.encode(text));

          if (!isResumable) {
            continue;
          }

          if (hasDelimiter(text)) {
            await ctx.runMutation(internal.stream.functions.updateContent, {
              streamId: streamId as Id<"streams">,
              newContent: content
            });
          }
        }

        await ctx.runMutation(internal.ai.functions.finishStream, {
          assistantMessageId: assistantMessageId as Id<"messages">,
          finalContent: content
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
