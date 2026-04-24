import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full border-t border-white/10 bg-white/5 text-white/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-base font-semibold tracking-wide text-white">
              Stronger
            </div>
            <div className="mt-1 text-sm text-white/60">
               前端开发&amp; 街舞爱好者
            </div>
          </div>

          <SocialLinks className="md:pt-1" popoverAlign="right" />
        </div>

        <div className="mt-5 h-px w-full bg-white/10" />

        <div className="mt-4 flex flex-col gap-3 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <div>© {year} By Bboy AkaStronger</div>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="#" className="hover:text-white/70">
              隐私政策
            </Link>
            <Link href="#" className="hover:text-white/70">
              服务条款
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

