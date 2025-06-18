import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "backend/_generated/api";
import { useAction, useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";

function KeyManagement() {
  const hasKey = useQuery(api.user.functions.checkKey);
  const revokeKey = useMutation(api.user.functions.revokeOpenRouterKey);
  const saveKey = useAction(api.user.functions.saveOpenRouterKey);

  const [key, setKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  async function handleRevokeKey() {
    try {
      await revokeKey();
      toast.success("Your OpenRouter key has been revoked.");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as string)
          : "Something went wrong";
      toast.error(errorMessage);
    }
  }

  async function handleSaveKey() {
    if (key.trim() === "") return;
    try {
      await saveKey({ key });
      toast.success(
        "Your key has been saved. You can now use OpenRouter models."
      );
      setKey("");
      setIsEditing(false);
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as string)
          : "Something went wrong";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-foreground">API Keys</h2>
        <p className="text-sm text-muted-foreground">
          Manage your API keys for external services
        </p>
      </div>

      {/* Key Management Card */}
      <div className="rounded-lg border bg-card">
        <div className="space-y-6 p-6">
          {/* OpenRouter Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-medium text-card-foreground">
                  OpenRouter API Key
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect your OpenRouter account to access additional models
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    hasKey
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {hasKey ? "Connected" : "Not connected"}
                </div>
              </div>
            </div>

            {/* Key Input Section */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="openrouter-key" className="text-sm font-medium">
                  API Key
                </Label>
                <Input
                  id="openrouter-key"
                  type="password"
                  disabled={!isEditing}
                  placeholder={
                    hasKey
                      ? "••••••••••••••••"
                      : "Enter your OpenRouter API key"
                  }
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  autoFocus={isEditing}
                  className="font-mono text-sm"
                />
                {isEditing && (
                  <p className="text-xs text-muted-foreground">
                    Your API key will be encrypted and stored securely
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        setKey("");
                      }}
                      className="text-sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => void handleSaveKey()}
                      disabled={key.trim() === ""}
                      className="text-sm"
                    >
                      Save key
                    </Button>
                  </>
                ) : hasKey ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => void handleRevokeKey()}
                    className="text-sm"
                  >
                    Revoke key
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-sm"
                  >
                    Add key
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200">
              About OpenRouter API Keys
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              OpenRouter provides access to various AI models. You can get your
              API key from{" "}
              <a
                href="https://openrouter.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                openrouter.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyManagement;
