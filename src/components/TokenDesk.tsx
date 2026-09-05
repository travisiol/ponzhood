import Link from "next/link";
import { Chip, Section } from "@/components/ui";
import type { Launch } from "@/data/launches";
import { price, usd } from "@/lib/format";
import { chain, siteConfig } from "@/lib/site-config";
import { templateById } from "@/lib/vaults";

/**
 * One token, under whichever brand is showing it — the plain token page and a
 * partner desk are the same object with a different byline, so they are one
 * component rather than two that drift apart.
 */
export function TokenDesk({
  launch,
  partner,
}: {
  launch: Launch;
  partner?: string;
}) {
  const template = templateById[launch.vault];
  const split = feeSplit(launch);
  const graduated = launch.graduation >= 100;

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="atmosphere" />
        <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-14 sm:px-8">
          {partner ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow text-smoke">Partner desk</span>
              <span className="rounded-pill border border-white/12 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
                {partner}
              </span>
            </div>
          ) : (
            <Link
              href="/explore"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke transition-colors hover:text-paper"
            >
              ← All launches
            </Link>
          )}

          <div className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-3">
            <h1 className="headline text-[clamp(42px,7vw,88px)]">
              {launch.name}
            </h1>
            <span className="mb-2 font-mono text-[18px] text-volt">
              ${launch.ticker}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Chip variant={graduated ? "live" : "line"}>
              {graduated ? "Graduated" : `Climbing · ${launch.graduation}%`}
            </Chip>
            <Chip>{template.name}</Chip>
            <Chip>Paired in {launch.quote}</Chip>
          </div>

          {launch.blurb && (
            <p className="mt-6 max-w-[66ch] text-[16px] leading-relaxed text-ash">
              {launch.blurb}
            </p>
          )}

          <div className="mt-10 grid max-w-[720px] gap-8 sm:grid-cols-3">
            <Figure label="Price" value={price(launch.priceUsd)} />
            <Figure label="Market cap" value={usd(launch.marketCapUsd)} />
            <Figure label="Trading tax" value={`${launch.tax}%`} />
          </div>

          <button
            type="button"
            disabled
            className="pill-line mt-10 cursor-not-allowed px-7 py-3.5 text-[15px] opacity-55"
          >
            {template.holderAction} — awaiting launch
          </button>
        </div>
      </section>

      {/* ── Where the tax goes ─────────────────────────────────────────── */}
      <Section tone="bone" className="py-20 sm:py-24">
        <p className="eyebrow text-smoke">
          Where the {launch.tax}% goes
        </p>
        <h2 className="headline mt-3 max-w-[20ch] text-[clamp(30px,4.4vw,52px)]">
          Taken automatically, on every buy and every sell.
        </h2>
        <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-smoke">
          There is nothing to claim from a trade, and nothing you need to do to
          make it happen.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-black/8 bg-black/8 sm:grid-cols-3">
          {split.map((part) => (
            <div key={part.label} className="bg-bone p-7">
              <p className="headline tnum text-[46px]">{part.pct}%</p>
              <h3 className="mt-3 text-[17px] font-medium">{part.label}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-smoke">
                {part.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[70ch] text-[13px] leading-relaxed text-smoke">
          Staked tokens are never burned, and staking never locks them up unless
          the creator set a lock at launch — the payout runs automatically once
          enough fees have built up to be worth the gas.
        </p>
      </Section>

      {/* ── What it has done ───────────────────────────────────────────── */}
      <Section tone="ink" className="py-20 sm:py-24">
        <p className="eyebrow text-smoke">What it has done so far</p>
        <h2 className="headline mt-3 text-[clamp(30px,4.4vw,52px)]">
          Nothing yet — there is no vault to read.
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Staked", note: `${launch.ticker} in the vault` },
            { label: "People staking", note: "wallets with a live position" },
            { label: "Burned", note: "bought back and destroyed" },
            { label: "Paid out", note: `over — payouts, in ${launch.quote}` },
          ].map((item) => (
            <div key={item.label}>
              <p className="eyebrow text-smoke">{item.label}</p>
              <p className="headline mt-3 text-[44px] text-smoke">—</p>
              <p className="mt-2 text-[13px] text-smoke">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="hair mt-16 pt-10">
          <p className="eyebrow text-smoke">The contracts</p>
          <h3 className="headline mt-3 text-[clamp(26px,3.4vw,38px)]">
            Checkable without trusting this page.
          </h3>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-ash">
            Everything above is meant to be read off the chain rather than taken
            from us. Until {siteConfig.name} has a launcher deployed on{" "}
            {chain.name} there is no token here to check, and this desk shows
            the shape of the page rather than a live position.
          </p>

          <dl className="mt-8 max-w-[560px]">
            {[
              { label: "Token", value: "Awaiting launch" },
              { label: "Vault", value: "Awaiting launch" },
              { label: "Template", value: template.name },
              { label: "Pairing asset", value: launch.quote },
            ].map((row) => (
              <div
                key={row.label}
                className="hair flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-[13px] text-ash">{row.label}</dt>
                <dd className="font-mono text-[13px] text-smoke">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/docs#contracts"
            className="pill-line mt-8 inline-block px-6 py-3 text-[14px]"
          >
            How the contracts fit together
          </Link>
        </div>
      </Section>
    </>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-smoke">{label}</p>
      <p className="headline tnum mt-3 text-[38px]">{value}</p>
    </div>
  );
}

/**
 * The tax, split three ways. The protocol's 1.00% is charged on every pons
 * launch and is the same for every token on the platform; what is left is the
 * creator's, and the vault decides where it lands.
 */
function feeSplit(launch: Launch) {
  const PROTOCOL = 1;
  const creator = Math.max(launch.tax - PROTOCOL, 0);
  const protocolPart = {
    pct: PROTOCOL,
    label: "Goes to pons",
    body: "The protocol fee charged on every pons launch. It is the same for every token on the platform.",
  };

  switch (launch.vault) {
    case "stakeburn":
      return [
        {
          pct: round(creator / 2),
          label: `Paid to stakers in ${launch.quote}`,
          body: `Converted into ${launch.quote} and shared between everyone who has staked, in proportion to how much. Claim it whenever you like.`,
        },
        {
          pct: round(creator / 2),
          label: `Buys ${launch.ticker} back and burns it`,
          body: "Spent buying the token off the market, then sent to a dead address. Those tokens are gone for good, so the supply only ever shrinks.",
        },
        protocolPart,
      ];
    case "buyback":
      return [
        {
          pct: round(creator),
          label: `Buys ${launch.ticker} back and burns it`,
          body: "Every run spends the whole creator share on a market buy and destroys the result immediately.",
        },
        { pct: 0, label: "Paid to holders", body: "Nothing is paid out — the value returns as supply that no longer exists." },
        protocolPart,
      ];
    case "rwa":
      return [
        {
          pct: round(creator),
          label: `Buys ${launch.quote} for holders`,
          body: "Converted into the tokenized stock and held by the vault until holders claim it. Your share of a round is set by what you held when it opened.",
        },
        { pct: 0, label: "Staking required", body: "None. Holders earn by holding — there is nothing to stake and nothing to opt into." },
        protocolPart,
      ];
    case "lottery":
      return [
        {
          pct: round(creator),
          label: "Fills the pot",
          body: "Accumulates until a draw. Tickets are bought with the token and burned, and the draw is commit–reveal so the creator cannot pick the winner.",
        },
        { pct: 0, label: "Paid to holders directly", body: "Nothing. One wallet takes the pot each round." },
        protocolPart,
      ];
    case "feeshare":
      return [
        {
          pct: round(creator),
          label: "Goes to an X account",
          body: "Credited to a wallet derived from a handle. The account named does not need a wallet, and claims what has built up at /claim.",
        },
        { pct: 0, label: "Paid to holders", body: "Nothing. A Fee Share launch has no vault." },
        protocolPart,
      ];
    default:
      return [
        {
          pct: round(creator),
          label: `Paid to stakers in ${launch.quote}`,
          body: `Shared between everyone who has staked, in proportion to how much. Nothing is minted and no supply is burned.`,
        },
        { pct: 0, label: "Burned", body: "Nothing. Staked tokens leave circulation while they earn, but they are never destroyed." },
        protocolPart,
      ];
  }
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
