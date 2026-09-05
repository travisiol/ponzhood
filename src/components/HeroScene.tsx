import Image from "next/image";
import { Tilt } from "@/components/Tilt";

/**
 * The hero object.
 *
 * The reference site floats a product mock under its headline with glass chips
 * over it; this is the same move with the brand's own render in the frame. The
 * chips say what the product does rather than carrying numbers — nothing is
 * deployed, and a chip reading "0.42 ETH swept" would be an invented figure
 * dressed up as a live one.
 *
 * The render is green and the page is a warm off-black, so it is not dropped in
 * as a rectangle: gradients pull the ground back over its edges, top and
 * bottom, until the image reads as a window rather than a pasted image.
 */
export function HeroScene() {
  return (
    <Tilt max={5} className="mx-auto max-w-[1080px]">
      {/*
        The render is 3:1. At 335px that is a 113px band, and the two chips
        alone are 100px of it — they would cover the thing they annotate. The
        frame is therefore cropped to 16:11 on small screens and only opens up
        to the artwork's own ratio at the sm breakpoint. The mark sits dead
        centre in the source, so a centred cover crop keeps it in view at every
        width.
      */}
      <div className="float relative aspect-[16/11] overflow-hidden rounded-[26px] border border-white/10 sm:aspect-[3/1]">
        <Image
          src="/hero-scene.png"
          alt="The PONZHOOD mark — a chrome vault glyph in a feathered green cap — standing between glass vault doors"
          fill
          priority
          sizes="(max-width: 1120px) 100vw, 1080px"
          className="object-cover"
        />

        {/* Ground pulled back over the edges, so the frame has no hard seam. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,14,8,0.55),transparent_22%,transparent_58%,rgba(17,14,8,0.8))]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,14,8,0.7),transparent_16%,transparent_84%,rgba(17,14,8,0.7))]"
        />

        <div className="tilt-lift absolute left-4 top-4 sm:left-6 sm:top-6">
          <div className="float-chip flex items-center gap-2.5 px-3.5 py-2.5">
            <span className="blink h-1.5 w-1.5 rounded-full bg-volt" />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-paper">
              Fee redirect → vault
            </span>
          </div>
        </div>

        <div className="tilt-lift absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <div className="float-chip px-3.5 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-smoke">
              Trigger
            </p>
            <p className="mt-1 text-[13px] text-paper">Anyone can press run</p>
          </div>
        </div>

        <div className="tilt-lift absolute bottom-4 left-4 hidden sm:bottom-6 sm:left-6 md:block">
          <div className="float-chip px-3.5 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-smoke">
              Liquidity
            </p>
            <p className="mt-1 text-[13px] text-paper">Locked Uniswap v4</p>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
