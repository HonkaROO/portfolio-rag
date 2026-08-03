import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

const DRAG_THRESHOLD = 60; // px of horizontal drag before it counts as a swipe

export default function ProjectGallery({
  name,
  images,
  onZoom,
}: {
  name: string;
  images: string[];
  onZoom: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const justDragged = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const canDrag = images.length > 1;

  function prev() {
    setActive((a) => (a - 1 + images.length) % images.length);
  }
  function next() {
    setActive((a) => (a + 1) % images.length);
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (!canDrag) return;
    startX.current = e.clientX;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX.current);
  }

  function handlePointerUp() {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 5) justDragged.current = true;
    if (dragOffset < -DRAG_THRESHOLD) next();
    else if (dragOffset > DRAG_THRESHOLD) prev();
    setDragOffset(0);
    setIsDragging(false);
  }

  function handleImageClick() {
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    onZoom(active);
  }

  return (
    <div className="mb-6">
      {/* Browser-chrome frame */}
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/40">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 font-mono text-[10px] text-muted-foreground truncate">{name}</span>
        </div>

        <div
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={cn(
            "relative h-[46vh] min-h-[280px] overflow-hidden select-none [background-image:radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:16px_16px]",
            canDrag && "cursor-grab active:cursor-grabbing"
          )}
        >
          <div
            className="flex h-full"
            style={{
              transform: `translateX(calc(-${active * 100}% + ${dragOffset}px))`,
              transition: isDragging ? "none" : "transform 300ms ease",
            }}
          >
            {images.map((img, i) => (
              <div key={img} className="w-full h-full shrink-0 flex items-center justify-center p-4">
                <img
                  src={img}
                  alt={`${name} screenshot ${i + 1}`}
                  draggable={false}
                  onClick={handleImageClick}
                  className="max-w-full max-h-full object-contain rounded-md contrast-[1.05] saturate-[1.05] cursor-zoom-in"
                />
              </div>
            ))}
          </div>

          {canDrag && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-background hover:border-accent hover:text-accent transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-background hover:border-accent hover:text-accent transition-colors"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono bg-background/80 border border-border rounded-full px-2 py-1 text-muted-foreground pointer-events-none">
            <ZoomIn className="h-2.5 w-2.5" />
            Click to zoom
          </div>
        </div>

        {/* Progress dots */}
        {canDrag && (
          <div className="flex justify-center gap-1.5 py-2.5 border-t border-border bg-muted/20">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === active ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip, centered */}
      {images.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-14 w-20 rounded-md overflow-hidden border shrink-0 transition-all",
                i === active
                  ? "border-accent opacity-100"
                  : "border-border opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={img}
                alt=""
                aria-hidden
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}