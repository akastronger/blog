"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { BLOG_DATA, type Article } from "./data";

type TabKey = "misc" | "tech" | "reading" | "personal" | "juejin";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "misc", label: "随笔" },
  { key: "tech", label: "技术" },
  { key: "reading", label: "书籍" },
  { key: "personal", label: "个人" },
  { key: "juejin", label: "掘金" },
];

export function BlogTabs() {
  const [active, setActive] = useState<TabKey>("misc");
  const baseId = useId();
  const activeArticles = BLOG_DATA[active] ?? [];

  const renderArticleCard = (article: Article) => {
    const isExternal = article.url.startsWith("http");
    const isReading = article.wordCount && article.rating !== undefined;
    const card = (
      <>
        <div className="text-sm font-semibold text-white/95 group-hover:text-white">
          {article.title}
        </div>
        {article.author && (
          <div className="mt-1 text-xs text-white/60">{article.author}</div>
        )}
        {isReading && (
          <div className="mt-2 flex items-center gap-3 text-xs text-white/50">
            <span>{article.wordCount}</span>
            <span className="text-amber-400">★ {article.rating}</span>
          </div>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </>
    );

    if (isExternal) {
      return (
        <a
          key={article.title}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "group rounded-2xl border border-white/10 p-5",
            "bg-linear-to-br from-sky-500/15 via-blue-500/10 to-indigo-500/15",
            "bg-[#0b1220]/80 backdrop-blur-md",
            "transition hover:border-white/25 hover:bg-white/5",
          ].join(" ")}
        >
          {card}
        </a>
      );
    }

    return (
      <Link
        key={article.title}
        href={article.url}
        className={[
          "group rounded-2xl border border-white/10 p-5",
          "bg-linear-to-br from-sky-500/15 via-blue-500/10 to-indigo-500/15",
          "bg-[#0b1220]/80 backdrop-blur-md",
          "transition hover:border-white/25 hover:bg-white/5",
        ].join(" ")}
      >
        {card}
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      <div
        role="tablist"
        aria-orientation="vertical"
        className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md md:w-56"
      >
        {TABS.map((tab) => {
          const selected = tab.key === active;
          const tabId = `${baseId}-tab-${tab.key}`;
          const panelId = `${baseId}-panel-${tab.key}`;

          return (
            <button
              key={tab.key}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.key)}
              className={[
                "w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition",
                selected
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="min-w-0 flex-1"
      >
        {activeArticles.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-sm text-white/70">
            这个分类暂时还没有文章。
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeArticles.map(renderArticleCard)}
          </div>
        )}
      </div>
    </div>
  );
}