import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="atmosphere" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-[1240px] flex-col justify-center px-5 py-24 sm:px-8">
        <p className="eyebrow text-smoke">404</p>
        <h1 className="headline mt-4 max-w-[14ch] text-[clamp(44px,7.5vw,92px)]">
          Nothing is launched here.
        </h1>
        <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-ash">
          That token, desk or page does not exist. It may never have, or it may
          simply not have been deployed yet.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="pill-volt px-7 py-3.5 text-[15px]">
            Back to the front
          </Link>
          <Link href="/explore" className="pill-line px-7 py-3.5 text-[15px]">
            Explore launches
          </Link>
        </div>
      </div>
    </section>
  );
}
