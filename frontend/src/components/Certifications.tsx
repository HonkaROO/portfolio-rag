import { useState } from "react";
import { Award, ExternalLink } from "lucide-react";

import { certifications } from "@/data/resume";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import SectionKicker from "@/components/SectionKicker";
import ProjectLightbox from "@/components/ProjectLightbox";

function CertImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="
          w-full
          aspect-[4/3]
          flex
          items-center
          justify-center
          bg-muted
        "
        title={`Certificate image not found: ${src}`}
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
      loading="lazy"
      className="
        w-full
        aspect-[4/3]
        object-contain
        bg-background
        p-3
        transition-transform
        duration-500
        group-hover:scale-[1.02]
      "
    />
  );
}

export default function Certifications() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = certifications.map((cert) => cert.image);

  function openCertificate(index: number) {
    setLightboxIndex(index);
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCertificate(index);
    }
  }

  return (
    <section
      id="certifications"
      className="
        scroll-anchor
        border-b
        border-border
      "
    >
      <div className="container py-14 lg:py-16">

        {/* Section heading */}
        <SectionKicker
          index="03"
          question="Credentials that back it up"
        />

        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Certifications
            </h2>

            <p className="text-muted-foreground mt-2 max-w-xl">
              Professional certifications and credentials supporting my
              work across AI, cloud, software engineering, and project
              management.
            </p>
          </div>

          <div
            className="
              hidden
              sm:flex
              items-center
              gap-2
              text-xs
              font-mono
              text-muted-foreground
              shrink-0
            "
          >
            <Award className="h-4 w-4 text-accent" />
            {certifications.length} credentials
          </div>
        </div>

        {/* Certification cards */}
        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {certifications.map((cert, index) => (
            <Reveal
              key={cert.name}
              delay={index * 100}
            >
              <Card
                role="button"
                tabIndex={0}
                aria-label={`View ${cert.name} certificate`}
                onClick={() => openCertificate(index)}
                onKeyDown={(event) =>
                  handleKeyDown(event, index)
                }
                className="
                  group
                  cursor-pointer
                  overflow-hidden
                  h-full
                  flex
                  flex-col

                  border-border
                  bg-card

                  transition-all
                  duration-300
                  ease-out

                  hover:-translate-y-1
                  hover:border-accent/60
                  hover:shadow-[0_0_24px_-6px_hsl(var(--accent)/0.35)]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                {/* Certificate image */}
                <div
                  className="
                    relative
                    border-b
                    border-border
                    overflow-hidden
                    bg-muted/30
                  "
                >
                  <CertImage
                    src={cert.image}
                    alt={cert.name}
                  />

                  {/* Hover overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center

                      bg-background/0
                      opacity-0

                      transition-all
                      duration-300

                      group-hover:bg-background/10
                      group-hover:opacity-100
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-border
                        bg-card/90
                        backdrop-blur-sm
                        px-3
                        py-2

                        text-xs
                        font-medium
                        text-foreground

                        shadow-lg
                      "
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View certificate
                    </div>
                  </div>
                </div>

                {/* Certificate information */}
                <CardContent
                  className="
                    p-5
                    flex-1
                    flex
                    flex-col
                  "
                >
                  <p
                    className="
                      font-display
                      font-medium
                      leading-snug

                      transition-colors
                      duration-200

                      group-hover:text-accent
                    "
                  >
                    {cert.name}
                  </p>

                  <p className="text-sm text-muted-foreground mt-1">
                    {cert.issuer}
                  </p>

                  <p className="font-mono text-xs text-accent mt-2">
                    {cert.date}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Certificate lightbox */}
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