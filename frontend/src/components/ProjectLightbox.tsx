import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function ProjectLightbox({ images, index, onClose, onNavigate }: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [index, images.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index - 1 + images.length) % images.length);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-muted/80 border border-border flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* object-contain at near-fullscreen size - any leftover whitespace in
          the source screenshot is far less noticeable here than when it was
          squeezed into a narrow modal column. */}
      <img
        src={images[index]}
        alt={`Screenshot ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full object-contain rounded-lg border border-border shadow-2xl"
      />

      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index + 1) % images.length);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-muted/80 border border-border flex items-center justify-center hover:bg-muted transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}