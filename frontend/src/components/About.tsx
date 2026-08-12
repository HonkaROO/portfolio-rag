import { useState } from "react";
import { profile, education } from "@/data/resume";

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <section id="about" className="scroll-anchor border-b border-border">
      <div className="container py-20 grid md:grid-cols-[260px_1fr] gap-14 items-center">
        {/* Left Profile Card */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative">
            {/* Background Layer */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-accent/15" />

            {!photoFailed ? (
              <img
                src="/avatar.jpg"
                alt={profile.name}
                onError={() => setPhotoFailed(true)}
                className="
                  relative
                  w-56
                  h-56
                  rounded-2xl
                  object-cover
                  object-top
                  border
                  border-border
                  shadow-xl
                "
              />
            ) : (
              <div
                className="
                  relative
                  w-56
                  h-56
                  rounded-2xl
                  border
                  border-border
                  bg-muted
                  flex
                  items-center
                  justify-center
                  font-display
                  text-5xl
                  text-accent
                  shadow-xl
                "
              >
                {initials}
              </div>
            )}
          </div>

          <div className="mt-6 text-center md:text-left">
            <h3 className="font-display text-xl font-semibold">
              {profile.name}
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
              Software Engineer • Azure AI Engineer
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
            About
          </p>

          <h2 className="font-display text-2xl font-bold mb-4">
            Building systems that answer for themselves
          </h2>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
            {profile.summary}
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Based in {profile.location}, currently shipping AI-driven onboarding
            and file management platforms as a Software Engineer at N-PAX Cebu
            Corporation. Outside of client work,{" "}
            {profile.name.split(" ")[0]} holds a {education.degree} from{" "}
            {education.school} ({education.period}).
          </p>
        </div>
      </div>
    </section>
  );
}