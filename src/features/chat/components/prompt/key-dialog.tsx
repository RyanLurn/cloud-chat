import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ModelSelection from "@/features/chat/components/prompt/model-selection";
import { api } from "backend/_generated/api";
import { useAction } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";

function KeyDialog() {
  const [key, setKey] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const saveOpenRouterKey = useAction(api.user.functions.saveOpenRouterKey);

  function openDialog() {
    setOpen(true);
  }

  async function handleSaveKey() {
    try {
      await saveOpenRouterKey({ key });
      toast.success(
        `Your has been key saved. You can now use OpenRouter models.`
      );
      setOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError
          ? (error.data as string)
          : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setKey("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ModelSelection openDialog={openDialog} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter your OpenRouter key</DialogTitle>
          <DialogDescription>
            OpenRouter models require you to bring your own API key.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="OpenRouter key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild onClick={() => setKey("")}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => void handleSaveKey()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default KeyDialog;
