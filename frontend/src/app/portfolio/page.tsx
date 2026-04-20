"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Photo = {
  src: string;
  alt: string;
};

export default function PortfolioPage() {
  const tabs = useMemo(
    () =>
      [
        {
          key: "life",
          label: "生活",
          photos: [
            { src: "/img/WechatIMG103.jpg", alt: "生活瞬间 1" },
            { src: "/img/WechatIMG104.jpg", alt: "生活瞬间 2" },
            { src: "/img/IMG_2150.JPG", alt: "生活瞬间 3" },
            { src: "/img/IMG_2220.JPG", alt: "生活瞬间 4" },
            { src: "/img/IMG_2408.JPG", alt: "生活瞬间 5" },
            { src: "/img/IMG_2615.JPG", alt: "生活瞬间 6" },
          ] satisfies Photo[],
        },
        {
          key: "work",
          label: "工作",
          photos: [
            { src: "/photo-1519389950473-47ba0277781c.avif", alt: "工作瞬间 1" },
            { src: "/carousel-1.avif", alt: "工作瞬间 2" },
            { src: "/carousel-2.avif", alt: "工作瞬间 3" },
            { src: "/carousel-3.avif", alt: "工作瞬间 4" },
          ] satisfies Photo[],
        },
      ] as const,
    [],
  );

  const [activeKey, setActiveKey] = useState<(typeof tabs)[number]["key"]>(
    tabs[0].key,
  );

  const activeTab = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              定格瞬间
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              在这里记录生活与工作的片段，点击 Tab 切换不同相册。
            </p>
          </div>

          <div
            role="tablist"
            aria-label="瞬间分类"
            className="inline-flex w-full items-center justify-between gap-1 rounded-2xl border border-white/10 bg-black/20 p-1 sm:w-auto"
          >
            {tabs.map((t) => {
              const selected = t.key === activeKey;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveKey(t.key)}
                  className={[
                    "flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition sm:flex-none",
                    selected
                      ? "bg-white text-black"
                      : "text-white/75 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          aria-label={`${activeTab.label}相册`}
          className="mt-6"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeTab.photos.map((p) => (
              <div
                key={p.src}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
              >
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="text-xs font-semibold text-white/85">
                    {p.alt}
                  </div>
                  <div className="text-[11px] font-medium text-white/50">
                    {activeTab.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

