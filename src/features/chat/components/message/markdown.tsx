import { marked } from "marked";
import DOMPurify from "dompurify";

function MarkdownContent({ content }: { content: string }) {
  const rawHTML = marked.parse(content) as string;
  const trustedHTML = DOMPurify.sanitize(rawHTML);
  return (
    <div
      className="prose max-w-none prose-zinc dark:prose-invert prose-pre:whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: trustedHTML }}
    />
  );
}

export default MarkdownContent;
