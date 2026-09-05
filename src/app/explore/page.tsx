import type { Metadata } from "next";
import { ExploreGrid } from "@/components/ExploreGrid";
import { Chip, Section } from "@/components/ui";
import { chain, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Explore launches",
  description:
    "Every token launched through the vault layer, with market data and progress toward graduation.",
};

export default function ExplorePage() {
  return (
    <Section tone="ink" className="pb-24 pt-14">
      <div className="flex items-center gap-2">
        <Chip variant="live">{siteConfig.version}</Chip>
        <Chip>Live on {chain.name}</Chip>
      </div>

      <h1 className="headline mt-6 text-[clamp(40px,6.5vw,76px)]">
        Explore launches
      </h1>
      <p className="mt-5 max-w-[68ch] text-[16px] leading-relaxed text-ash">
        Every token launched through {siteConfig.name} {siteConfig.version},
        with market data and progress toward graduation. Only launches created
        here appear — this is not the full pons feed.
      </p>

      <ExploreGrid />
    </Section>
  );
}
