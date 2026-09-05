import type { Metadata } from "next";
import Link from "next/link";
import { Chip } from "@/components/ui";
import {
  ourContracts,
  shortAddress,
  upstreamContracts,
  type ContractRow,
} from "@/lib/contracts";
import { chain, siteConfig } from "@/lib/site-config";
import { vaultTemplates } from "@/lib/vaults";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "An independent vault layer on the open pons v2 factory. What it changes, what it cannot, and where the money goes.",
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "contracts", label: "Contracts" },
  { id: "earns", label: "How a vault earns" },
  { id: "trigger", label: "Who can trigger it" },
  { id: "templates", label: "Templates" },
  { id: "seats", label: "Vault Seats" },
  { id: "parameters", label: "Parameters" },
  { id: "security", label: "Security model" },
  { id: "limits", label: "Limits & caveats" },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-14 sm:px-8">
      <div className="flex items-center gap-2">
        <Chip variant="live">{siteConfig.version}</Chip>
        <Chip>Documentation</Chip>
      </div>

      <h1 className="headline mt-6 text-[clamp(40px,6.5vw,76px)]">
        {siteConfig.wordmark} {siteConfig.version}
      </h1>
      <p className="mt-5 max-w-[70ch] text-[16px] leading-relaxed text-ash">
        An independent vault layer on the open pons v2 factory on {chain.name}.
        It does not change how your token launches or trades — it changes where
        the creator fees go, and what happens to them once they arrive.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[210px_1fr] lg:gap-16">
        <nav className="lg:sticky lg:top-[96px] lg:self-start">
          <p className="eyebrow text-smoke">On this page</p>
          <ul className="mt-4 space-y-2">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-[13px] text-ash transition-colors hover:text-volt"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="min-w-0 max-w-[74ch]">
          <Doc id="overview" title="What problem this solves">
            <P>
              When a pons token launches, the trading fees earned by its
              liquidity position accrue to a creator. That is good for the
              creator and neutral at best for everyone else: the value leaves
              the token the moment it is claimed.
            </P>
            <P>
              A vault changes the destination. Instead of paying a wallet, the
              fees pay a contract with one job — the job you picked when you
              launched. That might be buying the token back and burning it,
              funding a prize pool, or paying stakers who lock up the token. The
              result is a launch where the rules are enforced by code rather
              than by the founder&rsquo;s word.
            </P>
            <Callout>
              Trades create fees. Fees flow to your vault. The vault does what
              you told it to, every time. Anyone can press the button, and
              nobody can stop it.
            </Callout>
          </Doc>

          <Doc id="contracts" title="Contracts">
            <P>
              Everything {siteConfig.name} does happens in these contracts, on{" "}
              {chain.name} ({chain.id}). They are deployed once and reused by
              every launch — the only thing created per token is a small vault
              of your chosen template.
            </P>
            <ContractTable rows={ourContracts} />
            <P>
              Your own vault&rsquo;s address is shown on your token&rsquo;s
              page, and is also readable from the launcher by calling{" "}
              <Code>vaultOf</Code> with your token address.
            </P>

            <H3>What we build on</H3>
            <P>
              These belong to pons and to the chain. {siteConfig.name} calls
              them and cannot change them.
            </P>
            <ContractTable rows={upstreamContracts} />
          </Doc>

          <Doc id="earns" title="How a vault earns">
            <P>
              Every pons launch has its liquidity position held by a locker
              contract. The locker tracks a per-token <Code>feeRedirect</Code>{" "}
              address and pays the creator share of collected fees there, after
              deducting the pons protocol share.
            </P>
            <P>
              Attaching a vault means setting that redirect to the
              vault&rsquo;s address. From then on, collected fees arrive at the
              vault as WETH — an ordinary ERC-20 transfer, not native ETH. When
              the pool has also accrued fees on the token side, the vault
              receives some of your token too.
            </P>
            <P>
              That much is the same for every template. What happens next is the
              part you choose. Buyback &amp; Burn runs this cycle:
            </P>
            <Pre>{`// Buyback & Burn — one template, when triggered
1. sweep pending fees out of the pons locker
2. split the WETH by the configured burn share
3. swap the burn share for your token
4. send every token it holds to 0x…dEaD
5. forward any remainder to the treasury`}</Pre>
          </Doc>

          <Doc id="trigger" title="Who can trigger it">
            <P>
              This is the part worth understanding, because it explains why{" "}
              {siteConfig.name} performs your launch for you rather than bolting
              a vault onto it afterwards.
            </P>
            <P>
              Receiving fees and collecting them are two different permissions
              on the pons locker. The payout follows the fee redirect, but the
              call that sweeps fees out of the locker is only accepted from the
              token&rsquo;s on-chain deployer, or from pons&rsquo;s own protocol
              fee recipient. A redirect target is not authorised — even though
              it is exactly where the money lands.
            </P>
            <P>
              So a vault can receive fees but can never sweep them by itself.{" "}
              {siteConfig.name} closes that gap by launching the token through
              its own launcher contract, which therefore becomes the deployer.
              The launcher exposes an open sweep function, and that is what lets
              the whole cycle run without any privileged operator.
            </P>
            <P>
              In practice you should not have to press anything. A keeper checks
              every live vault every few minutes and triggers a run once the
              accrued fees clear your minimum and are worth more than the gas.
              It is a convenience, not a dependency: it holds no special
              permission, and if it stopped tomorrow any holder could keep the
              vault running from the button on your token&rsquo;s page.
            </P>
            <H3>Attaching a vault to an existing token</H3>
            <P>
              Possible, but not fully automatic. The token&rsquo;s original
              deployer can point the redirect at a vault, and the vault will
              still distribute permissionlessly — but the sweep itself will keep
              needing that deployer&rsquo;s signature.
            </P>
          </Doc>

          <Doc id="templates" title="Templates">
            <P>
              A template is a vault contract with one job. You choose one at
              launch and configure it; the configuration is then fixed for the
              life of the vault.
            </P>
            <div className="mt-6 space-y-5">
              {vaultTemplates.map((t) => (
                <div key={t.id} className="panel p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="font-serif text-[26px] leading-none">
                      {t.name}
                    </h4>
                    <Chip variant={t.status === "live" ? "live" : "soon"}>
                      {t.status === "live" ? "Available now" : "Soon"}
                    </Chip>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-ash">
                    {t.long}
                  </p>
                </div>
              ))}
            </div>
            <P>
              Staking is a deliberate deposit rather than an automatic dividend
              to every holder. Paying holders passively would need the token to
              notify the vault on every transfer, and pons tokens are plain
              ERC-20s whose fees come from the Uniswap pool rather than a
              transfer tax, so no such hook exists. Requiring a deposit is what
              makes the payout computable without one.
            </P>
          </Doc>

          <Doc id="seats" title="Vault Seats">
            <P>
              Separate from bonding-curve launches. Each series is an NFT
              collection plus its own fuel $TOKEN, with a shop, activation, a
              fee pot, and loans. The product UI is at{" "}
              <Link
                href="/seats"
                className="text-volt underline underline-offset-4"
              >
                /seats
              </Link>
              .
            </P>
            <Ul
              items={[
                "Seat NFT — a numbered collectible; uploaded art is the NFT image.",
                "Seat wallet — one per NFT. Rewards land there and move with the NFT on sale. Its address is fixed from the moment the series exists; the wallet contract is deployed the first time the owner spends from it.",
                "Fuel $TOKEN — an ERC-20 for buying seats and paying activation, never ETH. Every series launches its own on a bonding curve in the same transaction that creates the series, so the series has a real market from the first block.",
                "Shop — a fixed $TOKEN price per seat, and the only contract that can mint one. Seats sold back are resold before any new one is minted.",
              ]}
            />
          </Doc>

          <Doc id="parameters" title="Parameters">
            <P>
              Everything you set at launch is stamped into the vault and cannot
              be edited afterwards — not by you, and not by us. There is no
              upgrade path and no admin key on a deployed vault.
            </P>
            <Ul
              items={[
                "Pairing asset — the quote the curve prices in and the asset creator fees arrive in.",
                "Trading tax — 0% to 10%, on top of the protocol's 1.00%. Paid on every buy and every sell.",
                "Template — one of the vaults above.",
                "Payout floor — how much has to accrue before a run is worth the gas. 0.1 in the pairing asset is the floor.",
                "Payout asset — RWA Dividend only, chosen from a short list and fixed forever.",
                "Lock period — Staking only, counted from each staker's most recent deposit. Principal only: rewards can be claimed at any time, lock or no lock.",
              ]}
            />
          </Doc>

          <Doc id="security" title="Security model">
            <Ul
              items={[
                "No admin key on a deployed vault. Parameters are constructor arguments, not storage anyone can write.",
                "No privileged trigger. The sweep is open; the keeper is one caller among all possible callers.",
                "The lottery operator can commit and reveal a draw but cannot choose the winner, and it is stamped at deployment so a creator cannot substitute themselves.",
                "Funds never sit with us. Fees go from the locker to your vault, and from your vault to holders. There is no treasury in the middle that we control.",
                "The contracts are not audited. Read them before you trust them.",
              ]}
            />
          </Doc>

          <Doc id="limits" title="Limits & caveats" last>
            <Ul
              items={[
                "A vault pays out what the pool earned. No trading means no fees, and no fees means no payout — there is no yield here, only a share of activity that may not happen.",
                "RWA Dividend rounds stay claimable for a fixed window. Anything unclaimed rolls into the next round rather than being stranded, which means a late claimer is diluted by the roll rather than paid twice.",
                "The dividend asset list is short on purpose. Most tokenized stocks on this chain have pools holding almost nothing, and converting a round into them would lose most of it to price impact.",
                "Fee Share names an X account that never agreed to anything. Being named is not an endorsement, and the named account may simply never claim.",
                "Nothing on this site is investment advice, and a launch appearing here is not a review of it.",
              ]}
            />
          </Doc>
        </article>
      </div>
    </div>
  );
}

/* ── Prose primitives ───────────────────────────────────────────────────── */

function Doc({
  id,
  title,
  children,
  last,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section id={id} className={last ? "" : "mb-16"}>
      <h2 className="headline scroll-mt-24 text-[clamp(28px,3.6vw,40px)]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-[18px] font-medium text-paper">{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-[1.75] text-ash">{children}</p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[13px] text-paper">
      {children}
    </code>
  );
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="mt-5 overflow-x-auto rounded-tile border border-white/10 bg-soot p-5 font-mono text-[12.5px] leading-[1.8] text-ash">
      {children}
    </pre>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-tile border-l-2 border-volt bg-volt/6 px-5 py-4">
      <p className="text-[15px] leading-relaxed text-paper">{children}</p>
    </div>
  );
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-[1.7] text-ash">
          <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-volt" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ContractTable({ rows }: { rows: ContractRow[] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-tile border border-white/10">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/10 bg-white/3">
            {["Contract", "What it does", "Address"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-smoke"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b border-white/6 last:border-0">
              <td className="px-4 py-4 align-top font-mono text-[12.5px] text-paper">
                {row.name}
              </td>
              <td className="px-4 py-4 align-top text-[13px] leading-relaxed text-ash">
                {row.what}
              </td>
              <td className="whitespace-nowrap px-4 py-4 align-top font-mono text-[12.5px]">
                {row.address ? (
                  <span className="text-volt">{shortAddress(row.address)}</span>
                ) : (
                  <span className="text-smoke">Awaiting launch</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
