/**
 * Formatting helpers. All of them take the locale out of the equation by
 * pinning "en-US" — a server render and a client render that disagree on the
 * thousands separator is a hydration mismatch, and it only shows up on the
 * machines that have a different locale than the one it was built on.
 */

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});

/** $33.62K — the form every dollar figure takes on screen. */
export function usd(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "$0";
  if (value < 1) return `$${value.toPrecision(2)}`;
  return `$${compact.format(value)}`;
}

/** Token prices run to seven decimals; compact notation would erase them. */
export function price(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "—";
  if (value >= 1) return `$${value.toFixed(2)}`;
  return `$${value.toFixed(7)}`;
}

/** 1.85B — counts of tokens, not dollars. */
export function count(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value < 1000) return String(value);
  return compact.format(value);
}

export function pct(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

/** "3h ago", "2d ago" — the age column on /explore. */
export function age(hours: number): string {
  if (hours < 1) return "just now";
  if (hours < 24) return `${Math.round(hours)}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
