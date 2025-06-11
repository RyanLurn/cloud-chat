import { api } from "backend/_generated/api";
import { action } from "backend/_generated/server";
import { v } from "convex/values";
import { generateText } from "ai";
import groq from "backend/ai/providers/groq";
import {
  formatPromptForTitleGenerator,
  titleGeneratorPrompt
} from "backend/ai/prompts/titleGenerator";

const generateChatTitle = action({
  args: {
    chatId: v.id("chats"),
    firstMessageContent: v.string()
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await ctx.runQuery(api.chat.functions.getChatById, {
      chatId: args.chatId
    });

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
      chatId: chat._id,
      newTitle: text
    });
  }
});

export { generateChatTitle };
