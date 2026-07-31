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
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Projects() {
  return (
    <section id="projects" className="scroll-anchor border-b border-border">
      <div className="container py-20">
        <h2 className="font-display text-2xl font-bold mb-10">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Reveal key={p.name}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:border-accent transition-colors h-full flex flex-col group">
                    <CardHeader>
                      <CardTitle className="group-hover:text-accent transition-colors">{p.name}</CardTitle>
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
                
                <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col gap-0 p-0 overflow-hidden">
                  <DialogHeader className="p-6 border-b border-border bg-muted/40">
                    <DialogTitle className="text-2xl font-display">{p.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{p.role}</p>
                  </DialogHeader>
                  
                  <div className="grid md:grid-cols-2 gap-6 p-6 overflow-hidden min-h-[50vh]">
                    {/* Media Gallery */}
                    <div className="flex flex-col justify-center bg-muted/30 rounded-lg p-4 border border-border">
                      {p.images && p.images.length > 0 ? (
                        <Carousel className="w-full">
                          <CarouselContent>
                            {p.images.map((img, index) => (
                              <CarouselItem key={index}>
                                <div className="p-1">
                                  <img 
                                    src={img} 
                                    alt={`${p.name} screenshot ${index + 1}`}
                                    className="w-full h-auto rounded-md object-cover border border-border shadow-sm"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          {p.images.length > 1 && (
                            <>
                              <CarouselPrevious className="left-4" />
                              <CarouselNext className="right-4" />
                            </>
                          )}
                        </Carousel>
                      ) : (
                        <div className="text-center text-sm text-muted-foreground py-20">
                          Media placeholder
                        </div>
                      )}
                    </div>

                    {/* Detailed Description */}
                    <ScrollArea className="h-full pr-4">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>
                          {p.longDescription || "More details coming soon..."}
                        </ReactMarkdown>
                      </div>
                    </ScrollArea>
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}