import { marked } from "marked";
import DOMPurify from "dompurify";

function MarkdownContent({ content }: { content: string }) {
  const renderer = new marked.Renderer();
  renderer.html = ({ text }: { text: string }) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const rawHTML = marked.parse(content, { renderer }) as string;
  const trustedHTML = DOMPurify.sanitize(rawHTML);
  return (
    <div
      className="prose max-w-none prose-zinc dark:prose-invert prose-pre:whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ __html: trustedHTML }}
    />
  );
}

export default MarkdownContent;
