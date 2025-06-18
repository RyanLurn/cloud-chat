# Cloud Chat

A T3 Chat Cloneathon project

## Features

### Chat with Various LLMs

Currently support:

- Llama 4 Maverick and DeepSeek R1 (Llama Distilled) through Groq
- OpenAI o4-mini and Claude Sonnet 4 through OpenRouter with user's own key

### Authentication & Sync

- Clerk Auth and Convex Sync.
- Webhook event to store user info in Convex.
- Currently, Clerk auth is in development mode.

### Browser Friendly

It's a web app.

### Easy to Try

1. Visit this url: [cloud-chat-nu.vercel.app](https://cloud-chat-nu.vercel.app/)
2. Create an account.
3. Start using Cloud Chat.

### Bring Your Own Key

- For OpenAI o4-mini and Claude Sonnet 4, the user needs to provide their own OpenRouter key.
- The key is verified with OpenRouter before being encrypted.
- The key is encrypted and stored in the database.
- The user can revoke their key through a custom page in the Clerk UserProfile component.

### Resumable Streams

- Continue generation after page refresh.
- HTTP streams aren't lost upon navigation.
- Resumable streams have the same words-by-words rendering effect as HTTP streams.

## Gotchas

These are known issues that I'm aware of. If you find any others, please let me know through the issues page. You can also DM me here: https://x.com/theryanlurn

### Chat with Various LLMs

- The thinking effort level of OpenAI o4-mini and Claude Sonnet 4 is set to "low". Right now, there's no way to change this in the UI.
- When fast models from Groq are used, sometimes, it's hard to stop auto-scrolling.
- If the model providers are down, currently, error handling for this case is not robust enough.

### Authentication

- Auth is currently in development mode. OAuth will say that the user signs up/ logs in to Clerk, not Cloud Chat. Plus other issues come with dev vs prod. You can read more about the difference here: https://clerk.com/docs/deployments/environments
- Currently, there's no proper error handling if somehow auth fails. Clerk stands in front of the app. If it fails, the app will crash.

### Browser Friendly

- Has only tested on Chrome.

### Bring Your Own Key

- I'll be honest. This is the first time I implement encryption. I don't know if it's secure enough.
- The cryptography part is in convex/lib/crypto directory for you to check.

### The codebase is not pretty

- I wanted to do too much and end up with a mess. Especially the client-side global states, they are all over the places.
- I will write a doc for the judges or anyone who wants to navigate the repo. But I'm sorry that it would have to be after the time limit of the cloneathon.

## In the near future

- In the next 3 days, I will write a documentation and comments for anyone who wants to navigate the codebase and develop Cloud Chat to something of their own.
- After that, I will have a zoomed out look of the codebase. Because I want to change it to something more maintainable and easy for other people to work in.
- I'm actually considering a rewrite though because I made so many questionable decisions. But we'll see how the analysis goes.

## License

Cloud Chat is MIT Licensed.
