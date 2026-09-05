import type { Metadata } from "next";
import { Chip, Section, SampleNote, Stat } from "@/components/ui";
import { sampleStats } from "@/data/launches";
import { count, usd } from "@/lib/format";
import { chain, siteConfig } from "@/lib/site-config";
import { templateById } from "@/lib/vaults";

export const metadata: Metadata = {
  title: "Protocol stats",
  description:
    "Every vault ever built, added up — staking, burns, and every trade behind them.",
};

export default function StatsPage() {
  const totalByTemplate = sampleStats.byTemplate.reduce(
    (sum, t) => sum + t.count,
    0,
  );

  return (
    <>
      <Section tone="ink" className="pb-16 pt-14">
        <div className="flex items-center gap-2">
          <Chip variant="live">Live</Chip>
          <Chip>Read from the chain, not an index</Chip>
        </div>

        <h1 className="headline mt-6 text-[clamp(40px,6.5vw,76px)]">
          Protocol stats
        </h1>
        <p className="mt-5 max-w-[68ch] text-[16px] leading-relaxed text-ash">
          Every vault {siteConfig.name} has ever built, added up. Staking,
          burns, and every trade behind them — counted from the chain itself,
          not from an index.
        </p>

        <SampleNote what="every figure below" />

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Stakers"
            value={count(sampleStats.stakers)}
            note={`${sampleStats.positions} positions across ${sampleStats.vaultsWithStakers} vaults`}
          />
          <Stat
            label="Staked"
            value={usd(sampleStats.stakedUsd)}
            note={`${count(sampleStats.stakedTokens)} tokens · ${sampleStats.stakedSupplyPct}% of supply per launch`}
          />
          <Stat
            label="Burned"
            value={usd(sampleStats.burnedUsd)}
            note={`${count(sampleStats.burnedTokens)} tokens · ${sampleStats.burnedSupplyPct}% of supply per launch`}
          />
          <Stat
            label="Paid to holders"
            value={usd(sampleStats.paidUsd)}
            note={`across ${sampleStats.paidVaults} vaults`}
          />
        </div>
      </Section>

      <Section tone="bone" className="py-20 sm:py-24">
        <p className="eyebrow text-smoke">What it has done</p>
        <h2 className="headline mt-3 text-[clamp(32px,4.6vw,54px)]">
          Fees, taken out of trades and put to work.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Launches",
              value: count(sampleStats.launches),
              note: "vaults built to work for holders",
            },
            {
              label: "Vault runs",
              value: count(sampleStats.runs),
              note: "buybacks, burns and payouts executed",
            },
            {
              label: "Fees to vaults",
              value: usd(sampleStats.feesUsd),
              note: "taken out of trades and put to work",
            },
            {
              label: "Vaults burning",
              value: count(sampleStats.burningVaults),
              note: "have actually retired supply",
            },
          ].map((item) => (
            <div key={item.label} className="bg-bone p-7">
              <p className="eyebrow text-smoke">{item.label}</p>
              <p className="headline tnum mt-4 text-[40px]">{item.value}</p>
              <p className="mt-2 text-[13px] leading-snug text-smoke">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow text-smoke">Vaults by template</p>
            <h3 className="headline mt-3 text-[32px]">
              What creators actually pick.
            </h3>
            <p className="mt-4 max-w-[44ch] text-[14px] leading-relaxed text-smoke">
              The share of live vaults running each template. A creator picks
              once, at launch, and the choice is fixed from then on — so this
              is a record of decisions, not of fashion.
            </p>
          </div>

          <div className="space-y-5">
            {sampleStats.byTemplate.map((row) => {
              const share = Math.round((row.count / totalByTemplate) * 100);
              return (
                <div key={row.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[15px] font-medium">
                      {templateById[row.id].name}
                    </span>
                    <span className="tnum font-mono text-[13px] text-smoke">
                      {row.count} · {share}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-pill bg-black/8">
                    <div
                      className="h-full rounded-pill bg-ink"
                      style={{ width: `${share}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section tone="ink" className="py-12">
        <p className="text-center font-mono text-[12px] text-smoke">
          Would read live from {sampleStats.launches} vaults on {chain.name} ·
          awaiting launch
        </p>
      </Section>
    </>
  );
}
