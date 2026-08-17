import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const currentTheme: Theme =
      document.documentElement.classList.contains("light")
        ? "light"
        : "dark";

    setTheme(currentTheme);
  }, []);

  function toggleTheme(event: React.MouseEvent<HTMLButtonElement>) {
    const nextTheme: Theme =
      theme === "dark" ? "light" : "dark";

    const root = document.documentElement;

    /*
     * View Transition API
     */
    if ("startViewTransition" in document) {
      const x = event.clientX;
      const y = event.clientY;

      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.startViewTransition(() => {
        root.classList.toggle(
          "light",
          nextTheme === "light"
        );

        setTheme(nextTheme);

        try {
          localStorage.setItem(
            "theme",
            nextTheme
          );
        } catch {
          // Ignore storage errors
        }
      }).ready.then(() => {
        document.documentElement.animate(
          [
            {
              clipPath: `circle(0px at ${x}px ${y}px)`,
            },
            {
              clipPath: `circle(${radius}px at ${x}px ${y}px)`,
            },
          ],
          {
            duration: 450,
            easing: "ease-in-out",
            pseudoElement:
              "::view-transition-new(root)",
          }
        );
      });

      return;
    }

    /*
     * Fallback for browsers without
     * View Transitions API support.
     */
    root.classList.toggle(
      "light",
      nextTheme === "light"
    );

    setTheme(nextTheme);

    try {
      localStorage.setItem(
        "theme",
        nextTheme
      );
    } catch {
      // Ignore storage errors
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}