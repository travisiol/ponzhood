"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { dividendAssets, labelFor, quoteAssets } from "@/lib/assets";
import { anyContractDeployed } from "@/lib/contracts";
import { chain, siteConfig } from "@/lib/site-config";
import { templateById, vaultTemplates, type VaultId } from "@/lib/vaults";

const NAME_MAX = 32;
const TICKER_MAX = 10;
const DESC_MAX = 280;

type Gate = { ok: boolean; label: string; detail: string };

export function LaunchForm() {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [quote, setQuote] = useState("ETH");
  const [tax, setTax] = useState("0");
  const [vault, setVault] = useState<VaultId>("staking");
  const [payoutAsset, setPayoutAsset] = useState<string>(dividendAssets[0]);
  const [minFees, setMinFees] = useState("0.1");
  const [feeShareHandle, setFeeShareHandle] = useState("");
  const [initialBuy, setInitialBuy] = useState("");

  const template = templateById[vault];
  const taxNumber = Number.parseFloat(tax || "0");

  /**
   * Interlocks, not a submit handler. Each one says what has to be true and
   * what is actually the case, and the button below renders their conjunction
   * — so the control and the reasons underneath it cannot disagree.
   */
  const gates = useMemo<Gate[]>(() => {
    const cleanName = name.trim();
    const cleanTicker = ticker.trim();
    return [
      {
        ok: cleanName.length > 0 && cleanName.length <= NAME_MAX,
        label: "Name",
        detail:
          cleanName.length === 0
            ? "Not set"
            : cleanName.length > NAME_MAX
              ? `${cleanName.length} characters — ${NAME_MAX} max`
              : cleanName,
      },
      {
        ok:
          cleanTicker.length > 0 &&
          cleanTicker.length <= TICKER_MAX &&
          /^[A-Za-z0-9]+$/.test(cleanTicker),
        label: "Ticker",
        detail:
          cleanTicker.length === 0
            ? "Not set"
            : !/^[A-Za-z0-9]+$/.test(cleanTicker)
              ? "Letters and numbers only"
              : `$${cleanTicker.toUpperCase()}`,
      },
      {
        ok: Number.isFinite(taxNumber) && taxNumber >= 0 && taxNumber <= 10,
        label: "Trading tax",
        detail: Number.isFinite(taxNumber)
          ? `${taxNumber.toFixed(2)}% on every buy and sell`
          : "Not a number",
      },
      {
        ok: vault !== "feeshare" || feeShareHandle.trim().length > 0,
        label: "Fee recipient",
        detail:
          vault !== "feeshare"
            ? `Vault — ${template.name}`
            : feeShareHandle.trim().length > 0
              ? `@${feeShareHandle.trim().replace(/^@/, "")}`
              : "Fee Share needs an X handle",
      },
      {
        ok: Number.parseFloat(minFees) >= 0.1,
        label: "Payout floor",
        detail:
          Number.parseFloat(minFees) >= 0.1
            ? `${minFees} ${quote} before a run`
            : "0.1 is the floor",
      },
      {
        ok: anyContractDeployed,
        label: "Launcher contract",
        detail: anyContractDeployed
          ? "Deployed"
          : `Awaiting launch on ${chain.name}`,
      },
    ];
  }, [
    name,
    ticker,
    taxNumber,
    vault,
    template.name,
    feeShareHandle,
    minFees,
    quote,
  ]);

  const open = gates.filter((g) => !g.ok).length;
  const ready = open === 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
      {/* ── The form ───────────────────────────────────────────────────── */}
      <div className="panel float p-6 sm:p-8">
        <Group title="Token">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Name"
              hint={`Letters, numbers and spaces. ${NAME_MAX} characters max.`}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, NAME_MAX))}
                placeholder="Ponzhood Frog"
                className={inputClass}
              />
            </Field>
            <Field
              label="Ticker"
              hint={`Letters and numbers. ${TICKER_MAX} characters max.`}
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[15px] text-smoke">
                  $
                </span>
                <input
                  value={ticker}
                  onChange={(e) =>
                    setTicker(
                      e.target.value.toUpperCase().slice(0, TICKER_MAX),
                    )
                  }
                  placeholder="PROG"
                  className={clsx(inputClass, "pl-8 font-mono")}
                />
              </div>
            </Field>
          </div>

          <Field
            label="Description"
            hint={`${description.length}/${DESC_MAX}`}
          >
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, DESC_MAX))}
              rows={3}
              placeholder="What is this token for?"
              className={clsx(inputClass, "resize-none py-3 leading-relaxed")}
            />
          </Field>

          <Field
            label="Token image"
            hint="Paste an ipfs:// URI. Uploaded artwork is moderated before it is pinned."
          >
            <input placeholder="ipfs://…" className={clsx(inputClass, "font-mono text-[13px]")} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="X profile">
              <Prefixed prefix="x.com/" placeholder="handle" />
            </Field>
            <Field label="Telegram">
              <Prefixed prefix="t.me/" placeholder="group" />
            </Field>
            <Field label="Website">
              <input placeholder="https://" className={inputClass} />
            </Field>
          </div>
        </Group>

        <Group title="Market">
          <Field
            label="Pairing asset"
            hint="Buyers spend this on the curve, and creator fees arrive in it. Pair with the same stock as an RWA dividend and the vault pays that stock out with no swap in between."
          >
            <select
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className={clsx(inputClass, "appearance-none pr-10")}
            >
              {quoteAssets.map((asset) => (
                <option key={asset.ticker} value={asset.ticker}>
                  {labelFor(asset)}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Trading tax (optional)"
            hint="Leave it at 0 and trades pay only the protocol's 1.00% fee, most of which still reaches you. Raise it and every buy and sell pays that much again, straight to you. Up to 10%, fixed at launch."
          >
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={10}
                step={0.25}
                value={Number.isFinite(taxNumber) ? taxNumber : 0}
                onChange={(e) => setTax(e.target.value)}
                className="h-1 flex-1 cursor-pointer appearance-none rounded-pill bg-white/12 accent-volt"
              />
              <div className="relative w-24">
                <input
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                  inputMode="decimal"
                  className={clsx(inputClass, "pr-8 text-right font-mono")}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[14px] text-smoke">
                  %
                </span>
              </div>
            </div>
          </Field>
        </Group>

        <Group title="Vault">
          <p className="-mt-1 mb-5 text-[13px] leading-relaxed text-ash">
            Decides what happens to this token&rsquo;s creator fees. Fixed at
            launch — after an NFT series instead, where the token is the fuel
            for the seats, that is the seats desk.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {vaultTemplates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setVault(t.id)}
                aria-pressed={vault === t.id}
                className={clsx(
                  "rounded-tile border p-4 text-left transition duration-200",
                  vault === t.id
                    ? "border-volt bg-volt/8 shadow-[0_10px_28px_-18px_rgba(204,255,0,0.55)]"
                    : "border-white/10 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/3",
                )}
              >
                <span className="text-[15px] font-medium">{t.name}</span>
                <span className="mt-1.5 block text-[13px] leading-snug text-ash">
                  {t.short}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-5 text-[13px] leading-relaxed text-ash">
            {template.long}
          </p>

          {vault === "rwa" && (
            <Field
              label="Payout asset"
              hint="Fixed forever at launch. The list is short because most tokenized stocks here have pools that hold almost nothing — converting a round into them would lose the round to price impact."
            >
              <div className="flex flex-wrap gap-2">
                {dividendAssets.map((asset) => (
                  <button
                    key={asset}
                    type="button"
                    onClick={() => setPayoutAsset(asset)}
                    aria-pressed={payoutAsset === asset}
                    className={clsx(
                      "rounded-pill px-4 py-2 font-mono text-[13px] transition-colors",
                      payoutAsset === asset
                        ? "bg-volt text-ink"
                        : "border border-white/12 text-ash hover:border-white/28",
                    )}
                  >
                    {asset}
                  </button>
                ))}
              </div>
            </Field>
          )}

          {vault === "feeshare" && (
            <Field
              label="X account to pay"
              hint="The account named does not need a wallet and has no say in the matter. They claim what has built up at /claim."
            >
              <Prefixed
                prefix="x.com/"
                placeholder="handle"
                value={feeShareHandle}
                onChange={setFeeShareHandle}
              />
            </Field>
          )}

          <Field
            label={`Minimum fees before a payout (${quote})`}
            hint="The vault waits until this much has built up, then pays out. 0.1 is the floor — raise it and it runs less often, in bigger amounts."
          >
            <input
              value={minFees}
              onChange={(e) => setMinFees(e.target.value)}
              inputMode="decimal"
              className={clsx(inputClass, "font-mono")}
            />
          </Field>
        </Group>

        <Group title="First buy" last>
          <Field
            label="Initial buy (optional)"
            hint="Bought on the curve inside the launch transaction, so nothing can trade in front of it. Leave it empty to skip."
          >
            <div className="relative">
              <input
                value={initialBuy}
                onChange={(e) => setInitialBuy(e.target.value)}
                inputMode="decimal"
                placeholder="0.00"
                className={clsx(inputClass, "pr-16 font-mono")}
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[13px] text-smoke">
                {quote}
              </span>
            </div>
          </Field>
        </Group>
      </div>

      {/* ── The rail ───────────────────────────────────────────────────── */}
      <aside className="panel float sticky top-[88px] p-6">
        <p className="eyebrow text-smoke">Your token</p>
        <p className="headline mt-3 text-[34px] break-words">
          {ticker ? `$${ticker}` : "ticker"}
        </p>
        <p className="mt-1 text-[14px] text-ash">
          {name.trim() || "Unnamed launch"}
        </p>

        <dl className="mt-6">
          <RailRow label="Launch fee" value="Free — gas only" />
          <RailRow label="Paired in" value={quote} />
          <RailRow label="Protocol fee" value="1.00% of every trade" />
          <RailRow
            label="Your tax"
            value={
              Number.isFinite(taxNumber) ? `${taxNumber.toFixed(2)}%` : "—"
            }
          />
          <RailRow label="Vault" value={template.name} />
          <RailRow
            label="Creator fees"
            value={
              vault === "rwa"
                ? `Buy ${payoutAsset}, holders claim`
                : vault === "feeshare"
                  ? feeShareHandle
                    ? `@${feeShareHandle.replace(/^@/, "")}`
                    : "An X account"
                  : `Paid in ${quote}`
            }
          />
          <RailRow label="Liquidity" value="Locked Uniswap v4" />
        </dl>

        <div className="hair mt-6 pt-5">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-smoke">Interlocks</p>
            <span className="font-mono text-[12px] text-ash">
              {gates.length - open}/{gates.length}
            </span>
          </div>
          <ul className="mt-4 space-y-2.5">
            {gates.map((gate) => (
              <li key={gate.label} className="flex items-start gap-2.5">
                <span
                  className={clsx(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    gate.ok ? "bg-volt" : "bg-white/25",
                  )}
                />
                <span className="min-w-0 text-[13px]">
                  <span className="text-paper">{gate.label}</span>
                  <span className="ml-2 text-smoke">{gate.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          disabled={!ready}
          className={clsx(
            "mt-6 w-full py-3.5 text-[15px]",
            ready ? "pill-volt" : "pill-line cursor-not-allowed opacity-55",
          )}
        >
          {ready ? "Connect wallet" : `${open} interlock${open === 1 ? "" : "s"} open`}
        </button>

        <p className="mt-3 text-center text-[12px] leading-relaxed text-smoke">
          {anyContractDeployed
            ? `Token, vault and optional first buy in one transaction. You stay the on-chain deployer.`
            : `${siteConfig.name} has no launcher deployed yet, so nothing here can be signed. Everything above is the real form.`}
        </p>
      </aside>
    </div>
  );
}

const inputClass =
  "w-full rounded-tile border border-white/12 bg-white/4 px-4 py-3 text-[15px] text-paper placeholder:text-smoke transition-colors focus:border-volt focus:bg-white/6 focus:outline-none";

function Group({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={clsx(!last && "mb-10")}>
      <h2 className="eyebrow mb-5 text-smoke">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-paper">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-2 block text-[12px] leading-relaxed text-smoke">
          {hint}
        </span>
      )}
    </label>
  );
}

function Prefixed({
  prefix,
  placeholder,
  value,
  onChange,
}: {
  prefix: string;
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="flex items-center rounded-tile border border-white/12 bg-white/4 pl-4 transition-colors focus-within:border-volt">
      <span className="font-mono text-[13px] text-smoke">{prefix}</span>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-1.5 py-3 text-[15px] text-paper placeholder:text-smoke focus:outline-none"
      />
    </div>
  );
}

function RailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="hair flex items-baseline justify-between gap-4 py-2.5 first:border-t-0 first:pt-0">
      <dt className="text-[13px] text-ash">{label}</dt>
      <dd className="tnum text-right text-[13px] font-medium">{value}</dd>
    </div>
  );
}
