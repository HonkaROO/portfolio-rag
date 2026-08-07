import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/resume";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-10 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-display font-medium">{profile.name}</p>
          <p className="text-muted-foreground mt-1">{profile.title}</p>
          <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
            <MapPin className="h-3.5 w-3.5" />
            {profile.location}
          </p>
        </div>

        <div className="space-y-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="container py-4 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <p className="font-mono">Powered by Honka ⚡</p>
      </div>
    </footer>
  );
}