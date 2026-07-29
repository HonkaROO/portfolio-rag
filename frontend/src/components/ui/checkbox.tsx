import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ id, checked, onCheckedChange, className }: CheckboxProps) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "h-4 w-4 shrink-0 rounded-sm border border-border flex items-center justify-center transition-colors",
        checked ? "bg-accent border-accent" : "bg-transparent",
        className
      )}
    >
      {checked && <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />}
    </button>
  );
}
