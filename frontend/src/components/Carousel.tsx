"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  src: string;
  alt: string;
};

export default function Carousel() {
  const slides = useMemo<Slide[]>(
    () => [
      { src: "/carousel-1.avif", alt: "Slide 1" },
      { src: "/carousel-2.avif", alt: "Slide 2" },
      { src: "/carousel-3.avif", alt: "Slide 3" },
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const AUTOPLAY_MS = 5000;

  const goTo = useCallback(
    (next: number) => {
      const n = slides.length;
      setIndex(((next % n) + n) % n);
    },
    [slides.length],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (isPaused) return;
    if (slides.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [isPaused, slides.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  return (
    <section className="mx-auto w-full pb-20">
      <div
        className="relative overflow-hidden  border-white/10 bg-white/5 backdrop-blur-md"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTouchStart={(e) => {
            setIsPaused(true);
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            const end = e.changedTouches[0]?.clientX ?? null;
            touchStartX.current = null;
            if (start == null || end == null) return;
            const dx = end - start;
            if (Math.abs(dx) < 40) return;
            if (dx > 0) prev();
            else next();
            setIsPaused(false);
          }}
        >
          {slides.map((s) => (
            <div key={s.alt} className="relative w-full shrink-0">
              <div className="relative h-[300px] w-full ">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 92vw, 1152px"
                  priority={s.alt === "Slide 1"}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => {
            setIsPaused(true);
            prev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-black/45"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => {
            setIsPaused(true);
            next();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-black/45"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.alt}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setIsPaused(true);
                goTo(i);
              }}
              className={[
                "h-2 w-2 rounded-full ring-1 ring-white/30 transition",
                i === index ? "bg-white" : "bg-white/30 hover:bg-white/50",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

