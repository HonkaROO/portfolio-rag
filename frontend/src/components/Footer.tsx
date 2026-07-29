import { profile } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="container py-10 flex flex-col md:flex-row justify-between gap-2 text-sm text-muted-foreground">
      <p>
        {profile.name} — {profile.location}
      </p>
      <a href={`mailto:${profile.email}`} className="hover:text-accent">
        {profile.email}
      </a>
    </footer>
  );
}
