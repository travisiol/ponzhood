"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Mark } from "@/components/Mark";
import { nav, siteConfig } from "@/lib/site-config";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled || open
          ? "bg-ink/85 backdrop-blur-xl border-b border-white/8"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-paper"
          aria-label={`${siteConfig.wordmark} home`}
        >
          <Mark size={21} className="text-volt" />
          <span className="font-serif text-[23px] leading-none tracking-[-0.01em]">
            {siteConfig.wordmark}
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-pill px-3.5 py-2 text-[14px] transition-colors",
                  active
                    ? "bg-white/10 text-paper"
                    : "text-ash hover:bg-white/6 hover:text-paper",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/launch"
            className="pill-volt hidden px-5 py-2.5 text-[14px] sm:block"
          >
            Start a launch
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="pill-line grid h-10 w-10 place-items-center lg:hidden"
          >
            <span className="relative block h-[9px] w-[15px]">
              <span
                className={clsx(
                  "absolute inset-x-0 top-0 h-px bg-paper transition-transform",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={clsx(
                  "absolute inset-x-0 bottom-0 h-px bg-paper transition-transform",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-ink/95 px-5 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/6 py-3.5 font-serif text-[26px] text-paper"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/launch"
            onClick={() => setOpen(false)}
            className="pill-volt mt-5 block px-5 py-3 text-center text-[15px]"
          >
            Start a launch
          </Link>
        </div>
      )}
    </header>
  );
}
