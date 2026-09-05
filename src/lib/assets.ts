/**
 * Approved quote assets. A launch is priced in one of these, creator fees
 * arrive in it, and an RWA Dividend paired against the same stock pays that
 * stock out with no swap in the middle.
 */
export type QuoteAsset = {
  ticker: string;
  name: string;
  kind: "native" | "stock" | "etf" | "stable";
};

export const quoteAssets: QuoteAsset[] = [
  { ticker: "ETH", name: "Ether", kind: "native" },
  { ticker: "AAPL", name: "Apple", kind: "stock" },
  { ticker: "NVDA", name: "NVIDIA", kind: "stock" },
  { ticker: "TSLA", name: "Tesla", kind: "stock" },
  { ticker: "GOOGL", name: "Alphabet Class A", kind: "stock" },
  { ticker: "GME", name: "GameStop", kind: "stock" },
  { ticker: "SPY", name: "SPDR S&P 500 ETF Trust", kind: "etf" },
  { ticker: "SPCX", name: "SpaceX Class A", kind: "stock" },
  { ticker: "AMD", name: "AMD", kind: "stock" },
  { ticker: "SNDK", name: "Sandisk Corporation", kind: "stock" },
  { ticker: "MSFT", name: "Microsoft", kind: "stock" },
  { ticker: "AMZN", name: "Amazon", kind: "stock" },
  { ticker: "META", name: "Meta Platforms", kind: "stock" },
  { ticker: "MU", name: "Micron Technology", kind: "stock" },
  { ticker: "COIN", name: "Coinbase", kind: "stock" },
  { ticker: "MSTR", name: "Strategy Inc.", kind: "stock" },
  { ticker: "CRCL", name: "Circle Internet Group", kind: "stock" },
  { ticker: "PLTR", name: "Palantir Technologies", kind: "stock" },
  { ticker: "QQQ", name: "Invesco QQQ", kind: "etf" },
  { ticker: "COST", name: "Costco", kind: "stock" },
  { ticker: "TTWO", name: "Take-Two Interactive", kind: "stock" },
  { ticker: "RDDT", name: "Reddit", kind: "stock" },
  { ticker: "DJT", name: "Trump Media & Technology", kind: "stock" },
  { ticker: "BB", name: "Blackberry", kind: "stock" },
  { ticker: "USDG", name: "Global Dollar", kind: "stable" },
];

export function labelFor(asset: QuoteAsset): string {
  return asset.kind === "native" || asset.kind === "stable"
    ? `${asset.ticker} — ${asset.name}`
    : `${asset.ticker} — ${asset.name} · Robinhood Token`;
}

/**
 * Payout assets an RWA Dividend vault may buy. Deliberately shorter than the
 * quote list: most tokenized stocks on this chain have pools that hold almost
 * nothing, so converting a round into them would lose the round to price
 * impact. Only assets deep enough to fill a round at a fair price are offered.
 */
export const dividendAssets = ["GME", "NVDA", "SPCX"] as const;
