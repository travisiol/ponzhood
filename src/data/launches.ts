import type { VaultId } from "@/lib/vaults";

export type Launch = {
  name: string;
  ticker: string;
  blurb: string;
  vault: VaultId;
  /** The line under the vault chip: what this vault has actually done. */
  vaultLine: string;
  quote: string;
  priceUsd: number;
  marketCapUsd: number;
  /** Percent of the way to graduating off the bonding curve. 100 = graduated. */
  graduation: number;
  /** Trading tax the creator set on top of the 1.00% protocol fee. */
  tax: number;
  /** Age in hours, for the "Newest" sort. */
  age: number;
};

/**
 * Sample launches.
 *
 * The real /explore reads every launch out of the registry. Until the launcher
 * is deployed that read returns an empty list, and an empty grid tells you
 * nothing about the page. These stand in for it — the pages that render them
 * say so in a line above the grid rather than passing them off as chain data.
 */
export const sampleLaunches: Launch[] = [
  {
    name: "Meme Stock For Trenchers",
    ticker: "MSFT",
    blurb: "The only ticker that pays you in the thing it is named after.",
    vault: "rwa",
    vaultLine: "0.05 MSFT paid out · more on the way",
    quote: "MSFT",
    priceUsd: 0.0000034,
    marketCapUsd: 33_620,
    graduation: 100,
    tax: 5,
    age: 3,
  },
  {
    name: "Hugginghang",
    ticker: "HUGHANG",
    blurb:
      "Hold $HUGHANG, get paid in tokenized NVDA on every trade. No staking, no claim window to miss.",
    vault: "rwa",
    vaultLine: "No dividend paid yet",
    quote: "NVDA",
    priceUsd: 0.0000041,
    marketCapUsd: 18_400,
    graduation: 64,
    tax: 3,
    age: 6,
  },
  {
    name: "Yes Cat",
    ticker: "YES",
    blurb: "He says yes. That is the whole thesis.",
    vault: "staking",
    vaultLine: "291.6K YES staked · 0.03% of supply",
    quote: "ETH",
    priceUsd: 0.0000044,
    marketCapUsd: 12_130,
    graduation: 41,
    tax: 1,
    age: 11,
  },
  {
    name: "Next Round Is Not Your Win",
    ticker: "NRC",
    blurb: "A raffle that burns your ticket whether you win or not.",
    vault: "lottery",
    vaultLine: "0.0028 ETH in the pot",
    quote: "ETH",
    priceUsd: 0.0000039,
    marketCapUsd: 9_870,
    graduation: 28,
    tax: 2,
    age: 14,
  },
  {
    name: "Copper Inu",
    ticker: "COPPERINU",
    blurb:
      "Stake to earn USDG, and watch the rest buy the token back and burn it.",
    vault: "stakeburn",
    vaultLine: "1.85B COPPERINU burned",
    quote: "USDG",
    priceUsd: 0.0000052,
    marketCapUsd: 8_940,
    graduation: 100,
    tax: 5,
    age: 22,
  },
  {
    name: "The Long Green Candle",
    ticker: "GREEN",
    blurb: "Nothing but up. Ask the chart, not me.",
    vault: "buyback",
    vaultLine: "412M GREEN retired across 61 runs",
    quote: "ETH",
    priceUsd: 0.0000048,
    marketCapUsd: 7_420,
    graduation: 73,
    tax: 4,
    age: 27,
  },
  {
    name: "Ponzhood Frog",
    ticker: "PROG",
    blurb: "The official frog. Accept no substitutes, there are eleven.",
    vault: "staking",
    vaultLine: "117.8K PROG staked · 0.01% of supply",
    quote: "ETH",
    priceUsd: 0.0000041,
    marketCapUsd: 6_310,
    graduation: 19,
    tax: 1,
    age: 31,
  },
  {
    name: "Biggest Tradeable Clown",
    ticker: "BTC",
    blurb: "It's all a circus. Let the fun begin.",
    vault: "rwa",
    vaultLine: "0.0009 SPCX paid out · more on the way",
    quote: "SPCX",
    priceUsd: 0.0000036,
    marketCapUsd: 5_880,
    graduation: 12,
    tax: 2,
    age: 38,
  },
  {
    name: "Marry Coin",
    ticker: "38W",
    blurb:
      "Earn the bride price on-chain. A meme narrative, for entertainment only.",
    vault: "staking",
    vaultLine: "Nobody staked yet",
    quote: "ETH",
    priceUsd: 0.0000043,
    marketCapUsd: 5_240,
    graduation: 8,
    tax: 1,
    age: 45,
  },
  {
    name: "Timsouw",
    ticker: "TIMSOUW",
    blurb: "Justice for timsouw.",
    vault: "feeshare",
    vaultLine: "Fee sharing to @timsouw",
    quote: "ETH",
    priceUsd: 0.0000041,
    marketCapUsd: 4_910,
    graduation: 6,
    tax: 3,
    age: 52,
  },
  {
    name: "Macroduck",
    ticker: "MACRODUCK",
    blurb: "He calls the top. He has never called the top.",
    vault: "feeshare",
    vaultLine: "Fee sharing to @macroduck · 0.14 ETH claimed",
    quote: "ETH",
    priceUsd: 0.0000038,
    marketCapUsd: 4_130,
    graduation: 4,
    tax: 1,
    age: 58,
  },
  {
    name: "Method Eth",
    ticker: "M",
    blurb: "M/ETH is the GOAT pair — stack $M, earn $ETH.",
    vault: "staking",
    vaultLine: "0.0000 ETH waiting on the next run",
    quote: "ETH",
    priceUsd: 0.0000037,
    marketCapUsd: 3_760,
    graduation: 2,
    tax: 3,
    age: 66,
  },
];

/** Protocol totals. Same caveat as the launches above. */
export const sampleStats = {
  stakers: 231,
  positions: 295,
  vaultsWithStakers: 40,
  stakedUsd: 182_210,
  stakedTokens: 766_930_000,
  stakedSupplyPct: 1.92,
  burnedUsd: 233_950,
  burnedTokens: 1_850_000_000,
  burnedSupplyPct: 6.39,
  paidUsd: 547_980,
  paidVaults: 50,
  launches: 138,
  runs: 922,
  feesUsd: 1_080_000,
  burningVaults: 29,
  byTemplate: [
    { id: "stakeburn" as const, count: 50 },
    { id: "rwa" as const, count: 42 },
    { id: "staking" as const, count: 27 },
    { id: "buyback" as const, count: 19 },
  ],
} as const;

/** Live seat series, for /seats. */
export const sampleSeries = [
  {
    name: "Artificial General Intelligence",
    fuel: "AGI",
    seats: 1024,
    initials: "AG",
  },
  { name: "Ponzhood Animals", fuel: "HMM", seats: 1111, initials: "HM" },
] as const;
