"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Drink name with its origin story in a tooltip: hover/focus on desktop, tap on touch. */
export function DrinkName({ name, story }: { name: string; story: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <h2 className="font-display text-3xl sm:text-4xl tracking-wider leading-none">
      <button
        ref={ref}
        type="button"
        aria-describedby={id}
        aria-expanded={open}
        data-open={open}
        onClick={() => setOpen((v) => !v)}
        className="tip-trigger relative cursor-help underline decoration-dotted decoration-foreground/35 underline-offset-[7px] transition-[text-decoration-color] duration-[450ms] hover:decoration-foreground/80 focus-visible:outline-none focus-visible:decoration-foreground"
      >
        {name}
        <span
          role="tooltip"
          id={id}
          className="tip pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-64 bg-foreground px-4 py-3 text-left font-sans text-xs font-normal normal-case leading-snug tracking-normal text-background shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] sm:w-72"
        >
          {story}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full -ml-1.5 border-[6px] border-transparent border-t-foreground"
          />
        </span>
      </button>
    </h2>
  );
}
