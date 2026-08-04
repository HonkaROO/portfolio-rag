import { Cpu, Zap, Sparkles, Server, Component, Network } from "lucide-react";
import SectionKicker from "@/components/SectionKicker";
import Reveal from "@/components/Reveal";
import { aiStack } from "@/data/resume";

// Icon per technology - generic/lucide, not brand logos (avoids trademark
// reproduction issues while still giving each item a visual anchor).
const ICONS: Record<string, typeof Cpu> = {
  "Azure AI Foundry": Cpu,
  Groq: Zap,
  Gemini: Sparkles,
  FastAPI: Server,
  React: Component,
  Supabase: Server,
  "ASP.NET Core": Server,
  RAG: Network,
};

export default function AIStack() {
  return (
    <section id="stack" className="scroll-anchor section-fade-top border-b border-border section-alt">
      <div className="container py-14 lg:py-16">
        <SectionKicker index="04" question="What he specializes in" />
        <h2 className="font-display text-2xl font-bold mb-2">Powered by</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl">
          The technologies actually running this site — the same stack behind the RAG chatbot below.
        </p>

        <div className="flex flex-wrap gap-3">
          {aiStack.map((tech, i) => {
            const Icon = ICONS[tech] ?? Cpu;
            return (
              <Reveal key={tech} delay={i * 60}>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card hover:border-accent hover:shadow-[0_0_20px_-6px_hsl(var(--accent)/0.4)] hover:-translate-y-0.5 hover:scale-[1.03] transition-all duration-200">
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-mono">{tech}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}