"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.dataset.theme === "dark";
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function applyTheme(next: boolean) {
    if (next) {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next = !dark;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    // Circular reveal that grows out from the bulb. Percentages keep the
    // origin correct regardless of device pixel ratio; 150% of the
    // reference box always covers the full viewport from any corner.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / innerHeight) * 100;

    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0% at ${x}% ${y}%)`, `circle(150% at ${x}% ${y}%)`],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border-2 border-foreground text-foreground transition-colors duration-200 hover:bg-foreground/10"
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"
          fill={dark ? "currentColor" : "none"}
        />
        {dark && (
          <g className="opacity-80">
            <path d="M12 0.5v1M4 4l.7.7M20 4l-.7.7M1.5 11h1M21.5 11h1" />
          </g>
        )}
      </svg>
    </button>
  );
}
