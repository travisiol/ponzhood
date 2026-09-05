"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { LaunchCard } from "@/components/LaunchCard";
import { SampleNote } from "@/components/ui";
import { sampleLaunches } from "@/data/launches";
import { vaultTemplates, type VaultId } from "@/lib/vaults";

type Sort = "newest" | "mcap";
type Status = "all" | "graduated" | "climbing";

const sorts: { id: Sort; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "mcap", label: "Highest market cap" },
];

const statuses: { id: Status; label: string }[] = [
  { id: "all", label: "All statuses" },
  { id: "graduated", label: "Graduated" },
  { id: "climbing", label: "Climbing" },
];

export function ExploreGrid() {
  const [sort, setSort] = useState<Sort>("mcap");
  const [status, setStatus] = useState<Status>("all");
  const [vault, setVault] = useState<VaultId | "all">("all");

  const launches = useMemo(() => {
    const filtered = sampleLaunches.filter((l) => {
      const graduated = l.graduation >= 100;
      if (status === "graduated" && !graduated) return false;
      if (status === "climbing" && graduated) return false;
      if (vault !== "all" && l.vault !== vault) return false;
      return true;
    });
    return filtered.sort((a, b) =>
      sort === "newest" ? a.age - b.age : b.marketCapUsd - a.marketCapUsd,
    );
  }, [sort, status, vault]);

  return (
    <>
      <SampleNote what="this feed" />

      <div className="mt-8 flex flex-col gap-3">
        <FilterRow>
          {sorts.map((s) => (
            <FilterChip
              key={s.id}
              active={sort === s.id}
              onClick={() => setSort(s.id)}
            >
              {s.label}
            </FilterChip>
          ))}
          <span className="mx-1 h-5 w-px self-center bg-white/12" />
          {statuses.map((s) => (
            <FilterChip
              key={s.id}
              active={status === s.id}
              onClick={() => setStatus(s.id)}
            >
              {s.label}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow>
          <FilterChip active={vault === "all"} onClick={() => setVault("all")}>
            All vault types
          </FilterChip>
          {vaultTemplates.map((t) => (
            <FilterChip
              key={t.id}
              active={vault === t.id}
              onClick={() => setVault(t.id)}
            >
              {t.name}
            </FilterChip>
          ))}
        </FilterRow>
      </div>

      <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.12em] text-smoke">
        {launches.length} {launches.length === 1 ? "launch" : "launches"}
      </p>

      {launches.length === 0 ? (
        <div className="panel mt-4 p-10 text-center">
          <p className="font-serif text-[26px]">Nothing here yet.</p>
          <p className="mt-2 text-[14px] text-ash">
            No launch in the set matches those filters.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {launches.map((launch) => (
            <LaunchCard key={launch.ticker} launch={launch} />
          ))}
        </div>
      )}
    </>
  );
}

function FilterRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        "shrink-0 rounded-pill px-3.5 py-2 text-[13px] transition-colors",
        // A selected filter is a white fill, not the accent: three filter
        // groups can be active at once, and three neon chips would out-shout
        // the one control on the page that is meant to be loud.
        active
          ? "bg-paper font-medium text-ink"
          : "border border-white/12 text-ash hover:border-white/28 hover:text-paper",
      )}
    >
      {children}
    </button>
  );
}
