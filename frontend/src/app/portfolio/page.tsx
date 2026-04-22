"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Photo = {
  src: string;
  alt?: string;
};

export default function PortfolioPage() {
  const tabs = useMemo(
    () =>
      [
        {
          key: "life",
          label: "生活",
          photos: [
            { src: "/img/WechatIMG105.jpg" },
            { src: "/img/WechatIMG104.jpg"},
            { src: "/img/IMG_2150.JPG" },
            { src: "/img/IMG_2220.JPG", },
            { src: "/img/IMG_2408.JPG", },
            { src: "/img/IMG_2615.JPG", },
            { src: "/img/IMG_4225.JPG",  },
            { src: "/img/IMG_4323.JPG", },
            { src: "/img/IMG_4428.JPG", },
          ] satisfies Photo[],
        },
        {
          key: "work",
          label: "工作",
          photos: [
            { src: "/img/WechatIMG103.jpg" },
            { src: "/img/2025_12_31_15_19_IMG_3347.JPG", },
            { src: "/carousel-2.avif",},
            { src: "/carousel-3.avif", },
          ] satisfies Photo[],
        },
      ] as const,
    [],
  );

  const [activeKey, setActiveKey] = useState<(typeof tabs)[number]["key"]>(
    tabs[0].key,
  );

  const activeTab = tabs.find((t) => t.key === activeKey) ?? tabs[0];
  const [previewPhoto, setPreviewPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (!previewPhoto) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewPhoto(null);
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [previewPhoto]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              定格瞬间
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              在这里记录生活与工作的片段，美好生活值得回忆。
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
                  onClick={() => {
                    setPreviewPhoto(null);
                    setActiveKey(t.key);
                  }}
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
            {activeTab.photos.map((p, index) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setPreviewPhoto(p)}
                aria-label={`预览大图：生活瞬间${index + 1}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
              >
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={p.src}
                    alt={`生活瞬间${index + 1}`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="text-xs font-semibold text-white/85">
                   {`精彩瞬间${index + 1}`}
                  </div>
                  <div className="text-[11px] font-medium text-white/50">
                    {activeTab.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {previewPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`大图预览：${previewPhoto.alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={() => setPreviewPhoto(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">
                  {previewPhoto.alt}
                </div>
                <div className="truncate text-xs text-white/50">
                  点击遮罩或按 ESC 关闭
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                关闭
              </button>
            </div>

            <div className="relative h-[80vh] w-full">
              <Image
                src={previewPhoto.src}
                alt={''}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

