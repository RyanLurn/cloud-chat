/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ai_functions from "../ai/functions.js";
import type * as ai_lib_env from "../ai/lib/env.js";
import type * as ai_lib_models from "../ai/lib/models.js";
import type * as ai_lib_utils from "../ai/lib/utils.js";
import type * as ai_lib_validator from "../ai/lib/validator.js";
import type * as ai_prompts_titleGenerator from "../ai/prompts/titleGenerator.js";
import type * as ai_providers_groq from "../ai/providers/groq.js";
import type * as auth_functions from "../auth/functions.js";
import type * as auth_lib_authenticate from "../auth/lib/authenticate.js";
import type * as auth_lib_env from "../auth/lib/env.js";
import type * as auth_webhook_userEndpointHandler from "../auth/webhook/userEndpointHandler.js";
import type * as auth_webhook_verifyWebhook from "../auth/webhook/verifyWebhook.js";
import type * as chat_functions from "../chat/functions.js";
import type * as chat_lib_authorize from "../chat/lib/authorize.js";
import type * as http from "../http.js";
import type * as lib_systemFields from "../lib/systemFields.js";
import type * as message_functions from "../message/functions.js";
import type * as message_lib_authorize from "../message/lib/authorize.js";
import type * as stream_functions from "../stream/functions.js";
import type * as user_functions from "../user/functions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "ai/functions": typeof ai_functions;
  "ai/lib/env": typeof ai_lib_env;
  "ai/lib/models": typeof ai_lib_models;
  "ai/lib/utils": typeof ai_lib_utils;
  "ai/lib/validator": typeof ai_lib_validator;
  "ai/prompts/titleGenerator": typeof ai_prompts_titleGenerator;
  "ai/providers/groq": typeof ai_providers_groq;
  "auth/functions": typeof auth_functions;
  "auth/lib/authenticate": typeof auth_lib_authenticate;
  "auth/lib/env": typeof auth_lib_env;
  "auth/webhook/userEndpointHandler": typeof auth_webhook_userEndpointHandler;
  "auth/webhook/verifyWebhook": typeof auth_webhook_verifyWebhook;
  "chat/functions": typeof chat_functions;
  "chat/lib/authorize": typeof chat_lib_authorize;
  http: typeof http;
  "lib/systemFields": typeof lib_systemFields;
  "message/functions": typeof message_functions;
  "message/lib/authorize": typeof message_lib_authorize;
  "stream/functions": typeof stream_functions;
  "user/functions": typeof user_functions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
