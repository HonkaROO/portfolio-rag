import { useState, useEffect } from "react";
import { GitHubDark, GitHubLight, LinkedIn, Gmail } from "developer-icons";
import { socialLinks } from "@/data/resume";

const ICONS = { email: Gmail, github: GitHubDark, linkedin: LinkedIn } as const;


export default function SocialLinks() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setLight(document.documentElement.classList.contains("light"));
    };

    // Set initial theme
    updateTheme();

    // Watch for ThemeToggle changes
    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const ICONS = {
    email: Gmail,
    github: light ? GitHubDark : GitHubLight,
    linkedin: LinkedIn,
  } as const;

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