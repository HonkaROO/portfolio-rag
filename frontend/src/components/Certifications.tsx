import { useState } from "react";
import { Award } from "lucide-react";
import { certifications } from "@/data/resume";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import SectionKicker from "@/components/SectionKicker";
import ProjectLightbox from "@/components/ProjectLightbox";

function CertImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className="w-full aspect-[4/3] flex items-center justify-center bg-muted"
        title={`Drop the badge/certificate image at frontend/public${src} to replace this`}
      >
        <Award className="h-10 w-10 text-muted-foreground/40" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full aspect-[4/3] object-contain bg-background p-4"
    />
  );
}

export default function Certifications() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = certifications.map((c) => c.image);

  return (
    <section id="certifications" className="scroll-anchor border-b border-border">
      <div className="container py-14 lg:py-16">
        <SectionKicker index="03" question="Credentials that back it up" />
        <h2 className="font-display text-2xl font-bold mb-10">Certifications</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 100}>
              <Card
                className="cursor-pointer overflow-hidden h-full flex flex-col hover:border-accent hover:shadow-[0_0_24px_-6px_hsl(var(--accent)/0.35)] hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="border-b border-border overflow-hidden">
                  <CertImage src={cert.image} alt={cert.name} />
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <p className="font-display font-medium leading-snug group-hover:text-accent transition-colors">
                    {cert.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{cert.issuer}</p>
                  <p className="font-mono text-xs text-accent mt-2">{cert.date}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <ProjectLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}