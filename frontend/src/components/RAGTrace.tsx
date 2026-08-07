import { Search, Database, Cpu, MessageCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type TraceStage = "idle" | "query" | "retrieve" | "generate" | "respond";

const STAGES: { id: Exclude<TraceStage, "idle">; label: string; icon: typeof Search }[] = [
  { id: "query", label: "Query", icon: Search },
  { id: "retrieve", label: "Retrieve", icon: Database },
  { id: "generate", label: "Generate", icon: Cpu },
  { id: "respond", label: "Respond", icon: MessageCircle },
];

export type TraceTimings = {
  retrieve_ms?: number;
  chunk_count?: number;
  generate_ms?: number;
  total_ms?: number;
};

export default function RAGTrace({ stage, timings }: { stage: TraceStage; timings: TraceTimings }) {
  const currentIndex = stage === "idle" ? -1 : STAGES.findIndex((s) => s.id === stage);
  const allDone = stage === "respond"; // once "respond" arrives the whole pipeline finished

  function detailFor(id: string): string | null {
    if (id === "retrieve" && timings.retrieve_ms !== undefined) {
      return `${timings.retrieve_ms}ms · ${timings.chunk_count ?? 0} chunks`;
    }
    if (id === "generate" && timings.generate_ms !== undefined) {
      return `${timings.generate_ms}ms`;
    }
    if (id === "respond" && timings.total_ms !== undefined) {
      return `${timings.total_ms}ms total`;
    }
    return null;
  }

  return (
    <div className="px-6 py-4 border-b border-border bg-muted/20">
      <div className="flex items-center">
        {STAGES.map((s, i) => {
          const reached = currentIndex >= i;
          const isActive = !allDone && i === currentIndex;
          const showCheck = allDone ? reached : i < currentIndex;
          const detail = detailFor(s.id);
          const Icon = s.icon;

          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full border flex items-center justify-center transition-all duration-300",
                    reached
                      ? "bg-accent/15 border-accent text-accent"
                      : "bg-muted border-border text-muted-foreground/50",
                    isActive && "animate-pulse shadow-[0_0_16px_-2px_hsl(var(--accent)/0.6)]"
                  )}
                >
                  {showCheck ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                </div>
                <div className="text-center">
                  <p
                    className={cn(
                      "text-[10px] font-mono uppercase tracking-wider",
                      reached ? "text-foreground" : "text-muted-foreground/50"
                    )}
                  >
                    {s.label}
                  </p>
                  {detail && (
                    <p className="text-[9px] font-mono text-accent whitespace-nowrap">{detail}</p>
                  )}
                </div>
              </div>

              {i < STAGES.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 mx-2 mb-5 transition-colors duration-300",
                    currentIndex > i ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}