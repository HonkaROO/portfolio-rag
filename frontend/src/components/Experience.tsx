import { experience, certifications } from "@/data/resume";
import Reveal from "@/components/Reveal";
import SectionKicker from "@/components/SectionKicker";

export default function Experience() {
  return (
    <section id="experience" className="scroll-anchor section-fade-top border-b border-border section-alt">
      <div className="container py-14 lg:py-16">
        <SectionKicker index="02" question="Why he's different" />
        <h2 className="font-display text-2xl font-bold mb-10">A track record, not just a stack</h2>

        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Timeline */}
          <div className="space-y-8">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 100} className="grid md:grid-cols-[200px_1fr] gap-4">
                <div>
                  <p className="font-display font-medium">{job.role}</p>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <p className="font-mono text-xs text-accent mt-1">{job.period}</p>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  {job.bullets.slice(0, 4).map((b, i) => (
                    <li key={i} className="pl-4 border-l border-border">
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* Certifications - alongside the timeline instead of their own section */}
          <div className="lg:border-l lg:border-border lg:pl-8">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
              Certifications
            </p>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="text-sm text-muted-foreground pl-3 border-l border-accent/50">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}