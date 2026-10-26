import styles from "./FAQ.module.css";
import { Minus, Plus, Separator } from "@dust-tt/sparkle";
import { H2 } from "@marketing/components/home/ContentComponents";
import { cn } from "@marketing/components/poke/shadcn/lib/utils";
import type { ReactNode } from "react";
import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: ReactNode;
}

interface FAQProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

interface FAQItemComponentProps {
  item: FAQItem;
  defaultOpen?: boolean;
}

function FAQItemComponent({
  item,
  defaultOpen = false,
}: FAQItemComponentProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.item}>
      <button
        className={styles.question}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-foreground">
          {item.question}
        </span>
        <span
          className={`ml-6 flex h-6 w-6 flex-shrink-0 items-center justify-center text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? (
            <Minus className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6">
            <div className={styles.answer}>{item.answer}</div>
          </div>
        </div>
      </div>
      <Separator className={styles.divider} />
    </div>
  );
}

export function FAQ({ title = "FAQ", items, className }: FAQProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="w-full">
        <H2 className="mb-12 text-left text-foreground">{title}</H2>
        <div className="w-full">
          {items.map((item, index) => (
            <FAQItemComponent
              key={index}
              item={item}
              defaultOpen={false} // All items closed by default
            />
          ))}
        </div>
      </div>
    </div>
  );
}
