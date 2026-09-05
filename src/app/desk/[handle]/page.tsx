import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TokenDesk } from "@/components/TokenDesk";
import { sampleLaunches } from "@/data/launches";

/**
 * A partner desk is one token shown under someone else's byline — a
 * white-label page pointed at a single launch. The mapping is a table rather
 * than a lookup on the launch, because a desk belongs to the partner, not to
 * the token.
 */
const desks: Record<string, { partner: string; ticker: string }> = {
  coppertrail: { partner: "coppertrail", ticker: "COPPERINU" },
};

export function generateStaticParams() {
  return Object.keys(desks).map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/desk/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const desk = desks[handle.toLowerCase()];
  const launch = desk && sampleLaunches.find((l) => l.ticker === desk.ticker);
  if (!desk || !launch) return { title: "Desk not found" };
  return {
    title: `${launch.name} ($${launch.ticker}) · ${desk.partner}`,
    description: launch.blurb,
  };
}

export default async function DeskPage({ params }: PageProps<"/desk/[handle]">) {
  const { handle } = await params;
  const desk = desks[handle.toLowerCase()];
  const launch = desk && sampleLaunches.find((l) => l.ticker === desk.ticker);
  if (!desk || !launch) notFound();
  return <TokenDesk launch={launch} partner={desk.partner} />;
}
