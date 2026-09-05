import Image from "next/image";
import clsx from "clsx";

/**
 * The mark: the brand's 3D render, cropped square and set in a rounded tile.
 *
 * The render is opaque and has its own dark-green ground, so it is not floated
 * on the page as a cut-out — it is framed like an app icon, which is what the
 * artwork already is. The hairline ring keeps its edge from dissolving into the
 * page's own off-black.
 *
 * Swapping the artwork is one file: `public/logo-tight.png`. The favicon and
 * the OG mark are cropped from the same master in `public/logo-mark.png`.
 */
export function Logo({
  size = 30,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "relative block shrink-0 overflow-hidden rounded-[9px] ring-1 ring-white/12",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo-tight.png"
        alt=""
        width={size * 3}
        height={size * 3}
        priority
        className="h-full w-full object-cover"
      />
    </span>
  );
}
