import { projects } from "@/data/resume";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="scroll-anchor border-b border-border">
      <div className="container py-20">
        <h2 className="font-display text-2xl font-bold mb-10">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Reveal key={p.name}>
            <Card>
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
                <CardDescription>{p.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <Badge key={s} variant="accent">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
