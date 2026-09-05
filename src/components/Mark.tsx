/**
 * The mark: an open ring with an arrow leaving it, up and to the right.
 *
 * The ring is the vault, the arrow is what comes back out of it — the whole
 * product in one glyph. Drawn in strokes at a 24 unit grid so it stays legible
 * at 18px in the nav and at 240px on the OG image, and inherits `currentColor`
 * so it works on both grounds without a second asset.
 */
export function Mark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20.2 12.6a8.4 8.4 0 1 1-4.9-7.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11.6 12.4 20.8 3.2m0 0h-6.1m6.1 0v6.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
