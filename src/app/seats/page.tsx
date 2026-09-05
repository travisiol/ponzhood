import type { Metadata } from "next";
import Link from "next/link";
import { Chip, Section } from "@/components/ui";
import { sampleSeries } from "@/data/launches";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Vault Seats",
  description:
    "Each series is an NFT collection plus its own fuel token. Own a seat, earn the pot.",
};

const buyerSteps = [
  {
    n: "01",
    title: "Get $TOKEN",
    body: "Every series runs on a fuel token — an ERC-20 you need to buy a seat NFT and to activate it for rewards. Most series launch their fuel on a bonding curve, so you can buy it there with ETH or whatever asset that series priced it in.",
  },
  {
    n: "02",
    title: "Trade for a seat",
    body: "Buy next takes the next NFT in line, or type a number and Snipe that exact # if nobody owns it yet. Same $TOKEN price either way; sniping pays a higher ETH fee.",
  },
  {
    n: "03",
    title: "See what you bought",
    body: "Every seat shows its own art from the first sale — nothing is hidden and there is no reveal to wait for. On the house art pack the whole hand is public, including which seat holds the 1 of 1.",
  },
  {
    n: "04",
    title: "Seat wallet",
    body: "Every seat NFT has a built-in wallet. Rewards land there and travel with the NFT if you sell it. The address is fixed the moment the series exists.",
  },
  {
    n: "05",
    title: "Activate for rewards",
    body: "Pay a tiered $TOKEN fee to put your seat on the reward list. Selling or transferring the NFT clears activation — the new owner has to activate again.",
  },
  {
    n: "06",
    title: "Distribute the pot",
    body: "Trade fees fill an ETH bar. When it is full, any wallet can hit Distribute and pay the gas: activated seats share the pot by tier, pushed straight into each seat wallet.",
  },
];

const deskActions = [
  {
    name: "Buy",
    body: "Swap $TOKEN for the next seat NFT in the shop, at the series' fixed price plus an ETH trade fee.",
  },
  {
    name: "Snipe",
    body: "Swap $TOKEN for one specific seat #, whether it was sold back or never minted. Same $TOKEN price, higher ETH fee.",
  },
  {
    name: "Sell",
    body: "Send your seat NFT back to the shop and receive $TOKEN, minus the trade fee.",
  },
  {
    name: "Activate",
    body: "Pay $TOKEN to join the reward payroll, tier weighted. Clears on transfer.",
  },
  {
    name: "Distribute",
    body: "When the ETH pot is full, anyone can start a payout. Activated seats share it by tier.",
  },
  {
    name: "Borrow",
    body: "Lock a seat NFT and borrow $TOKEN principal against it. Repay to unlock, or risk liquidation after the due date.",
  },
];

export default function SeatsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="atmosphere" />
        <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-14 sm:px-8">
          <Chip variant="live">Live</Chip>
          <p className="eyebrow mt-6 text-smoke">Vault Seats</p>
          <h1 className="headline mt-4 max-w-[14ch] text-[clamp(44px,7.5vw,92px)]">
            Own a seat. Earn the pot.
          </h1>
          <p className="mt-6 max-w-[64ch] text-[16px] leading-relaxed text-ash">
            Each series is an NFT collection plus its own fuel $TOKEN. Buy or
            snipe a seat NFT, activate it for rewards, and earn when anyone
            distributes the trade-fee pot into seat wallets.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[12px] text-smoke">
            {["Get $TOKEN", "Trade", "Activate", "Distribute"].map(
              (step, i) => (
                <span key={step} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/25">·</span>}
                  <span>{step}</span>
                </span>
              ),
            )}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/launch" className="pill-volt px-7 py-3.5 text-[15px]">
              Create a series
            </Link>
            <Link href="/docs#seats" className="pill-line px-7 py-3.5 text-[15px]">
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      <Section tone="bone" className="py-20 sm:py-24">
        <p className="eyebrow text-smoke">For buyers</p>
        <h2 className="headline mt-3 text-[clamp(32px,4.6vw,56px)]">
          How a series works.
        </h2>
        <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-smoke">
          Seat = NFT. Fuel = that series&rsquo; $TOKEN. Open any live series and
          use the desk buttons — the same labels as below.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-3">
          {buyerSteps.map((step) => (
            <div
              key={step.n}
              className="group bg-bone p-7 transition-colors duration-200 hover:bg-bone-2"
            >
              <span className="font-mono text-[12px] text-smoke">{step.n}</span>
              <h3 className="mt-4 text-[19px] font-medium">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-smoke">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink" className="py-20 sm:py-24">
        <p className="eyebrow text-smoke">Series desk</p>
        <h2 className="headline mt-3 text-[clamp(32px,4.6vw,56px)]">
          What you can do.
        </h2>
        <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-ash">
          Live on every series page. Buy versus Snipe: next in line, or one
          exact number you pick.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deskActions.map((action) => (
            <div key={action.name} className="panel panel-hover p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-[26px] leading-none">
                  {action.name}
                </h3>
                <Chip variant="live">Live</Chip>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-ash">
                {action.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink" className="pb-20">
        <div className="hair grid gap-10 pt-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow text-smoke">For developers</p>
            <h2 className="headline mt-3 text-[clamp(30px,4vw,46px)]">
              Launch an NFT + $TOKEN series.
            </h2>
          </div>
          <div>
            <p className="text-[15px] leading-relaxed text-ash">
              Pick your art — the Originals pack in one click, or upload your
              own image and choose your own supply — then set the $TOKEN price
              per seat. One wallet confirmation creates the NFT collection,
              shop, activation, fee pot and loans, and launches the fuel $TOKEN
              on a bonding curve so buyers can actually get hold of it.
            </p>
            <Link
              href="/launch"
              className="pill-line mt-6 inline-block px-6 py-3 text-[14px]"
            >
              Create a series
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="ink" className="pb-24">
        <div className="hair flex flex-wrap items-end justify-between gap-4 pt-16">
          <div>
            <p className="eyebrow text-smoke">Browse</p>
            <h2 className="headline mt-3 text-[clamp(30px,4vw,46px)]">
              Live series
            </h2>
          </div>
          <p className="text-[13px] text-smoke">
            Open one to trade, activate, distribute, or borrow.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {sampleSeries.map((series) => (
            <div key={series.fuel} className="panel panel-hover flex items-center gap-5 p-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-tile bg-volt font-serif text-[24px] text-ink">
                {series.initials}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-[17px] font-medium">
                    {series.name}
                  </h3>
                  <span className="font-mono text-[12px] text-smoke">
                    ${series.fuel}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] text-ash">
                  {series.seats} seats · buy with fuel token · earn from the fee
                  pot
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-smoke">
                  {siteConfig.name} seats · awaiting launch
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
