import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

/** 轨道烟雾：半径 px、绕圈周期 s、动画延迟 s、是否逆时针、烟团宽高、模糊 px */
const SMOKE_WISPS: Array<{
  r: number;
  dur: number;
  delay: number;
  ccw?: boolean;
  w: number;
  h: number;
  blur: number;
  pulseDur: number;
}> = [
  { r: 154, dur: 28, delay: 0, w: 108, h: 132, blur: 22, pulseDur: 5.8 },
  { r: 172, dur: 36, delay: -7, ccw: true, w: 92, h: 110, blur: 24, pulseDur: 6.5 },
  { r: 188, dur: 45, delay: -14, w: 124, h: 100, blur: 26, pulseDur: 7.4 },
  { r: 142, dur: 23, delay: -3, ccw: true, w: 84, h: 98, blur: 18, pulseDur: 5 },
  { r: 164, dur: 31, delay: -10, w: 100, h: 118, blur: 21, pulseDur: 6.2 },
  { r: 178, dur: 40, delay: -17, w: 76, h: 84, blur: 20, pulseDur: 6.8 },
];

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-24 md:pt-28">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,520px)]">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md">
            <span className="font-semibold">Stronger</span>
            <span className="h-1 w-1 rounded-full bg-white/60" />
            <span>会写代码的背包客</span>
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-6xl">
            背包客
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            热爱劲逐每分每秒钟，轻轻一笑挫折再用功
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#6b1eff]"
            >
             社交媒体
            </Link>
            <div className="text-sm font-medium text-white/70">
               <SocialLinks popoverAlign="left" />
            </div>
          </div>
        </div>

        <div className="relative flex justify-center overflow-visible">
          <div className="absolute -inset-14 rounded-full bg-white/10 blur-3xl" />

          {/* 烟雾飘绕：轨道旋转 + 烟团呼吸脉冲 */}
          <div
            className="pointer-events-none absolute inset-0 z-5 flex items-center justify-center"
            aria-hidden
          >
            <div className="relative aspect-square w-full max-w-[520px] min-h-[260px]">
              {/* 底层慢转雾环，增强“绕圈”感 */}
              <div
                className="hero-smoke-mist absolute inset-[-32%] rounded-full mix-blend-soft-light"
                style={{
                  background:
                    "conic-gradient(from 90deg at 50% 50%, transparent, rgba(230,240,255,0.14), transparent 40%, rgba(255,255,255,0.1), transparent 75%)",
                  filter: "blur(28px)",
                  opacity: 0.48,
                  animationDuration: "52s",
                }}
              />
              <div className="absolute left-1/2 top-1/2 h-0 w-0">
                {SMOKE_WISPS.map((w, i) => (
                  <div
                    key={i}
                    className="hero-smoke-orbit"
                    style={{
                      animationDuration: `${w.dur}s`,
                      animationDelay: `${w.delay}s`,
                      animationDirection: w.ccw ? "reverse" : "normal",
                    }}
                  >
                    <div
                      className="hero-smoke-blob"
                      style={
                        {
                          width: w.w,
                          height: w.h,
                          marginLeft: -w.w / 2,
                          marginTop: -w.h / 2,
                          "--r": `${w.r}px`,
                          "--smoke-blur": `${w.blur}px`,
                          background:
                            "radial-gradient(ellipse 55% 60% at 42% 48%, rgba(255,255,255,0.55), rgba(220,235,255,0.22) 45%, transparent 72%)",
                          animationDuration: `${w.pulseDur}s`,
                          animationDelay: `${w.delay * 0.3}s`,
                        } as CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 overflow-hidden rounded-full border border-white/25 bg-white/10 p-1 shadow-[0_0_40px_-8px_rgba(255,255,255,0.35)]">
            <div className="aspect-square w-full max-w-[260px]">
              <Image
                src="/avatar.jpg"
                alt="avatar"
                width={520}
                height={520}
                className="h-full w-full rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

