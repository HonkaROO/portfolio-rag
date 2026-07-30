import { skills, certifications } from "@/data/resume";
import { Badge } from "@/components/ui/badge";

export default function Skills() {
  return (
    <section id="skills" className="scroll-anchor border-b border-border">
      <div className="container py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl font-bold mb-8">Skills</h2>
          <div className="space-y-6">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <p className="text-sm text-muted-foreground mb-2">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold mb-8">Certifications</h2>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c} className="text-sm text-muted-foreground pl-4 border-l border-accent/50">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
