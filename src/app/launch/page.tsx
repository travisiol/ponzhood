import type { Metadata } from "next";
import Link from "next/link";
import { LaunchForm } from "@/components/LaunchForm";
import { Chip, Section } from "@/components/ui";
import { chain, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Launch a token",
  description:
    "Pick a pairing asset, attach a vault to your creator fees, and sign from your own wallet.",
};

export default function LaunchPage() {
  return (
    <Section tone="ink" className="pb-24 pt-14">
      <Link
        href="/"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-smoke transition-colors hover:text-paper"
      >
        ← Back
      </Link>

      <div className="mt-6 flex items-center gap-2">
        <Chip variant="live">{siteConfig.version}</Chip>
        <Chip>{siteConfig.name}</Chip>
      </div>

      <h1 className="headline mt-6 text-[clamp(40px,6.5vw,76px)]">
        Launch your token
      </h1>
      <p className="mt-5 max-w-[68ch] text-[16px] leading-relaxed text-ash">
        Open pons v2 factory on {chain.name}. Pick a pairing asset, attach a
        vault to your creator fees, and sign from your own wallet. For NFT seat
        series, use{" "}
        <Link href="/seats" className="text-volt underline underline-offset-4">
          Vault Seats
        </Link>
        .
      </p>

      <div className="mt-12">
        <LaunchForm />
      </div>
    </Section>
  );
}
