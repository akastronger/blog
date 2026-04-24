"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";
import { X } from "lucide-react";

type InterestKey = "dance" | "basketball" | "calligraphy" | "music" | "motorcycle";

const INTERESTS: Array<{
  key: InterestKey;
  label: string;
  logoSrc: string;
  logoAlt: string;
  color: string;
}> = [
  {
    key: "dance",
    label: "街舞",
    logoSrc: "/interests/dance.svg",
    logoAlt: "dance",
    color: "from-fuchsia-400/25 to-violet-500/20",
  },
  {
    key: "basketball",
    label: "篮球",
    logoSrc: "/interests/basketball.svg",
    logoAlt: "Basketball",
    color: "from-amber-400/25 to-orange-500/20",
  },
  {
    key: "motorcycle",
    label: "机车",
    logoSrc: "/interests/motorcycle.svg",
    logoAlt: "Motorcycle",
    color: "from-slate-400/25 to-zinc-400/20",
  },
  {
    key: "calligraphy",
    label: "书法",
    logoSrc: "/interests/calligraphy.svg",
    logoAlt: "Calligraphy",
    color: "from-emerald-400/20 to-teal-500/20",
  },
  {
    key: "music",
    label: "音乐",
    logoSrc: "/interests/music.svg",
    logoAlt: "Music",
    color: "from-sky-400/25 to-cyan-500/20",
  },
  
];

type WorkItem = { title: string; description: string; meta?: string };

export default function Interests() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<InterestKey>("dance");
  const baseId = useId();

  const worksByInterest: Record<InterestKey, WorkItem[]> = useMemo(
    () => ({
      dance: [
        {
          title: "Freestyle 片段合集",
          description: "街舞练习日常与即兴片段的整理，持续更新节奏与身体控制。",
          meta: "视频 · 练习",
        },
        {
          title: "编舞 Demo",
          description: "一段 30–60 秒的编舞 Demo，用于记录当下的风格与音乐理解。",
          meta: "视频 · 编舞",
        },
      ],
      basketball: [
        {
          title: "投篮训练记录",
          description: "从姿势到节奏的复盘：定点、移动、急停、三分手感记录。",
          meta: "记录 · 训练",
        },
        {
          title: "野球局精彩回合",
          description: "防守、挡拆、快攻等回合剪辑，突出决策与对抗。",
          meta: "视频 · 对抗",
        },
      ],
      calligraphy: [
        {
          title: "临摹习作",
          description: "以碑帖临摹为主，关注笔法与结构，阶段性对比进步。",
          meta: "图片 · 习作",
        },
        {
          title: "小字练习",
          description: "在有限空间里保持字形稳定，练耐心与专注。",
          meta: "图片 · 练习",
        },
      ],
      music: [
        {
          title: "歌单与听感笔记",
          description: "按情绪/场景整理歌单，并记录旋律、编曲与律动的感受。",
          meta: "笔记 · 听歌",
        },
        {
          title: "节拍练习",
          description: "用节拍器做基础练习，强化对拍点与切分的敏感度。",
          meta: "练习 · 节奏",
        },
      ],
      motorcycle: [
        {
          title: "骑行路线收藏",
          description: "适合周末短途的路线记录：风景、路况与补给点。",
          meta: "路线 · 出行",
        },
        {
          title: "装备与保养清单",
          description: "头盔、护具、雨具与日常保养要点的清单化整理。",
          meta: "清单 · 安全",
        },
      ],
    }),
    []
  );

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
          aria-label={`${title}作品`}
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
            className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0b1220] p-5 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="mt-1 text-xs text-white/60">作品 / 记录</div>
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
      
          </div>
        </div>
      ) : null}

    </section>
  );
}

