import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { HeroScene } from "@/components/HeroScene";
import { FeeFlow } from "@/components/FeeFlow";
import { LaunchCard } from "@/components/LaunchCard";
import { Chip, Eyebrow, Section, SampleNote } from "@/components/ui";
import { sampleLaunches } from "@/data/launches";
import { chain, siteConfig } from "@/lib/site-config";
import { vaultTemplates } from "@/lib/vaults";

const steps = [
  {
    n: "01",
    title: "Pick a pair & vault",
    body: "Choose an approved quote asset and a vault — Staking, Stake & Burn, RWA Dividend, Lottery, Buyback or Fee Share.",
  },
  {
    n: "02",
    title: "Launch in one tx",
    body: "We deploy the token through pons v2, create the vault, and point the fee redirect at it. One signature, from your own wallet.",
  },
  {
    n: "03",
    title: "It runs itself",
    body: "Trading accrues fees. Anyone can press run — or our keeper does it for you, with no permission you could not revoke by ignoring it.",
  },
];

export default function Home() {
  const featured = [...sampleLaunches]
    .sort((a, b) => b.marketCapUsd - a.marketCapUsd)
    .slice(0, 6);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        <div className="atmosphere" />
        <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-20 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[880px] text-center">
            <div className="flex items-center justify-center gap-2">
              <Chip variant="live">Live on pons v2</Chip>
              <Chip>{chain.name}</Chip>
            </div>

            <h1 className="headline mt-8 text-[clamp(46px,8.2vw,104px)]">
              Launch tokens with
              <br />a vault attached.
            </h1>

            <p className="mx-auto mt-7 max-w-[62ch] text-[17px] leading-relaxed text-ash">
              {siteConfig.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/launch" className="pill-volt px-7 py-3.5 text-[15px]">
                Start a launch
              </Link>
              <Link href="/docs" className="pill-line px-7 py-3.5 text-[15px]">
                Read the docs
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 text-[12px] text-smoke">
              <span>Partner desks</span>
              <Link
                href="/desk/coppertrail"
                className="rounded-pill border border-white/12 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ash transition-colors hover:border-white/30 hover:text-paper"
              >
                Coppertrail
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <HeroScene />
          </div>

          <div className="mt-16">
            <p className="eyebrow mb-4 text-center text-smoke">Pair against</p>
            <Marquee />
          </div>
        </div>
      </section>

      {/* ── Biggest vaults ───────────────────────────────────────────────── */}
      <Section id="vaults" tone="ink" className="py-20 sm:py-24">
        <div className="hair flex flex-wrap items-end justify-between gap-4 pt-16">
          <div>
            <Eyebrow>Live on {siteConfig.name}</Eyebrow>
            <h2 className="headline mt-3 text-[clamp(34px,5vw,58px)]">
              The biggest vaults right now.
            </h2>
          </div>
          <Link
            href="/explore"
            className="pill-line px-5 py-2.5 text-[14px] whitespace-nowrap"
          >
            Explore all
          </Link>
        </div>

        <SampleNote what="this grid" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((launch) => (
            <LaunchCard key={launch.ticker} launch={launch} />
          ))}
        </div>
      </Section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <Section id="how" tone="ink" className="pb-20 sm:pb-24">
        <div className="hair pt-16">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="headline mt-3 max-w-[16ch] text-[clamp(34px,5vw,58px)]">
            Three steps. One signature.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-white/8 bg-white/8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.n}
                className="group bg-ink p-7 transition-colors duration-200 hover:bg-raise"
              >
                <span className="font-mono text-[12px] text-smoke transition-colors duration-200 group-hover:text-volt">
                  {step.n}
                </span>
                <h3 className="mt-5 text-[19px] font-medium">{step.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ash">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <p className="eyebrow mb-6 text-smoke">Where a trade ends up</p>
            <FeeFlow />
          </div>
        </div>
      </Section>

      {/* ── Templates, on the light ground ───────────────────────────────── */}
      <Section id="templates" tone="bone" className="py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Templates</Eyebrow>
            <h2 className="headline mt-3 text-[clamp(34px,5vw,58px)]">
              Pick the job. It is fixed at launch.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[14px] leading-relaxed text-smoke">
            A template is a vault contract with one job. You configure it once,
            and neither you nor we can change it afterwards.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vaultTemplates.map((template) => (
            <div
              key={template.id}
              className="panel-light flex flex-col p-6 transition-shadow hover:shadow-[0_18px_50px_-24px_rgba(17,14,8,0.45)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-[28px] leading-none">
                  {template.name}
                </h3>
                <Chip
                  variant={template.status === "live" ? "live" : "dark"}
                  on="light"
                >
                  {template.status === "live" ? "Live" : "Soon"}
                </Chip>
              </div>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-smoke">
                {template.short}
              </p>
              <p className="hair-dark mt-5 pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-smoke">
                Holder does: {template.holderAction}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Closing call ─────────────────────────────────────────────────── */}
      <Section tone="ink" className="py-24 sm:py-32">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="headline text-[clamp(38px,6vw,76px)]">
            Ready when you are.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-[16px] leading-relaxed text-ash">
            Connect on {chain.name}, pick a pairing asset, and launch with a
            vault attached.
          </p>
          <Link
            href="/launch"
            className="pill-volt mt-9 inline-block px-8 py-4 text-[15px]"
          >
            Open the launchpad
          </Link>
        </div>
      </Section>
    </>
  );
}
