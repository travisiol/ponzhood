"use client";

import { useRef, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Tilts its child toward the pointer.
 *
 * The rotation is written to two custom properties rather than to React state:
 * a pointermove fires far more often than a frame, and routing it through a
 * render would re-run the whole subtree for a value only the compositor needs.
 * `is-live` swaps the long easing for a short linear one while the pointer is
 * inside, so following feels immediate but the return to flat still glides.
 */
export function Tilt({
  children,
  max = 7,
  className,
}: {
  children: ReactNode;
  /** Maximum rotation in degrees, on both axes. */
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    el.classList.add("is-live");
    el.style.setProperty("--ry", `${(x * max * 2).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * max * 2).toFixed(2)}deg`);
  }

  function leave() {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-live");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  }

  return (
    <div className={clsx("scene", className)} onPointerMove={move} onPointerLeave={leave}>
      <div ref={ref} className="tilt">
        {children}
      </div>
    </div>
  );
}
