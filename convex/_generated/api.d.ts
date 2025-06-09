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
  FunctionReference
} from "convex/server";
import type * as auth_functions from "../auth/functions.js";
import type * as auth_lib_authenticate from "../auth/lib/authenticate.js";
import type * as auth_lib_env from "../auth/lib/env.js";
import type * as auth_webhook_userEndpointHandler from "../auth/webhook/userEndpointHandler.js";
import type * as auth_webhook_verifyWebhook from "../auth/webhook/verifyWebhook.js";
import type * as chat_functions from "../chat/functions.js";
import type * as chat_lib_authorize from "../chat/lib/authorize.js";
import type * as http from "../http.js";
import type * as lib_systemFields from "../lib/systemFields.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "auth/functions": typeof auth_functions;
  "auth/lib/authenticate": typeof auth_lib_authenticate;
  "auth/lib/env": typeof auth_lib_env;
  "auth/webhook/userEndpointHandler": typeof auth_webhook_userEndpointHandler;
  "auth/webhook/verifyWebhook": typeof auth_webhook_verifyWebhook;
  "chat/functions": typeof chat_functions;
  "chat/lib/authorize": typeof chat_lib_authorize;
  http: typeof http;
  "lib/systemFields": typeof lib_systemFields;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
