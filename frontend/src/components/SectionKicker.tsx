import { cn } from "@/lib/utils";
export default function SectionKicker({
  index,
  question,
  className,
}: {
  index: string; // e.g. "01"
  question: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 mb-4", className)}>
      <span className="font-mono text-xs text-accent">{index}</span>
      <span className="h-px w-8 bg-border" />
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
        {question}
      </span>
    </div>
  );
}