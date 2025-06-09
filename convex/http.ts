import { httpRouter } from "convex/server";
import userEndpointHandler from "backend/auth/webhook/userEndpointHandler";

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: userEndpointHandler
});

export default http;
