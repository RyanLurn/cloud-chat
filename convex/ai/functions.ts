import { api, internal } from "backend/_generated/api";
import { action, httpAction } from "backend/_generated/server";
import { ConvexError, v } from "convex/values";
import { APICallError, generateText, streamText } from "ai";
import groq from "backend/ai/providers/groq";
import {
  formatPromptForTitleGenerator,
  titleGeneratorPrompt
} from "backend/ai/prompts/titleGenerator";
import { getCurrentIdentity } from "backend/auth/lib/authenticate";
import { Id } from "backend/_generated/dataModel";
import { AiStreamRequestBody } from "backend/ai/lib/validator";
import { hasDelimiter } from "backend/ai/lib/utils";

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

const aiStreamEndpointHandler = httpAction(async (ctx, req) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await req.json();

  const result = AiStreamRequestBody.safeParse(body);
  if (!result.success) {
    console.error("Invalid request body", body);
    return new Response("Invalid request body", { status: 400 });
  }

  const { streamMessageId, chatId } = result.data;
  console.log("streamMessageId", streamMessageId);

  try {
    const messages = await ctx.runQuery(
      api.message.functions.listMessagesFromChat,
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
          model: groq("llama-3.1-8b-instant"),
          messages
        });

        for await (const text of textStream) {
          content += text;
          await writer.write(textEncoder.encode(text));

          if (hasDelimiter(text)) {
            await ctx.runMutation(
              internal.message.functions.updateStreamMessage,
              {
                streamMessageId: streamMessageId as Id<"messages">,
                text: content
              }
            );
          }
        }

        await ctx.runMutation(internal.message.functions.updateStreamMessage, {
          streamMessageId: streamMessageId as Id<"messages">,
          text: content
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

export { generateChatTitle, aiStreamEndpointHandler };
