import { experience } from "@/data/resume";
import Reveal from "@/components/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="scroll-anchor border-b border-border">
      <div className="container py-20">
        <h2 className="font-display text-2xl font-bold mb-10">Experience</h2>
        <div className="space-y-10">
          {experience.map((job) => (
            <Reveal key={job.company} className="grid md:grid-cols-[220px_1fr] gap-4">
              <div>
                <p className="font-display font-medium">{job.role}</p>
                <p className="text-sm text-muted-foreground">{job.company}</p>
                <p className="font-mono text-xs text-accent mt-1">{job.period}</p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                {job.bullets.map((b, i) => (
                  <li key={i} className="pl-4 border-l border-border">
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
