import { useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  titles?: string[];
};

export default function ProjectLightbox({
  images,
  index,
  onClose,
  onNavigate,
  titles,
}: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowLeft") {
        onNavigate(
          (index - 1 + images.length) % images.length
        );
      }

      if (e.key === "ArrowRight") {
        onNavigate(
          (index + 1) % images.length
        );
      }
    }

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [index, images.length, onClose, onNavigate]);

  if (!images.length) {
    return null;
  }

  const currentTitle =
    titles?.[index] ?? `Image ${index + 1}`;

  return (
    <div
      className="
        fixed
        inset-0
        z-[60]

        bg-background/95
        backdrop-blur-sm

        flex
        items-center
        justify-center

        p-6
      "
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={currentTitle}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="
          absolute
          top-5
          right-5

          h-10
          w-10
          rounded-full

          flex
          items-center
          justify-center

          text-muted-foreground

          hover:text-foreground
          hover:bg-muted

          transition-colors
        "
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Previous */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();

            onNavigate(
              (index - 1 + images.length) % images.length
            );
          }}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            h-10
            w-10
            rounded-full

            bg-muted/80
            border
            border-border

            flex
            items-center
            justify-center

            hover:bg-muted

            transition-colors

            z-10
          "
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Image + title */}
      <div
        className="
          max-w-[90vw]
          max-h-[90vh]

          flex
          flex-col
          items-center
          gap-3
        "
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index]}
          alt={currentTitle}
          className="
            max-w-full
            max-h-[82vh]

            object-contain

            rounded-lg
            border
            border-border

            shadow-2xl
          "
        />

        {titles?.[index] && (
          <p
            className="
              text-sm
              font-medium
              text-foreground
              text-center
              max-w-xl
            "
          >
            {titles[index]}
          </p>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();

            onNavigate(
              (index + 1) % images.length
            );
          }}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2

            h-10
            w-10
            rounded-full

            bg-muted/80
            border
            border-border

            flex
            items-center
            justify-center

            hover:bg-muted

            transition-colors

            z-10
          "
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div
          className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2

            px-3
            py-1.5
            rounded-full

            bg-muted/80
            border
            border-border

            text-xs
            font-mono
            text-muted-foreground
          "
        >
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}