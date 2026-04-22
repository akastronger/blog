"use client";

import { useEffect, useMemo, useRef } from "react";

type PartRefs = {
  head: SVGGElement | null;
  eyes: SVGGElement | null;
  mouth: SVGGElement | null;
  body: SVGGElement | null;
  armL: SVGGElement | null;
  armR: SVGGElement | null;
  legL: SVGGElement | null;
  legR: SVGGElement | null;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Mascot() {
  const refs = useRef<PartRefs>({
    head: null,
    eyes: null,
    mouth: null,
    body: null,
    armL: null,
    armR: null,
    legL: null,
    legR: null,
  });

  const strengths = useMemo(
    () => ({
      head: { x: 8, y: 6, r: 3 },
      eyes: { x: 14, y: 10, r: 0 },
      mouth: { x: 6, y: 4, r: 0 },
      body: { x: 4, y: 3, r: 1.5 },
      arm: { x: 6, y: 4, r: 6 },
      leg: { x: 3, y: 2, r: 3 },
    }),
    []
  );

  useEffect(() => {
    const state = {
      targetX: 0,
      targetY: 0,
      curX: 0,
      curY: 0,
      raf: 0 as number | 0,
    };

    const onMove = (e: PointerEvent) => {
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      const nx = (e.clientX / vw) * 2 - 1;
      const ny = (e.clientY / vh) * 2 - 1;
      state.targetX = clamp(nx, -1, 1);
      state.targetY = clamp(ny, -1, 1);
    };

    const tick = () => {
      // smooth follow
      state.curX += (state.targetX - state.curX) * 0.12;
      state.curY += (state.targetY - state.curY) * 0.12;

      const x = state.curX;
      const y = state.curY;

      const apply = (
        el: SVGGElement | null,
        s: { x: number; y: number; r: number },
        flipX = false
      ) => {
        if (!el) return;
        const dx = (flipX ? -x : x) * s.x;
        const dy = y * s.y;
        const rot = (flipX ? -x : x) * s.r;
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
        el.style.transformOrigin = "50% 50%";
        el.style.transformBox = "fill-box";
      };

      apply(refs.current.head, strengths.head);
      apply(refs.current.eyes, strengths.eyes);
      apply(refs.current.mouth, strengths.mouth);
      apply(refs.current.body, strengths.body);
      apply(refs.current.armL, strengths.arm, true);
      apply(refs.current.armR, strengths.arm, false);
      apply(refs.current.legL, strengths.leg, true);
      apply(refs.current.legR, strengths.leg, false);

      state.raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    state.raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (state.raf) window.cancelAnimationFrame(state.raf);
    };
  }, [strengths]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-40 hidden md:block">
      <div className="relative">
        <svg
          width="220"
          height="340"
          viewBox="0 0 220 340"
          className="drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
          aria-hidden="true"
        >
          {/* Legs */}
          <g
            ref={(el) => {
              refs.current.legL = el;
            }}
          >
            <path
              d="M78 264c-7 22-16 36-24 48 10 10 28 10 36 0 2-22 3-34 8-48z"
              fill="#f2d6c9"
              opacity="0.95"
            />
            <path
              d="M58 312c12 10 28 10 40 0 8 6 6 14-6 18-20 6-38 2-48-6-6-6-2-10 14-12z"
              fill="#111827"
              opacity="0.95"
            />
          </g>
          <g
            ref={(el) => {
              refs.current.legR = el;
            }}
          >
            <path
              d="M124 264c6 22 16 36 24 48-10 10-28 10-36 0-2-22-4-34-8-48z"
              fill="#f2d6c9"
              opacity="0.95"
            />
            <path
              d="M122 312c-12 10-28 10-40 0-8 6-6 14 6 18 20 6 38 2 48-6 6-6 2-10-14-12z"
              fill="#111827"
              opacity="0.95"
            />
          </g>

          {/* Body */}
          <g
            ref={(el) => {
              refs.current.body = el;
            }}
          >
            <path
              d="M64 130c-12 18-16 40-16 66 0 48 18 78 62 78s62-30 62-78c0-26-4-48-16-66-20-10-38-16-46-16s-26 6-46 16z"
              fill="#f8fafc"
              opacity="0.96"
            />
            <path
              d="M72 144c14-10 26-14 38-14s24 4 38 14c-6 22-18 34-38 34s-32-12-38-34z"
              fill="#0f172a"
              opacity="0.9"
            />
            <path
              d="M84 206c0 24 10 40 26 40s26-16 26-40"
              stroke="#0f172a"
              strokeOpacity="0.18"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Arms */}
          <g
            ref={(el) => {
              refs.current.armL = el;
            }}
          >
            <path
              d="M54 170c-18 22-22 44-18 70 10 8 22 8 32 0-2-18 4-36 18-54z"
              fill="#f2d6c9"
              opacity="0.95"
            />
          </g>
          <g
            ref={(el) => {
              refs.current.armR = el;
            }}
          >
            <path
              d="M166 170c18 22 22 44 18 70-10 8-22 8-32 0 2-18-4-36-18-54z"
              fill="#f2d6c9"
              opacity="0.95"
            />
          </g>

          {/* Head */}
          <g
            ref={(el) => {
              refs.current.head = el;
            }}
          >
            <path
              d="M110 44c-34 0-56 22-56 54 0 34 24 58 56 58s56-24 56-58c0-32-22-54-56-54z"
              fill="#f2d6c9"
              opacity="0.98"
            />
            {/* Hair */}
            <path
              d="M60 92c8-32 28-52 50-52s42 20 50 52c-10-10-22-16-30-18-8-2-18-2-20-2s-12 0-20 2c-8 2-20 8-30 18z"
              fill="#111827"
              opacity="0.88"
            />
            {/* Hat */}
            <path
              d="M64 74c12-16 28-24 46-24s34 8 46 24c-14 2-30 4-46 4s-32-2-46-4z"
              fill="#f8fafc"
              opacity="0.92"
            />
          </g>

          {/* Eyes */}
          <g
            ref={(el) => {
              refs.current.eyes = el;
            }}
          >
            <ellipse cx="90" cy="112" rx="8" ry="10" fill="#0b1220" />
            <ellipse cx="130" cy="112" rx="8" ry="10" fill="#0b1220" />
            <circle cx="92.5" cy="110" r="2.2" fill="#ffffff" opacity="0.95" />
            <circle cx="132.5" cy="110" r="2.2" fill="#ffffff" opacity="0.95" />
          </g>

          {/* Mouth */}
          <g
            ref={(el) => {
              refs.current.mouth = el;
            }}
          >
            <path
              d="M100 132c3 4 7 6 10 6s7-2 10-6"
              stroke="#0b1220"
              strokeOpacity="0.55"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

