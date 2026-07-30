import { profile } from "@/data/resume";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="top" className="border-b border-border">
      <div className="container py-24 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
            &gt; whoami
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] mb-6">
            {profile.name}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-8">
            {profile.summary}
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <a href="#chat">Ask Honka!, my AI assistant</a>
            </Button>
            <Button variant="outline" asChild>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>

        {/* Signature element: a schematic request trace, echoing the RAG
            pipeline this site is built on (query -> retrieve -> generate). */}
        <svg viewBox="0 0 320 220" className="w-full max-w-sm mx-auto" role="img" aria-label="Request trace diagram">
          <line x1="30" y1="40" x2="30" y2="180" stroke="hsl(var(--border))" strokeWidth="1" />
          {["query", "retrieve", "generate", "respond"].map((label, i) => (
            <g key={label}>
              <circle cx="30" cy={40 + i * 46} r="5" fill="hsl(var(--accent))" opacity={0.9 - i * 0.15} />
              <text x="48" y={44 + i * 46} className="font-mono" fontSize="12" fill="hsl(var(--muted-foreground))">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
