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
import type * as features_auth_env from "../features/auth/env.js";
import type * as features_auth_webhook_userEndpointHandler from "../features/auth/webhook/userEndpointHandler.js";
import type * as features_auth_webhook_verifyWebhook from "../features/auth/webhook/verifyWebhook.js";
import type * as http from "../http.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "features/auth/env": typeof features_auth_env;
  "features/auth/webhook/userEndpointHandler": typeof features_auth_webhook_userEndpointHandler;
  "features/auth/webhook/verifyWebhook": typeof features_auth_webhook_verifyWebhook;
  http: typeof http;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
