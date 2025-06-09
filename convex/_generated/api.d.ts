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
import type * as auth_functions from "../auth/functions.js";
import type * as auth_lib_env from "../auth/lib/env.js";
import type * as auth_lib_utils from "../auth/lib/utils.js";
import type * as auth_webhook_userEndpointHandler from "../auth/webhook/userEndpointHandler.js";
import type * as auth_webhook_verifyWebhook from "../auth/webhook/verifyWebhook.js";
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
  "auth/lib/env": typeof auth_lib_env;
  "auth/lib/utils": typeof auth_lib_utils;
  "auth/webhook/userEndpointHandler": typeof auth_webhook_userEndpointHandler;
  "auth/webhook/verifyWebhook": typeof auth_webhook_verifyWebhook;
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
