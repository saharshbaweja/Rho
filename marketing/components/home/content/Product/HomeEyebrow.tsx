import { cn } from "@marketing/components/poke/shadcn/lib/utils";

interface HomeEyebrowProps {
  label: string;
  className?: string;
}

export function HomeEyebrow({ label, className }: HomeEyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 w-fit items-center gap-2 rounded-full border border-border bg-muted-background px-3 text-xs font-medium uppercase tracking-[0.06em] text-muted-foreground",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#b8d7e8]" />
      {label}
    </span>
  );
}
