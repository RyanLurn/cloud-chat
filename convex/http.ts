import { httpRouter } from "convex/server";
import userEndpointHandler from "backend/auth/webhook/userEndpointHandler";
import { aiStreamEndpointHandler } from "backend/ai/functions";
import { httpAction } from "backend/_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: userEndpointHandler
});

http.route({
  path: "/chat",
  method: "POST",
  handler: aiStreamEndpointHandler
});

http.route({
  path: "/chat",
  method: "OPTIONS",
  // eslint-disable-next-line @typescript-eslint/require-await
  handler: httpAction(async (_, request) => {
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Authorization, Content-Type, Digest",
          "Access-Control-Max-Age": "86400"
        })
      });
    } else {
      return new Response();
    }
  })
});

export default http;
