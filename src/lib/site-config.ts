/**
 * The name lives here and nowhere else.
 *
 * `name` is the all-caps lockup (metadata, OG image, footer), `wordmark` the
 * title-case form the nav and hero set, `ticker` the dollar form. Renaming the
 * project means editing these three strings and the NEXT_PUBLIC_PONZHOOD_* env
 * prefix — never a grep-and-replace through the components.
 */
export const siteConfig = {
  name: "PONZHOOD",
  wordmark: "Ponzhood",
  ticker: "$PONZHOOD",
  version: "V2",
  tagline: "Launch tokens with a vault attached.",
  description:
    "Creator fees land in your pairing asset. The contract spends them on buybacks, staking, or a stock dividend — every time, without an operator.",
  seoDescription:
    "An independent vault layer on the open pons v2 factory. Attach a vault to your creator fees at launch and the contract runs itself.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ponzhood.example",
  x: process.env.NEXT_PUBLIC_PONZHOOD_X ?? null,
  github: process.env.NEXT_PUBLIC_PONZHOOD_GITHUB ?? null,
} as const;

export const chain = {
  name: "Robinhood Chain",
  id: 4663,
  currency: "ETH",
  rpcUrl: process.env.NEXT_PUBLIC_PONZHOOD_RPC_URL ?? "https://rpc.rbh.network",
  explorer:
    process.env.NEXT_PUBLIC_PONZHOOD_EXPLORER ?? "https://explorer.rbh.network",
} as const;

/** Routes, in nav order. One source for the nav, the footer and the sitemap. */
export const nav = [
  { href: "/explore", label: "Explore" },
  { href: "/stats", label: "Stats" },
  { href: "/seats", label: "Seats" },
  { href: "/launch", label: "Launch" },
  { href: "/claim", label: "Claim" },
  { href: "/docs", label: "Docs" },
] as const;

/**
 * Everything on this site that reads a number from the chain reads zero until
 * the launcher is deployed. Rather than ship invented figures, the pages fall
 * back to a sample set and say so — this flag is what they check.
 */
export const isLive = process.env.NEXT_PUBLIC_PONZHOOD_LIVE === "true";
