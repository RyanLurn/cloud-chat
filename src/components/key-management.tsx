import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
        "Your has been key saved. You can now use OpenRouter models."
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
    <div className="flex w-full flex-col gap-y-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        API Keys
      </h3>
      <Separator />
      <div className="flex w-full gap-x-2">
        <Label htmlFor="openrouter-key">OpenRouter key</Label>
        <Input
          id="openrouter-key"
          disabled={!isEditing}
          placeholder={hasKey ? "************" : "No key"}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          autoFocus={isEditing}
        />
        {hasKey ? (
          <Button variant="destructive" onClick={() => void handleRevokeKey()}>
            Revoke key
          </Button>
        ) : isEditing ? (
          <Button onClick={() => void handleSaveKey()}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Add key</Button>
        )}
      </div>
    </div>
  );
}

export default KeyManagement;
