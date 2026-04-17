"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { GitFork, MessageCircle, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => NAV_ITEMS, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-wide text-white"
          >
            <span className="text-xl">背包客</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {items.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "text-sm font-medium text-white/80 transition-colors hover:text-white",
                    active ? "text-white" : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/ai"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <Sparkles className="h-4 w-4" />
              AI Chat
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/ai"
              className="rounded-full bg-white/15 p-2 text-white hover:bg-white/20"
              aria-label="AI Chat"
            >
              <Sparkles className="h-4 w-4" />
            </Link>
            <button
              type="button"
              className="rounded-xl bg-white/15 p-2 text-white hover:bg-white/20"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className="block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="mx-auto w-full max-w-6xl px-4 pb-4 md:hidden">
          <div className="mt-2 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "text-sm font-semibold text-white/90",
                    item.href === "/"
                      ? pathname === "/"
                        ? "text-white"
                        : ""
                      : pathname.startsWith(item.href)
                        ? "text-white"
                        : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-2 flex items-center justify-between">
                <Link
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
                >
                  <GitFork className="h-4 w-4" />
                  Github
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  Get in Touch  
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

