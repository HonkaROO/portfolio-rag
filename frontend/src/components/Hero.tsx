import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { profile, education, coreTech } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionKicker from "@/components/SectionKicker";
import SocialLinks from "@/components/SocialLinks";

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <section id="top" className="scroll-anchor min-h-[76vh] flex items-center border-b border-border">
      <div className="container py-14">
        <SectionKicker index="01" question="Who is Christian" />

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
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

            <div className="flex flex-wrap gap-3 mb-8">
              <Button asChild>
                <a href="#honka">Ask Honka, my AI assistant</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#contact">Get in touch</a>
              </Button>
            </div>

            <SocialLinks />
          </div>

          {/* Right: a real photo (not a small afterthought), with education
              called out as its own clearly readable line underneath. */}
          <div>
            <div className="rounded-2xl border border-border bg-card overflow-hidden mb-5">
              {!photoFailed ? (
                <img
                  src="/avatar.jpg"
                  alt={profile.name}
                  onError={() => setPhotoFailed(true)}
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              ) : (
                <div
                  className="w-full aspect-[4/5] flex items-center justify-center font-display text-6xl text-accent bg-muted"
                  title="Drop a photo at frontend/public/avatar.jpg to replace this"
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Education - its own row so it can't get lost like it did
                buried in a sentence next to a small photo. */}
            <div className="flex items-start gap-3 mb-6 p-4 rounded-xl border border-border bg-card">
              <GraduationCap className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium leading-snug">{education.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {education.school} · {education.period}
                </p>
              </div>
            </div>

            <div className="space-y-3">
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