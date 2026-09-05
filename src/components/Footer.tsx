import Link from "next/link";
import { Logo } from "@/components/Logo";
import { chain, siteConfig } from "@/lib/site-config";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/launch", label: "Launch" },
      { href: "/explore", label: "Explore" },
      { href: "/stats", label: "Stats" },
      { href: "/seats", label: "Vault Seats" },
      { href: "/claim", label: "Claim creator fees" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/docs#templates", label: "Templates" },
      { href: "/docs#contracts", label: "Contracts" },
      { href: "/docs#security", label: "Security model" },
      { href: "/docs#limits", label: "Limits & caveats" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-soot">
      <div className="mx-auto max-w-[1240px] px-5 pb-14 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={34} />
              <span className="font-serif text-[26px] leading-none">
                {siteConfig.wordmark}
              </span>
              <span className="rounded-pill border border-white/15 px-2 py-0.5 font-mono text-[10px] text-ash">
                {siteConfig.version}
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-[14px] leading-relaxed text-ash">
              Vaults for the open pons v2 factory. Independent of pons and of{" "}
              {chain.name}.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-smoke">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-ash transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow text-smoke">Elsewhere</h3>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li>
                {siteConfig.x ? (
                  <a
                    href={siteConfig.x}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ash transition-colors hover:text-paper"
                  >
                    X
                  </a>
                ) : (
                  <span className="text-smoke">X — awaiting launch</span>
                )}
              </li>
              <li>
                {siteConfig.github ? (
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ash transition-colors hover:text-paper"
                  >
                    GitHub
                  </a>
                ) : (
                  <span className="text-smoke">GitHub — awaiting launch</span>
                )}
              </li>
              <li>
                <a
                  href={chain.explorer}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ash transition-colors hover:text-paper"
                >
                  {chain.name} explorer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/*
          The disclosure block. Robinhood sets these at 12px in grey under a
          hairline, several paragraphs long, and it is one of the most
          identifiable parts of their page — a financial product that says what
          it is not.
        */}
        <div className="hair mt-16 space-y-4 pt-8 text-[12px] leading-[1.7] text-smoke">
          <p>
            {siteConfig.name} is an independent vault layer built on the open
            pons v2 factory. It is not affiliated with, endorsed by, or operated
            by pons or by Robinhood, and the name of the chain is used only to
            say where the contracts live.
          </p>
          <p>
            Nothing here is an offer, a solicitation, or investment advice.
            Tokens launched through {siteConfig.name} are permissionless: anyone
            may deploy one, the name and description are chosen by whoever
            deploys it, and their appearance on this site is not a review, an
            audit, or a recommendation. Vault parameters are fixed at launch and
            cannot be edited afterwards — including by us.
          </p>
          <p>
            A vault pays out only what the pool has actually earned in trading
            fees. If a token does not trade, its vault earns nothing and pays
            nothing. There is no yield, no guaranteed return, and no floor: you
            can lose everything you put in.
          </p>
          <p>
            {siteConfig.name} runs a keeper that triggers vault runs as a
            convenience. It holds no privileged permission, and if it stopped
            today any wallet could keep every vault running.
          </p>
        </div>

        <div className="hair mt-8 flex flex-wrap items-center justify-between gap-3 pt-6 text-[12px] text-smoke">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span className="font-mono">
            {chain.name} · chain id {chain.id}
          </span>
        </div>
      </div>
    </footer>
  );
}
