export type Address = `0x${string}`;

function addr(value: string | undefined): Address | null {
  const trimmed = value?.trim();
  return trimmed && /^0x[0-9a-fA-F]{40}$/.test(trimmed)
    ? (trimmed as Address)
    : null;
}

export type ContractRow = {
  key: string;
  name: string;
  what: string;
  address: Address | null;
};

/**
 * Ours. Deployed once and reused by every launch — the only thing created per
 * token is a small vault of the chosen template.
 *
 * Every address is read from the environment. Nothing is hardcoded, so a
 * placeholder address can never ship pretending to be real: unset reads as
 * "Awaiting deployment" everywhere it is rendered.
 */
export const ourContracts: ContractRow[] = [
  {
    key: "launcher",
    name: "PonzhoodVaultLauncher",
    what: "Launches a pons v2 token, attaches a vault, and points creator fees at it.",
    address: addr(process.env.NEXT_PUBLIC_PONZHOOD_LAUNCHER),
  },
  {
    key: "registry",
    name: "PonzhoodVaultRegistry",
    what: "Maps a template id to the factory that builds it.",
    address: addr(process.env.NEXT_PUBLIC_PONZHOOD_REGISTRY),
  },
  {
    key: "staking",
    name: "PonzhoodStakingVaultFactory",
    what: "Deploys one Staking vault per token.",
    address: addr(process.env.NEXT_PUBLIC_PONZHOOD_STAKING_FACTORY),
  },
  {
    key: "stakeburn",
    name: "PonzhoodStakeBurnVaultFactory",
    what: "Deploys one Stake & Burn vault per token and stamps the payout asset.",
    address: addr(process.env.NEXT_PUBLIC_PONZHOOD_STAKEBURN_FACTORY),
  },
  {
    key: "rwa",
    name: "PonzhoodRwaVaultFactory",
    what: "Deploys one RWA Dividend vault per token and fixes the round distributor.",
    address: addr(process.env.NEXT_PUBLIC_PONZHOOD_RWA_FACTORY),
  },
  {
    key: "lottery",
    name: "PonzhoodLotteryVaultFactory",
    what: "Deploys one Lottery vault per token. Stamps the operator that commits and reveals each draw, so a creator cannot pick the winner of their own raffle.",
    address: addr(process.env.NEXT_PUBLIC_PONZHOOD_LOTTERY_FACTORY),
  },
];

/**
 * Not ours. These belong to pons and the chain — PONZHOOD calls them and cannot
 * change them.
 */
export const upstreamContracts: ContractRow[] = [
  {
    key: "factory",
    name: "pons v2 factory",
    what: "Open launch factory. PONZHOOD calls it rather than replacing it.",
    address: addr(process.env.NEXT_PUBLIC_PONS_FACTORY),
  },
  {
    key: "escrow",
    name: "pons fee escrow",
    what: "Holds claimable creator balances in the launch quote asset.",
    address: addr(process.env.NEXT_PUBLIC_PONS_ESCROW),
  },
  {
    key: "poolmanager",
    name: "Uniswap v4 PoolManager",
    what: "Where graduated launches trade once the bonding curve is done.",
    address: addr(process.env.NEXT_PUBLIC_UNISWAP_POOL_MANAGER),
  },
];

export const anyContractDeployed = ourContracts.some((c) => c.address !== null);

/** `0x1770…3dBA` — the form every address takes on screen. */
export function shortAddress(value: Address): string {
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}
