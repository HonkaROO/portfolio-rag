import { useState } from "react";
import { profile, education, coreTech } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionKicker from "@/components/SectionKicker";

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <section id="top" className="scroll-anchor min-h-[72vh] flex items-center border-b border-border">
      <div className="container py-14">
        <SectionKicker index="01" question="Who is Christian" />

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          {/* Left: the pitch */}
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-5">
              {profile.name}
            </h1>
            <p className="text-accent font-mono text-sm mb-5">
              Software Engineer · Azure AI Engineer Associate
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-8">
              {profile.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="#honka">Ask Honka, my AI assistant</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Right: photo + narrative + core tech - what used to be a
              separate About section, folded in here so the "who is he"
              answer arrives in one continuous read, not a second scroll. */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              {!photoFailed ? (
                <img
                  src="/avatar.jpg"
                  alt={profile.name}
                  onError={() => setPhotoFailed(true)}
                  className="w-16 h-16 rounded-xl object-cover object-top border border-border shrink-0"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-xl border border-border bg-muted flex items-center justify-center font-display text-lg text-accent shrink-0"
                  title="Drop a photo at frontend/public/avatar.jpg to replace this"
                >
                  {initials}
                </div>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based in {profile.location}. {education.degree.replace("Bachelor of Science in ", "BS ")},{" "}
                {education.school} ({education.period.split(" – ")[1]}).
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(coreTech).map(([group, items]) => (
                <div key={group} className="flex items-start gap-3">
                  <p className="text-xs font-mono text-muted-foreground w-16 shrink-0 pt-1">{group}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}