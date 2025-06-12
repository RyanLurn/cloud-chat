import DOMPurify from "dompurify";
import { marked } from "marked";

function MessageContent({ content }: { content: string }) {
  const rawHTML = marked.parse(content || "*Thinking...*") as string;
  const trustedHTML = DOMPurify.sanitize(rawHTML);

  return (
    <div
      className="prose max-w-none prose-zinc dark:prose-invert prose-pre:whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: trustedHTML }}
    />
  );
}

export default MessageContent;
