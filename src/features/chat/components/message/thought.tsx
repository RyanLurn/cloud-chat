import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import MarkdownContent from "@/features/chat/components/message/markdown";
import { memo } from "react";

const ModelThought = memo(function ModelThought({
  thinking
}: {
  thinking: string;
}) {
  return (
    <div className="w-full rounded-lg bg-sidebar px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Model's thought</AccordionTrigger>
          <AccordionContent>
            <MarkdownContent content={thinking} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

export default ModelThought;
