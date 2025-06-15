import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function ModelSelection() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select an AI model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>From OpenRouter</SelectLabel>
          <SelectItem value="openai/o4-mini">OpenAI o4-mini</SelectItem>
          <SelectItem value="anthropic/claude-sonnet-4">
            Claude Sonnet 4
          </SelectItem>
          <SelectItem value="google/gemini-2.5-pro-preview">
            Gemini 2.5 Pro Preview
          </SelectItem>
          <SelectItem value="deepseek/deepseek-r1-0528">
            DeepSeek R1 05/28
          </SelectItem>
        </SelectGroup>
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
