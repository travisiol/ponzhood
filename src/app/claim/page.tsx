import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { Chip, Section } from "@/components/ui";
import { anyContractDeployed } from "@/lib/contracts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Claim creator fees",
  description:
    "A Fee Share launch sends its creator fees to an X account. If that account is yours, check what has built up.",
};

const steps = [
  {
    n: "1",
    title: "A creator names your account",
    body: "On a Fee Share launch there is no vault. The launch points its creator fees at a wallet derived from an X handle, and the escrow credits that address from the first trade. Nobody asks you first.",
  },
  {
    n: "2",
    title: "You sign in with X",
    body: "That is the whole proof. Your handle is read from the sign-in rather than typed in, so nobody can start a claim for an account they do not hold — and there is nothing to post.",
  },
  {
    n: "3",
    title: "We claim and forward",
    body: "The escrow pays whoever calls it, so the derived wallet has to make the claim itself. It does, then forwards everything to your address in the same run.",
  },
];

export default function ClaimPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="atmosphere" />
        <div className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-14 sm:px-8">
          <p className="eyebrow text-smoke">Creator fees</p>
          <h1 className="headline mt-4 max-w-[16ch] text-[clamp(42px,7vw,88px)]">
            Someone may owe you fees.
          </h1>
          <p className="mt-6 max-w-[66ch] text-[16px] leading-relaxed text-ash">
            A Fee Share launch sends its creator fees to an X account rather
            than to a vault — no wallet needed, and no say in the matter. If
            that account is yours, check what has built up and send it somewhere
            you control.
          </p>

          <div className="panel mt-10 max-w-[560px] p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow text-smoke">Creator fees</p>
              <Chip variant={anyContractDeployed ? "live" : "soon"}>
                {anyContractDeployed ? "Live" : "Awaiting launch"}
              </Chip>
            </div>

            <p className="headline tnum mt-5 text-[46px] text-smoke">—</p>
            <p className="mt-1 text-[13px] text-smoke">
              nothing to read until an escrow exists
            </p>

            <button
              type="button"
              disabled={!anyContractDeployed}
              className={clsx(
                "mt-7 w-full py-3.5 text-[15px]",
                anyContractDeployed
                  ? "pill-volt"
                  : "pill-line cursor-not-allowed opacity-55",
              )}
            >
              Sign in with X
            </button>

            <p className="mt-4 text-[12px] leading-relaxed text-smoke">
              We read your handle from the sign-in itself — there is nothing to
              post and nothing to copy. Fees reach the escrow only after the
              token trades, so a launch from an hour ago can still read empty.
              Nothing expires: whatever is credited stays there until claimed.
            </p>
          </div>
        </div>
      </section>

      <Section tone="bone" className="py-20 sm:py-24">
        <p className="eyebrow text-smoke">How this works</p>
        <h2 className="headline mt-3 text-[clamp(32px,4.6vw,54px)]">
          Three moves, and none of them are yours to trust.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-black/8 bg-black/8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="bg-bone p-7">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-mono text-[12px] text-volt">
                {step.n}
              </span>
              <h3 className="mt-5 text-[19px] font-medium">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-smoke">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/launch" className="pill-dark px-6 py-3 text-[14px]">
            Launch with Fee Share
          </Link>
          <Link
            href="/docs#templates"
            className="rounded-pill border border-black/15 px-6 py-3 text-[14px] text-ink transition-colors hover:bg-black/5"
          >
            Read the docs
          </Link>
        </div>

        <p className="mt-10 max-w-[70ch] text-[12px] leading-relaxed text-smoke">
          {siteConfig.name} does not verify who a Fee Share launch names. Being
          named by a launch is not an endorsement of it, and claiming fees is
          not an association with it.
        </p>
      </Section>
    </>
  );
}
