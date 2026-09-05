import { quoteAssets } from "@/lib/assets";

/**
 * The pairing assets, running. The list is rendered twice inside a track that
 * translates by exactly -50%, so the seam lands where the second copy starts
 * and the loop has no jump. The animation is continuous rather than triggered
 * by scroll, which also means a screenshot taken at any moment shows it mid-run
 * rather than at frame zero.
 */
export function Marquee() {
  const row = [...quoteAssets, ...quoteAssets];
  return (
    <div className="relative overflow-hidden py-1 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee-track gap-2">
        {row.map((asset, i) => (
          <span
            key={`${asset.ticker}-${i}`}
            className="shrink-0 rounded-pill border border-white/10 px-3.5 py-1.5 font-mono text-[12px] tracking-[0.06em] text-ash"
          >
            {asset.ticker}
          </span>
        ))}
      </div>
    </div>
  );
}
