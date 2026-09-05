import Link from "next/link";
import clsx from "clsx";
import type { Launch } from "@/data/launches";
import { price, usd } from "@/lib/format";
import { VaultChip } from "@/components/ui";

/**
 * One launch. The ticker is set in the display serif because it is the name of
 * the thing; everything numeric underneath is tabular mono so the cards line up
 * down a column even when the values do not.
 */
export function LaunchCard({ launch }: { launch: Launch }) {
  const graduated = launch.graduation >= 100;

  return (
    <Link
      href={`/token/${launch.ticker.toLowerCase()}`}
      className="panel panel-hover group flex flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[13px] text-ash">{launch.name}</p>
          <p className="headline mt-1 text-[30px]">${launch.ticker}</p>
        </div>
        <span
          className={clsx(
            "shrink-0 rounded-pill px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]",
            graduated
              ? "bg-volt text-ink"
              : "border border-white/15 text-ash",
          )}
        >
          {graduated ? "Graduated" : "Climbing"}
        </span>
      </div>

      {launch.blurb && (
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-ash">
          {launch.blurb}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <VaultChip id={launch.vault} />
        <span className="font-mono text-[11px] text-smoke">
          {launch.vaultLine}
        </span>
      </div>

      {!graduated && (
        <div className="mt-4">
          <div className="h-1 w-full overflow-hidden rounded-pill bg-white/8">
            <div
              className="h-full rounded-pill bg-volt"
              style={{ width: `${Math.max(launch.graduation, 1.5)}%` }}
            />
          </div>
        </div>
      )}

      <div className="hair mt-4 grid grid-cols-3 gap-2 pt-4">
        <Cell label="Price" value={price(launch.priceUsd)} />
        <Cell label="Market cap" value={usd(launch.marketCapUsd)} />
        <Cell
          label={graduated ? "Pair" : "Graduation"}
          value={graduated ? launch.quote : `${launch.graduation}%`}
        />
      </div>

      {/*
        The card is one big link, and nothing inside it looks clickable on its
        own. This foot is what says so: the label brightens and the arrow steps
        up and to the right in the accent, the same tell the reference site
        uses on its token cards.
      */}
      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-smoke transition-colors duration-200 group-hover:text-paper">
          View token
        </span>
        <ArrowUpRight />
      </div>
    </Link>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="text-smoke transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt"
    >
      <path
        d="M3.5 10.5 10.5 3.5M10.5 3.5H5.2m5.3 0v5.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-smoke">
        {label}
      </p>
      <p className="tnum mt-1 text-[13px] font-medium">{value}</p>
    </div>
  );
}
