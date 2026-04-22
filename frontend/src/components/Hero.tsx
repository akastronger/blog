import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-24 md:pt-28">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_340px]">
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

        <div className="relative flex justify-center">
          <div className="absolute -inset-6 rounded-full bg-white/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-full border border-white/25 bg-white/10 p-1">
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

