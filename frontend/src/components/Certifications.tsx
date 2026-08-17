import { useState } from "react";
import { Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

import { certifications } from "@/data/resume";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/Reveal";
import SectionKicker from "@/components/SectionKicker";
import ProjectLightbox from "@/components/ProjectLightbox";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { CarouselApi } from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";


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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const images = certifications.map((cert) => cert.image);

  /*
   * With 3 cards visible on desktop:
   *
   * 4 certifications
   * ┌─────────┬─────────┬─────────┐
   * │ Cert 1  │ Cert 2  │ Cert 3  │
   * └─────────┴─────────┴─────────┘
   *
   *              ↓ Next
   *
   * ┌─────────┬─────────┐
   * │ Cert 2  │ Cert 3  │ Cert 4  ...
   * └─────────┴─────────┴─────────┘
   *
   * However, if you want STRICT 3-per-page pagination,
   * the carousel itself needs to move by 3.
   *
   * We therefore group the certifications into pages below.
   */

  const pages = [];

  for (let i = 0; i < certifications.length; i += 3) {
    pages.push(certifications.slice(i, i + 3));
  }

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


  /*
   * Track the current carousel page.
   */
  function handleCarouselSelect(api: CarouselApi) {
    if (!api) return;

    setCurrentPage(api.selectedScrollSnap());
    setPageCount(api.scrollSnapList().length);
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


        {/* =====================================================
            CERTIFICATION CAROUSEL
           ===================================================== */}

        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          setApi={(api) => {
            setCarouselApi(api);

            if (!api) return;

            handleCarouselSelect(api);

            api.on("select", handleCarouselSelect);
            api.on("reInit", handleCarouselSelect);
          }}
          className="w-full"
        >
          <CarouselContent>

            {pages.map((page, pageIndex) => (
              <CarouselItem
                key={pageIndex}
                className="basis-full"
              >
                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                  "
                >
                  {page.map((cert, localIndex) => {

                    /*
                     * Convert the page-local index back to the
                     * original certification index.
                     *
                     * Example:
                     * Page 0:
                     *   localIndex 0 → cert index 0
                     *
                     * Page 1:
                     *   localIndex 0 → cert index 3
                     */
                    const globalIndex =
                      pageIndex * 3 + localIndex;

                    return (
                      <Reveal
                        key={cert.name}
                        delay={localIndex * 100}
                      >
                        <Card
                          role="button"
                          tabIndex={0}
                          aria-label={`View ${cert.name} certificate`}
                          onClick={() =>
                            openCertificate(globalIndex)
                          }
                          onKeyDown={(event) =>
                            handleKeyDown(
                              event,
                              globalIndex
                            )
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


                            {/* Credential ID */}
                            {cert.credentialId && (
                              <div className="mt-4 pt-3 border-t border-border">
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                                  Credential ID
                                </p>

                                <p className="font-mono text-xs text-foreground/80 mt-1 break-all">
                                  {cert.credentialId}
                                </p>
                              </div>
                            )}


                            {/* Verification button */}
                            {cert.credentialUrl && (
                              <div className="mt-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="
                                    w-full
                                    gap-2
                                    text-xs
                                    hover:border-accent
                                    hover:text-accent
                                  "
                                  asChild
                                  onClick={(event) =>
                                    event.stopPropagation()
                                  }
                                >
                                  <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Verify ${cert.name}`}
                                  >
                                    Verify Credential
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                </Button>
                              </div>
                            )}

                          </CardContent>
                        </Card>
                      </Reveal>
                    );
                  })}
                </div>
              </CarouselItem>
            ))}

          </CarouselContent>


          {/* Previous */}
          <CarouselPrevious
            className="
              -left-5
              hidden
              lg:flex
              border-border
              bg-card
              hover:bg-muted
              hover:border-accent/60
            "
          />

          {/* Next */}
          <CarouselNext
            className="
              -right-5
              hidden
              lg:flex
              border-border
              bg-card
              hover:bg-muted
              hover:border-accent/60
            "
          />
        </Carousel>


        {/* =====================================================
            PAGINATION
           ===================================================== */}

        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">

            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to certification page ${index + 1}`}
                aria-current={
                  currentPage === index
                    ? "true"
                    : undefined
                }
                onClick={() =>
                  carouselApi?.scrollTo(index)
                }
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    currentPage === index
                      ? "w-8 bg-accent"
                      : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }
                `}
              />
            ))}

          </div>
        )}


        {/* Mobile navigation */}
        {pageCount > 1 && (
          <div className="flex lg:hidden justify-center gap-2 mt-4">

            <button
              type="button"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={currentPage === 0}
              className="
                h-9
                w-9
                rounded-full
                border
                border-border
                flex
                items-center
                justify-center
                text-muted-foreground

                transition-colors

                hover:border-accent
                hover:text-accent

                disabled:opacity-30
                disabled:pointer-events-none
              "
              aria-label="Previous certification page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => carouselApi?.scrollNext()}
              disabled={currentPage === pageCount - 1}
              className="
                h-9
                w-9
                rounded-full
                border
                border-border
                flex
                items-center
                justify-center
                text-muted-foreground

                transition-colors

                hover:border-accent
                hover:text-accent

                disabled:opacity-30
                disabled:pointer-events-none
              "
              aria-label="Next certification page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>
        )}

      </div>


      {/* =====================================================
          CERTIFICATE LIGHTBOX
         ===================================================== */}

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