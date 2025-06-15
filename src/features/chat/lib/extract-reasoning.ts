interface ThinkTagResult {
  thinking: string;
  response: string;
  isThinking: boolean; // Whether we're currently inside an unclosed <think> tag
}

function extractReasoning(input: string): ThinkTagResult {
  // Regular expression to match complete <think>...</think> tags
  const completeThinkRegex = /<think>([\s\S]*?)<\/think>/g;

  // Regular expression to match incomplete <think> tag (no closing tag yet)
  const incompleteThinkRegex = /<think>([\s\S]*)$/;

  let thinking = "";
  let response = input;
  let isThinking = false;

  // First, find all complete thinking sections
  const completeMatches = input.matchAll(completeThinkRegex);
  const completedThinkingSections: string[] = [];

  for (const match of completeMatches) {
    completedThinkingSections.push(match[1].trim());
  }

  // Remove all complete <think>...</think> blocks from the response
  response = input.replace(completeThinkRegex, "");

  // Check for incomplete <think> tag (for streaming)
  const incompleteMatch = response.match(incompleteThinkRegex);

  if (incompleteMatch) {
    // We have an unclosed <think> tag
    isThinking = true;
    const incompleteThinking = incompleteMatch[1];

    // Add the incomplete thinking to our sections
    if (incompleteThinking.trim()) {
      completedThinkingSections.push(incompleteThinking.trim());
    }

    // Remove the incomplete <think> block from response
    response = response.replace(incompleteThinkRegex, "");
  }

  // Combine all thinking sections
  thinking = completedThinkingSections.join("\n\n");

  response = response.trim();

  return {
    thinking,
    response,
    isThinking
  };
}

export default extractReasoning;
