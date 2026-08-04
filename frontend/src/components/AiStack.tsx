import { Cpu, Zap, Sparkles, Server, Component, Network } from "lucide-react";
import SectionKicker from "@/components/SectionKicker";
import Reveal from "@/components/Reveal";
import { aiStack } from "@/data/resume";

// Icon + one-line role per technology - generic/lucide icons, not brand
// logos (avoids trademark reproduction issues while still giving each
// item a clear visual anchor and reason it's on the list).
const STACK_INFO: Record<string, { icon: typeof Cpu; role: string }> = {
  "Azure AI Foundry": { icon: Cpu, role: "Model orchestration & AI certification" },
  Groq: { icon: Zap, role: "Primary LLM — fast, free-tier inference" },
  Gemini: { icon: Sparkles, role: "Fallback LLM — automatic failover" },
  FastAPI: { icon: Server, role: "RAG backend & retrieval API" },
  React: { icon: Component, role: "Frontend & this chat interface" },
  Supabase: { icon: Server, role: "Postgres + pgvector store" },
  "ASP.NET Core": { icon: Server, role: "Production backend systems" },
  RAG: { icon: Network, role: "Retrieval-augmented generation pipeline" },
};

export default function AIStack() {
  return (
    <section id="stack" className="scroll-anchor section-fade-top border-b border-border section-alt">
      <div className="container py-14 lg:py-16">
        <SectionKicker index="05" question="What he specializes in" />
        <h2 className="font-display text-2xl font-bold mb-2">Powered by</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl">
          The technologies actually running this site — the same stack behind the RAG chatbot below.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {aiStack.map((tech, i) => {
            const info = STACK_INFO[tech] ?? { icon: Cpu, role: "" };
            const Icon = info.icon;
            return (
              <Reveal key={tech} delay={i * 60}>
                <div className="h-full p-5 rounded-xl border border-border bg-card hover:border-accent hover:shadow-[0_0_24px_-6px_hsl(var(--accent)/0.4)] hover:-translate-y-1 transition-all duration-200">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <p className="font-display font-medium text-sm mb-1">{tech}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{info.role}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}