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
      <div className="container py-20 grid md:grid-cols-[220px_1fr] gap-10 items-start">
        {!photoFailed ? (
          <img
            src="/avatar.jpg"
            alt={profile.name}
            onError={() => setPhotoFailed(true)}
            className="w-40 h-40 rounded-lg object-cover border border-border"
          />
        ) : (
          <div
            className="w-40 h-40 rounded-lg border border-border bg-muted flex items-center justify-center font-display text-3xl text-accent"
            title="Drop a photo at frontend/public/avatar.jpg to replace this"
          >
            {initials}
          </div>
        )}

        <div>
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">About</p>
          <h2 className="font-display text-2xl font-bold mb-4">
            Building systems that answer for themselves
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
            {profile.summary}
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Based in {profile.location}, currently shipping AI-driven onboarding and file
            management platforms as a Software Engineer at N-PAX Cebu Corporation. Outside of
            client work, {profile.name.split(" ")[0]} holds a {education.degree} from{" "}
            {education.school} ({education.period}).
          </p>
        </div>
      </div>
    </section>
  );
}
