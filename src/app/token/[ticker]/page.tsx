import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TokenDesk } from "@/components/TokenDesk";
import { sampleLaunches } from "@/data/launches";

function find(ticker: string) {
  return sampleLaunches.find(
    (l) => l.ticker.toLowerCase() === ticker.toLowerCase(),
  );
}

export function generateStaticParams() {
  return sampleLaunches.map((l) => ({ ticker: l.ticker.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: PageProps<"/token/[ticker]">): Promise<Metadata> {
  const { ticker } = await params;
  const launch = find(ticker);
  if (!launch) return { title: "Token not found" };
  return {
    title: `${launch.name} ($${launch.ticker})`,
    description: launch.blurb,
  };
}

export default async function TokenPage({
  params,
}: PageProps<"/token/[ticker]">) {
  const { ticker } = await params;
  const launch = find(ticker);
  if (!launch) notFound();
  return <TokenDesk launch={launch} />;
}
