import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import OpenRouterGroup from "@/features/chat/components/prompt/groups/openrouter";
import ChatContext from "@/features/chat/contexts/chat";
import { api } from "backend/_generated/api";
import type { SupportedModelType } from "backend/ai/lib/models";
import { useMutation, useQuery } from "convex/react";
import { useContext } from "react";

function ModelSelection({
  isDisabled,
  openDialog
}: {
  isDisabled: boolean;
  openDialog: () => void;
}) {
  const chat = useContext(ChatContext);
  const changeChatModel = useMutation(api.chat.functions.changeModel);
  const userModel = useQuery(api.user.functions.getModel);
  const hasKey = useQuery(api.user.functions.checkKey);
  const changeUserModel = useMutation(api.user.functions.changeModel);

  const currentModelName = chat ? chat.model.name : userModel?.name;

  async function handleModelChange(modelName: string) {
    if (modelName === currentModelName) return;

    let newModel: SupportedModelType;
    switch (modelName) {
      case "meta-llama/llama-4-maverick-17b-128e-instruct":
        newModel = {
          provider: "groq",
          name: "meta-llama/llama-4-maverick-17b-128e-instruct"
        };
        break;
      case "deepseek-r1-distill-llama-70b":
        newModel = {
          provider: "groq",
          name: "deepseek-r1-distill-llama-70b"
        };
        break;
      case "openai/o4-mini": {
        if (hasKey === false) {
          openDialog();
          return;
        }
        newModel = {
          provider: "openrouter",
          name: "openai/o4-mini"
        };
        break;
      }
      case "anthropic/claude-sonnet-4": {
        if (hasKey === false) {
          openDialog();
          return;
        }
        newModel = {
          provider: "openrouter",
          name: "anthropic/claude-sonnet-4"
        };
        break;
      }
      default:
        newModel = {
          provider: "groq",
          name: "meta-llama/llama-4-maverick-17b-128e-instruct"
        };
    }
    if (chat) {
      await changeChatModel({ chatId: chat._id, newModel });
    } else {
      await changeUserModel({ newModel });
    }
  }

  return (
    <Select
      value={currentModelName}
      onValueChange={(modelName) => void handleModelChange(modelName)}
      disabled={isDisabled}
    >
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <OpenRouterGroup />
        <SelectGroup>
          <SelectLabel>From Groq</SelectLabel>
          <SelectItem value="meta-llama/llama-4-maverick-17b-128e-instruct">
            Llama 4 Maverick
          </SelectItem>
          <SelectItem value="deepseek-r1-distill-llama-70b">
            DeepSeek R1 (Llama Distilled)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ModelSelection;
