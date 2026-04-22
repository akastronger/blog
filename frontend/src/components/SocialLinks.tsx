"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Video, X } from "lucide-react";

export default function SocialLinks({
  className = "",
  popoverAlign = "right",
}: {
  className?: string;
  popoverAlign?: "left" | "right";
}) {
  const [wechatOpen, setWechatOpen] = useState(false);
  const wechatButtonRef = useRef<HTMLButtonElement | null>(null);
  const wechatPopoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wechatOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (!t) return;
      if (wechatPopoverRef.current?.contains(t)) return;
      if (wechatButtonRef.current?.contains(t)) return;
      setWechatOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [wechatOpen]);

  const iconButtonClassName =
    "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white";

  const popoverSideClassName =
    popoverAlign === "left" ? "left-4" : "right-4";

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={iconButtonClassName}
          aria-label="WeChat"
          title="WeChat"
          onClick={() => setWechatOpen(true)}
          ref={wechatButtonRef}
        >
          <Image src="/wechat.svg" alt="" width={16} height={16} />
        </button>

        <Link
          href="https://github.com/akastronger"
          target="_blank"
          rel="noreferrer"
          className={iconButtonClassName}
          aria-label="GitHub"
          title="GitHub"
        >
          <Image src="/github.svg" alt="" width={16} height={16} />
        </Link>

        <Link
          href="https://www.youku.com/ku/profile/index?spm=a2hkn.playlist.sider-content.d_myzipindao"
          target="_blank"
          rel="noreferrer"
          className={iconButtonClassName}
          aria-label="Video"
          title="Video"
        >
          <Video className="h-4 w-4" />
        </Link>

        <Link
          href="https://weibo.com/u/2945487011"
          target="_blank"
          rel="noreferrer"
          className={iconButtonClassName}
          aria-label="Weibo"
          title="Weibo"
        >
          <Image src="/weibo.svg" alt="" width={20} height={20} />
        </Link>

        <Link
          href="https://www.douyin.com/user/self?from_tab_name=main"
          target="_blank"
          rel="noreferrer"
          className={iconButtonClassName}
          aria-label="Douyin"
          title="Douyin"
        >
          <Image src="/douyin.svg" alt="" width={20} height={20} />
        </Link>
      </div>

      {wechatOpen ? (
        <div
          ref={wechatPopoverRef}
          role="dialog"
          aria-label="WeChat QR Code"
          className={[
            "absolute top-0 z-50 w-[min(92vw,360px)] -translate-y-full pb-3",
            popoverSideClassName,
          ].join(" ")}
        >
          <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">微信二维码</div>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
                onClick={() => setWechatOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex justify-center">
              <div className="rounded-xl bg-white p-3">
                <Image
                  src="/wechat.jpg"
                  alt="WeChat QR Code"
                  width={240}
                  height={240}
                  priority
                />
              </div>
            </div>

            <div className="mt-3 text-center text-xs text-white/60">
              扫码添加微信
            </div>
          </div>

          <div className="mx-auto h-0 w-0 border-x-10 border-t-10 border-x-transparent border-t-[#0b1220]" />
        </div>
      ) : null}
    </div>
  );
}

