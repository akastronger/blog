"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { PostSummary } from "@/lib/api";

type TabKey = "misc" | "tech" | "reading" | "personal";

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "misc", label: "随笔" },
  { key: "tech", label: "技术" },
  { key: "reading", label: "书籍" },
  { key: "personal", label: "个人" },
];

export function BlogTabs({ posts }: { posts: PostSummary[] }) {
  const [active, setActive] = useState<TabKey>("misc");
  const baseId = useId();

  const postsByTab = useMemo(() => {
    return {
      misc: posts,
      tech: [],
      reading: [],
      personal: [],
    } satisfies Record<TabKey, PostSummary[]>;
  }, [posts]);

  const activePosts = postsByTab[active];

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
        {activePosts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-sm text-white/70">
            这个分类暂时还没有文章。
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {activePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-medium text-white/90">
                    {post.title}
                  </div>
                  <div className="text-xs font-medium text-white/60">
                    {post.date}
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/70">
                  {post.excerpt}
                </p>
                <div className="mt-5 text-xs font-semibold text-white/80">
                  Read more →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

