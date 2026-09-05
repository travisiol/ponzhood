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
rim.

## Motion

Taken from the reference site's own stylesheet rather than invented:

- **Controls are lit objects.** A white gloss falls from the top edge and is
  gone by 48%, a drop shadow puts the pill above the page, and a one-pixel
  inset highlight catches the edge. Hover raises it a pixel; `:active` puts it
  back down — that second half is what makes the lift read as physical.
- **Cards answer the pointer**: up four pixels, border brightened, shadow cast.
- **The link tell.** A launch card's foot label brightens and its arrow steps
  up and to the right in the accent, so the whole card reads as the target.
- **Live dots blink** rather than merely being green.
- **Fees move.** `FeeFlow` paints each pipe twice — a dim solid stroke saying
  the route exists, and a dashed accent stroke whose `stroke-dashoffset` is
  animated so the dashes travel along it. One keyframe covers every pipe,
  whatever its shape.
- **The hero object tilts** toward the pointer. `Tilt` writes two custom
  properties on pointermove instead of setting React state: a pointermove fires
  far more often than a frame, and only the compositor needs the value.

Everything above is off under `prefers-reduced-motion`.

## Brand assets

`public/logo-mark.png` is the master render. It is opaque — no alpha — so the
mark is framed like the app icon it already is rather than floated as a
cut-out. The favicon, apple icon and OG mark are crops of that same master:

```bash
node -e "require('sharp')('public/logo-mark.png').extract({left:150,top:55,width:1040,height:1040}).resize(256,256).png({palette:true}).toFile('src/app/icon.png')"
```

`public/hero-scene.png` is the wide render used as the hero object. Swapping
the brand means replacing those two files and re-running the crops.

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
