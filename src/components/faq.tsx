import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  title: string;
  items: FaqItem[];
};

export default function Faq({ title, items }: FaqProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
            {title}
          </h2>
        </div>
      )}
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
