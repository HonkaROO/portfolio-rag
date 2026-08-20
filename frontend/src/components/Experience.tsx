import { useState } from "react";
import { experience } from "@/data/resume";
import Reveal from "@/components/Reveal";
import SectionKicker from "@/components/SectionKicker";
import ProjectLightbox from "@/components/ProjectLightbox";
import { ShieldCheck } from "lucide-react";

export default function Experience() {
  const [lightbox, setLightbox] = useState<{ jobIndex: number; imageIndex: number } | null>(null);

  const activeJob = lightbox ? experience[lightbox.jobIndex] : null;

  return (
    <section id="experience" className="scroll-anchor section-fade-top border-b border-border section-alt">
      <div className="container py-14 lg:py-16">
        <SectionKicker index="02" question="Proven Experience and Exposure" />
        <h2 className="font-display text-2xl font-bold mb-10">A track record, not just a stack</h2>

        <div className="space-y-8 max-w-4xl">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 100} className="grid md:grid-cols-[200px_1fr] gap-4">
              <div>
                <p className="font-display font-medium">{job.role}</p>
                <p className="text-sm text-muted-foreground">{job.company}</p>
                <p className="font-mono text-xs text-accent mt-1">{job.period}</p>
                {job.proof && job.proof.length > 0 && (
                  <button
                    onClick={() => setLightbox({ jobIndex: i, imageIndex: 0 })}
                    className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline underline-offset-4"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    View proof
                  </button>
                )}
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
      </div>

      {activeJob && lightbox && (
        <ProjectLightbox
          images={activeJob.proof!}
          index={lightbox.imageIndex}
          titles={activeJob.proofTitles}
          onClose={() => setLightbox(null)}
          onNavigate={(newIndex) =>
            setLightbox({ jobIndex: lightbox.jobIndex, imageIndex: newIndex })
          }
        />
      )}
    </section>
  );
}