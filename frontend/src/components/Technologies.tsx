import { useMemo, useState } from "react";
import { Grid2X2, ChevronRight, X } from "lucide-react";

import { coreTech } from "@/data/resume";
import TechnologyIcon from "@/components/TechnologyIcon";

type Technology = {
  name: string;
  category: string;
};

function TechnologyItem({ technology }: { technology: Technology }) {
  return (
    <div
      className="
        group
        flex items-center gap-2
        shrink-0
        px-3 py-1.5
        rounded-md
        border border-border
        bg-card
        text-xs
        text-muted-foreground
        transition-all duration-300
        hover:text-foreground
        hover:border-accent/50
        hover:bg-accent/5
      "
    >
      <TechnologyIcon
        name={technology.name}
        className="h-4 w-4 shrink-0"
      />

      <span className="whitespace-nowrap">
        {technology.name}
      </span>
    </div>
  );
}

export default function Technologies() {
  const [showAll, setShowAll] = useState(false);

  const technologies = useMemo<Technology[]>(
    () =>
      Object.entries(coreTech).flatMap(([category, items]) =>
        items.map((name) => ({
          name,
          category,
        }))
      ),
    []
  );

  /*
   * Distribute technologies across 3 rows.
   *
   * Instead of simply slicing them, round-robin distribution
   * makes the three conveyor belts visually balanced.
   */
  const rows = useMemo(() => {
    const result: Technology[][] = [[], [], []];

    technologies.forEach((technology, index) => {
      result[index % 3].push(technology);
    });

    return result;
  }, [technologies]);

  return (
    <section
      id="technologies"
      className="scroll-anchor border-b border-border"
    >
      <div className="container py-20">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-accent mb-2">
              TECH STACK
            </p>

            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Technologies
            </h2>

            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Tools, frameworks, platforms, and technologies I work with
              across software engineering, AI, cloud, design, and project
              management.
            </p>
          </div>

          <button
            onClick={() => setShowAll((value) => !value)}
            className="
              hidden sm:flex
              items-center gap-2
              text-sm
              text-muted-foreground
              hover:text-accent
              transition-colors
            "
          >
            {showAll ? (
              <>
                Hide <X className="h-4 w-4" />
              </>
            ) : (
              <>
                View All
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Mobile View All button */}
        <button
          onClick={() => setShowAll((value) => !value)}
          className="
            sm:hidden
            flex items-center gap-2
            mb-6
            text-sm
            text-muted-foreground
            hover:text-accent
          "
        >
          {showAll ? "Hide" : "View All"}

          {showAll ? (
            <X className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* ============================================================
            CONVEYOR BELT
        ============================================================ */}
        {!showAll && (
          <div className="relative overflow-hidden space-y-3">

            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-r from-background to-transparent" />

            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 bg-gradient-to-l from-background to-transparent" />

            {/* ROW 1 → LEFT */}
            <div className="technology-marquee">
              <div className="technology-marquee-track technology-marquee-left">

                {[...rows[0], ...rows[0]].map((technology, index) => (
                  <TechnologyItem
                    key={`row1-${technology.name}-${index}`}
                    technology={technology}
                  />
                ))}

              </div>
            </div>

            {/* ROW 2 → RIGHT */}
            <div className="technology-marquee">
              <div className="technology-marquee-track technology-marquee-right">

                {[...rows[1], ...rows[1]].map((technology, index) => (
                  <TechnologyItem
                    key={`row2-${technology.name}-${index}`}
                    technology={technology}
                  />
                ))}

              </div>
            </div>

            {/* ROW 3 → LEFT */}
            <div className="technology-marquee">
              <div className="technology-marquee-track technology-marquee-left technology-marquee-slow">

                {[...rows[2], ...rows[2]].map((technology, index) => (
                  <TechnologyItem
                    key={`row3-${technology.name}-${index}`}
                    technology={technology}
                  />
                ))}

              </div>
            </div>

          </div>
        )}

        {/* ============================================================
            GRID VIEW
        ============================================================ */}
        {showAll && (
          <div className="space-y-10">

            {Object.entries(coreTech).map(([category, items]) => (
              <div key={category}>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-accent">
                    {category.toUpperCase()}
                  </span>

                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {items.map((name) => (
                    <TechnologyItem
                      key={`${category}-${name}`}
                      technology={{
                        name,
                        category,
                      }}
                    />
                  ))}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}