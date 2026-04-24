"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";

type InterestKey = "dance" | "basketball" | "calligraphy" | "music" | "motorcycle";

const INTERESTS: Array<{
  key: InterestKey;
  label: string;
  logoSrc: string;
  logoAlt: string;
  color: string;
  videoSrc?: string;
}> = [
  {
    key: "dance",
    label: "街舞",
    logoSrc: "/interests/dance.svg",
    logoAlt: "dance",
    color: "from-fuchsia-400/25 to-violet-500/20",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    key: "basketball",
    label: "篮球",
    logoSrc: "/interests/basketball.svg",
    logoAlt: "Basketball",
    color: "from-amber-400/25 to-orange-500/20",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    key: "motorcycle",
    label: "机车",
    logoSrc: "/interests/motorcycle.svg",
    logoAlt: "Motorcycle",
    color: "from-slate-400/25 to-zinc-400/20",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    key: "calligraphy",
    label: "书法",
    logoSrc: "/interests/calligraphy.svg",
    logoAlt: "Calligraphy",
    color: "from-emerald-400/20 to-teal-500/20",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    key: "music",
    label: "音乐",
    logoSrc: "/interests/music.svg",
    logoAlt: "Music",
    color: "from-sky-400/25 to-cyan-500/20",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  
];

export default function Interests() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<InterestKey>("dance");
  const baseId = useId();

  const title = INTERESTS.find((x) => x.key === active)?.label ?? "兴趣";
  const panelId = `${baseId}-panel`;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          兴趣爱好
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
        {INTERESTS.map((item) => {
          return (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setActive(item.key);
              setOpen(true);
            }}
            className={[
              "rounded-2xl border border-white/10 p-6 text-left",
              "bg-linear-to-br from-sky-500/15 via-blue-500/10 to-indigo-500/15",
              "backdrop-blur-md transition hover:from-sky-500/20 hover:via-blue-500/15 hover:to-indigo-500/20",
            ].join(" ")}
          >
            <div className="flex items-center justify-center">
              <div
                className={[
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  `bg-linear-to-br ${item.color}`,
                  "border border-white/10",
                ].join(" ")}
              >
                <Image
                  src={item.logoSrc}
                  alt={item.logoAlt}
                  width={28}
                  height={28}
                />
              </div>
            </div>

            <div className="mt-4 text-center text-sm font-semibold text-white/95">
              {item.label}
            </div>
            <div className="mt-2 text-center text-xs text-white/60">
              点击查看作品
            </div>
          </button>
        );
        })}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title}视频`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
          />

          <div
            id={panelId}
            className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0b1220] p-5 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">{title}视频</div>
                <div className="mt-1 text-xs text-white/60">各类视频内容</div>
              </div>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 视频 */}
            <div className="mt-6">
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
                <video
                  className="w-full h-full"
                  controls
                  poster="https://via.placeholder.com/800x450?text=Video+Placeholder"
                >
                  <source src={INTERESTS.find((x) => x.key === active)?.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="mt-4 text-center text-sm text-white/70">
                当前视频：{INTERESTS.find((x) => x.key === active)?.videoSrc || '未设置'}
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </section>
  );
}

