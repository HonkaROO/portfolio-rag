import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugins;
  className?: string;
  children?: React.ReactNode;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("Carousel subcomponents must be used within <Carousel />");
  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ opts, plugins, className, children, ...props }, ref) => {
    // AutoHeight (when passed in via `plugins`) makes the carousel resize to
    // match each slide's real content height, instead of every slide being
    // forced into one fixed box regardless of the image's aspect ratio.
    const [carouselRef, api] = useEmblaCarousel({ ...opts, loop: false }, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
    const scrollTo = React.useCallback((index: number) => api?.scrollTo(index), [api]);

    React.useEffect(() => {
      if (!api) return;
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollSnaps,
          scrollPrev,
          scrollNext,
          scrollTo,
        }}
      >
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div ref={ref} className={cn("flex items-start", className)} {...props} />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0 shrink-0 grow-0 basis-full", className)} {...props} />
  )
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();
    return (
      <Button
        ref={ref}
        variant="outline"
        size="icon"
        className={cn("absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full z-10", className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();
    return (
      <Button
        ref={ref}
        variant="outline"
        size="icon"
        className={cn("absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full z-10", className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

const CarouselDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();
    if (scrollSnaps.length <= 1) return null;
    return (
      <div ref={ref} className={cn("flex justify-center gap-1.5 pt-3", className)} {...props}>
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200",
              i === selectedIndex ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    );
  }
);
CarouselDots.displayName = "CarouselDots";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};