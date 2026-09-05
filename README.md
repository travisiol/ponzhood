# PONZHOOD

An independent vault layer on the open pons v2 factory on Robinhood Chain.
Attach a vault to your creator fees at launch, and the contract spends them on
buybacks, staking, a stock dividend, a raffle or an X account — every time,
without an operator.

```bash
npm install
npm run dev
```

The site runs on `http://localhost:3005`.

## Routes

| Route              | What it is                                                       |
| ------------------ | ---------------------------------------------------------------- |
| `/`                | Landing — hero, pairing marquee, biggest vaults, templates        |
| `/explore`         | Every launch, filterable by sort, status and vault type           |
| `/stats`           | Protocol totals and the split of vaults by template               |
| `/seats`           | Vault Seats — NFT series with a fuel token and a shared fee pot   |
| `/launch`          | The launch form, with its interlocks and live summary rail        |
| `/claim`           | Fee Share claim for an X account named by a launch                |
| `/docs`            | Contracts, how a vault earns, who can trigger it, limits          |
| `/token/[ticker]`  | One token: its fee split and what its vault has done              |
| `/desk/[handle]`   | The same page under a partner's byline                            |

## Art direction

Robinhood's, read off `robinhood.com` rather than remembered:

- **Ground** `#110E08` — a warm off-black with a trace of olive, not pure black.
  Everything else is mixed toward that warmth.
- **Accent** `#CCFF00` — spent on exactly one control per screen.
- **Display** a light serif at enormous sizes. Robinhood sets Martina Plantijn;
  Instrument Serif is the closest free face and appears in their own
  `@font-face` list.
- **UI** Geist, also in their stack. Geist Mono for anything numeric.
- **Market colour is not brand colour.** `#00C805` up and `#FF5000` down belong
  to price movement and never to chrome.

Sections alternate between the off-black and a warm bone `#F4F1EA`, which is
what stops a long dark page reading as one slab.

The hero ground is drawn, not photographed: `.atmosphere` in
`src/app/globals.css` stacks radial gradients into a dark sphere lit along one
rim, so the site ships no image at all.

## What is real and what is not

The contracts are not deployed. Rather than invent addresses or figures:

- Every address lives in `src/lib/contracts.ts` and is read from the
  environment. Unset renders as **Awaiting launch** — no placeholder address can
  ship pretending to be real.
- `/explore`, `/stats` and the token pages render a sample set from
  `src/data/launches.ts`, and each says so in a line above the figures.
- The launch form is the real form. Its **interlocks** name what has to be true
  and what actually is, and the button renders their conjunction — so the
  control and the reasons under it cannot disagree. The last interlock is a
  launcher contract that does not exist yet, which is why nothing can be signed.

## Renaming

The name lives in `src/lib/site-config.ts` — `name`, `wordmark`, `ticker` —
plus the `NEXT_PUBLIC_PONZHOOD_*` env prefix and the contract names in
`src/lib/contracts.ts`. Nothing else spells it out. Do not grep-and-replace
through the components.

## Not affiliated

PONZHOOD is not affiliated with, endorsed by, or operated by pons or by
Robinhood. The chain's name is used only to say where the contracts live, and
the visual language is a homage, not a claim of association. The footer says so
on every page, and it should stay there.
