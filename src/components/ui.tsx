import type { ReactNode } from "react";
import clsx from "clsx";
import { templateById, type VaultId } from "@/lib/vaults";

/**
 * Sections alternate grounds — warm off-black, then bone, then off-black
 * again. Robinhood cuts their page the same way, and it is what stops a long
 * dark page reading as one undifferentiated slab.
 */
export function Section({
  tone = "ink",
  className,
  children,
  id,
}: {
  tone?: "ink" | "soot" | "bone" | "paper";
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const grounds = {
    ink: "bg-ink text-paper",
    soot: "bg-soot text-paper",
    bone: "bg-bone text-ink",
    paper: "bg-paper text-ink",
  } as const;
  return (
    <section id={id} className={clsx(grounds[tone], className)}>
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p className={clsx("eyebrow", tone === "dark" ? "text-smoke" : "text-smoke")}>
      {children}
    </p>
  );
}

/**
 * Small status pill. `live` is the only one that spends the accent — and on
 * the light ground it spends it as a fill rather than as text, because
 * #CCFF00 on bone is 1.4:1 and unreadable. Same accent, opposite polarity.
 */
export function Chip({
  children,
  variant = "line",
  on = "dark",
  className,
}: {
  children: ReactNode;
  variant?: "line" | "live" | "soon" | "dark";
  on?: "dark" | "light";
  className?: string;
}) {
  const dark = {
    line: "border border-white/15 text-ash",
    live: "border border-volt/40 bg-volt/10 text-volt",
    soon: "border border-white/12 text-smoke",
    dark: "border border-black/12 text-smoke",
  } as const;
  const light = {
    line: "border border-black/15 text-smoke",
    live: "bg-volt text-ink",
    soon: "border border-black/12 text-smoke",
    dark: "border border-black/12 text-smoke",
  } as const;
  const isLight = on === "light";
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]",
        (isLight ? light : dark)[variant],
        className,
      )}
    >
      {variant === "live" && (
        <span
          className={clsx(
            "blink h-1.5 w-1.5 rounded-full",
            isLight ? "bg-ink" : "bg-volt",
          )}
        />
      )}
      {children}
    </span>
  );
}

/** A number and what it means. The number is the serif; the label is not. */
export function Stat({
  label,
  value,
  note,
  tone = "dark",
}: {
  label: string;
  value: ReactNode;
  note?: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div>
      <p
        className={clsx(
          "eyebrow",
          tone === "dark" ? "text-smoke" : "text-smoke",
        )}
      >
        {label}
      </p>
      <p className="headline tnum mt-3 text-[clamp(34px,4.4vw,52px)]">{value}</p>
      {note && (
        <p
          className={clsx(
            "mt-2 text-[13px] leading-snug",
            tone === "dark" ? "text-ash" : "text-smoke",
          )}
        >
          {note}
        </p>
      )}
    </div>
  );
}

export function VaultChip({
  id,
  tone = "dark",
}: {
  id: VaultId;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-[11px] font-medium",
        tone === "dark"
          ? "bg-white/8 text-paper"
          : "bg-ink/6 text-ink",
      )}
    >
      {templateById[id].name}
    </span>
  );
}

/**
 * Every page that shows figures says where they came from. Until the launcher
 * is deployed there is nothing to read out of the chain, and a grid of
 * confident numbers with no such line would be a lie told by omission.
 */
export function SampleNote({ what }: { what: string }) {
  return (
    <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-pill border border-white/12 bg-white/4 px-3.5 py-1.5 text-[12px] text-ash">
      <span className="h-1.5 w-1.5 rounded-full bg-ash/60" />
      Awaiting launch — {what} is a sample set, not a read of the chain.
    </p>
  );
}

/** The up/down colours belong to price movement and to nothing else. */
export function Delta({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      className={clsx("tnum font-mono text-[13px]", up ? "text-up" : "text-down")}
    >
      {up ? "+" : "−"}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}

/** A definition row: term on the left, value right-aligned and tabular. */
export function Row({
  label,
  value,
  tone = "dark",
}: {
  label: ReactNode;
  value: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={clsx(
        "flex items-baseline justify-between gap-4 py-3",
        tone === "dark" ? "hair" : "hair-dark",
      )}
    >
      <span
        className={clsx(
          "text-[13px]",
          tone === "dark" ? "text-ash" : "text-smoke",
        )}
      >
        {label}
      </span>
      <span className="tnum text-right text-[14px] font-medium">{value}</span>
    </div>
  );
}
