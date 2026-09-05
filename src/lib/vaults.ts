/**
 * A template is a vault contract with one job. You choose one at launch and
 * configure it; the configuration is then fixed for the life of the vault.
 */
export type VaultId =
  | "staking"
  | "stakeburn"
  | "rwa"
  | "lottery"
  | "buyback"
  | "feeshare";

export type VaultTemplate = {
  id: VaultId;
  name: string;
  status: "live" | "soon";
  /** One line, for cards and filter chips. */
  short: string;
  /** The paragraph the launch form and the docs both set. */
  long: string;
  /** What a holder actually has to do to get paid. */
  holderAction: string;
};

export const vaultTemplates: VaultTemplate[] = [
  {
    id: "staking",
    name: "Staking",
    status: "live",
    short: "Fees are paid out to holders who stake, pro rata.",
    long: "Holders stake your token and earn the creator fees in the pairing asset, split by how much each has staked. Nothing is minted and no supply is burned — and because staked tokens sit in the vault, supply leaves circulation for as long as people keep earning on it.",
    holderAction: "Stake to earn",
  },
  {
    id: "stakeburn",
    name: "Stake & Burn",
    status: "live",
    short: "Stake to earn. Half the fees buy the token back and burn it.",
    long: "The staking payout, with a second job bolted on: a fixed share of every fee run is spent buying your token off the market and sending it to a dead address. Stakers earn, and the supply only ever shrinks.",
    holderAction: "Stake to earn",
  },
  {
    id: "rwa",
    name: "RWA Dividend",
    status: "live",
    short: "Fees buy a tokenized stock. Holders claim by balance — no staking.",
    long: "Converts creator fees into a tokenized stock, which the vault holds until holders claim it. Each purchase opens a round, and your share of a round is worked out from what you held the moment it opened — so buying in afterwards dilutes nobody already there.",
    holderAction: "Hold, then claim",
  },
  {
    id: "lottery",
    name: "Lottery",
    status: "live",
    short: "Fees fill a pot. Holders enter. A commit–reveal draw pays one wallet.",
    long: "Fees accumulate into a pot. Tickets are bought with your token and burned. The draw is commit–reveal and run by a stamped operator, so a creator cannot pick the winner of their own raffle.",
    holderAction: "Buy a ticket",
  },
  {
    id: "buyback",
    name: "Buyback & Burn",
    status: "live",
    short: "Every fee run buys the token back and destroys it.",
    long: "Spends a fixed share of incoming fees on a market buy and burns the result immediately, forwarding any remainder to a treasury address you nominate. Set the burn share to 100% and there is no treasury at all.",
    holderAction: "Nothing — supply shrinks",
  },
  {
    id: "feeshare",
    name: "Fee Share",
    status: "live",
    short: "Creator fees go to an X account. They claim them at /claim.",
    long: "No vault at all. The launch points its creator fees at a wallet derived from an X handle, and the escrow credits that address from the first trade. The account named does not need a wallet, and has no say in the matter.",
    holderAction: "Nothing — the named account claims",
  },
];

export const templateById = Object.fromEntries(
  vaultTemplates.map((t) => [t.id, t]),
) as Record<VaultId, VaultTemplate>;

/** The four the landing page shows, in the reference site's order. */
export const featuredTemplates: VaultId[] = [
  "staking",
  "stakeburn",
  "rwa",
  "lottery",
];
