import { SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

const supportedSelections = [
  {
    label: "OpenAI o4-mini",
    value: "openai/o4-mini"
  },
  {
    label: "Claude Sonnet 4",
    value: "anthropic/claude-sonnet-4"
  }
];

function OpenRouterGroup() {
  return (
    <SelectGroup>
      <SelectLabel>OpenRouter</SelectLabel>
      {supportedSelections.map((selection) => (
        <SelectItem key={selection.value} value={selection.value}>
          {selection.label}
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

export default OpenRouterGroup;
