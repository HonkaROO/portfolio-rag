import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/data/resume";

const ICONS = { email: Mail, github: Github, linkedin: Linkedin } as const;

export default function SocialLinks() {
  return (
    <div>
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
        Find me online
      </p>
      <div className="flex gap-2">
        {socialLinks.map((s) => {
          const Icon = ICONS[s.key as keyof typeof ICONS];
          return (
            <a
              key={s.key}
              href={s.href}
              target={s.key === "email" ? undefined : "_blank"}
              rel={s.key === "email" ? undefined : "noreferrer"}
              aria-label={s.label}
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
}