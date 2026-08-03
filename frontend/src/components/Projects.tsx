import { useState } from "react";
import { projects } from "@/data/resume";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/Reveal";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectLightbox from "@/components/ProjectLightbox";
import ProjectGallery from "@/components/ProjectGallery";

type LightboxState = { images: string[]; index: number } | null;

export default function Projects() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  return (
    <section id="projects" className="scroll-anchor border-b border-border">
      <div className="container py-20">
        <h2 className="font-display text-2xl font-bold mb-10">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => {
            const hasImages = p.images && p.images.length > 0;

            return (
              <Reveal key={p.name}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:border-accent transition-colors h-full flex flex-col group">
                      <CardHeader>
                        <CardTitle className="group-hover:text-accent transition-colors">
                          {p.name}
                        </CardTitle>
                        <CardDescription>{p.role}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <ul className="space-y-2 text-sm text-muted-foreground mb-4 flex-1">
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
                  </DialogTrigger>

                  <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-border bg-muted/30 shrink-0">
                      <DialogTitle className="text-2xl font-display">{p.name}</DialogTitle>
                      <p className="text-sm text-muted-foreground">{p.role}</p>
                    </DialogHeader>

                    <ScrollArea className="flex-1">
                      <div className="p-6">
                        {/* Browser-chrome carousel with thumbnails - click the main
                            image to zoom into the full-resolution lightbox. */}
                        {hasImages && (
                          <ProjectGallery
                            name={p.name}
                            images={p.images}
                            onZoom={(index) => setLightbox({ images: p.images, index })}
                          />
                        )}

                        <div className="flex flex-col max-w-2xl mx-auto">
                          <ReactMarkdown
                            components={{
                              h3: ({ children }) => (
                                <h3 className="text-lg font-bold mt-2 mb-3 font-display text-foreground">
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="mb-5 text-muted-foreground leading-relaxed text-sm">
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-5 mb-5 space-y-2 text-muted-foreground text-sm">
                                  {children}
                                </ul>
                              ),
                              li: ({ children }) => <li>{children}</li>,
                              strong: ({ children }) => (
                                <strong className="font-semibold text-foreground">{children}</strong>
                              ),
                            }}
                          >
                          </ReactMarkdown>
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </Reveal>
            );
          })}
        </div>
      </div>

      {lightbox && (
        <ProjectLightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox({ images: lightbox.images, index })}
        />
      )}
    </section>
  );
}