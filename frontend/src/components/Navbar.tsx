import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/resume";

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#honka", label: "Honka" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="h-8 w-8 shrink-0 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center font-display text-xs font-bold text-accent group-hover:bg-accent/25 transition-colors">
            CG
          </span>
          <span className="font-display font-medium leading-none">
            {profile.name.split(" ")[0]} {profile.name.split(" ").pop()}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/resume.pdf" download>
              <Download className="h-3.5 w-3.5 mr-2" />
              Resume
            </a>
          </Button>
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border px-6 py-4 flex flex-col gap-4 bg-background">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="/resume.pdf" download className="text-sm text-accent">
            Download resume
          </a>
        </nav>
      )}
    </header>
  );
}