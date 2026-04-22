import Image from "next/image";
import Link from "next/link";

const SKILLS = [
  {
    title: "Vue",
    description:
      "The Progressive JavaScript Framework — 用于构建用户界面的渐进式框架。",
    logoSrc: "/skills/vue.svg",
    logoAlt: "Vue",
    color: "from-sky-400/25 to-indigo-400/20",
    href: "https://vuejs.org/guide/introduction.html",
  },
  {
    title: "React",
    description:
      "A JavaScript library for building user interfaces — 用组件构建 UI。",
    logoSrc: "/skills/react.svg",
    logoAlt: "React",
    color: "from-fuchsia-400/25 to-pink-400/20",
    href: "https://react.dev/learn",
  },
  {
    title: "TypeScript",
    description:
      "TypeScript is JavaScript with syntax for types — 为 JavaScript 增加类型系统。",
    logoSrc: "/skills/typescript.svg",
    logoAlt: "TypeScript",
    color: "from-emerald-400/20 to-lime-400/15",
    href: "https://www.typescriptlang.org/docs/",
  },
  {
    title: "Next.js",
    description:
      "The React Framework for the Web — 支持 SSR/RSC、路由与全栈能力。",
    logoSrc: "/skills/nextjs.svg",
    logoAlt: "Next.js",
    color: "from-amber-400/20 to-rose-400/15",
    href: "https://nextjs.org/docs",
  },
  {
    title: "Node.js",
    description:
      "A JavaScript runtime built on Chrome's V8 engine — 在服务端运行 JS。",
    logoSrc: "/skills/nodejs.svg",
    logoAlt: "Node.js",
    color: "from-amber-400/20 to-rose-400/15",
    href: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
  }
];

export default function Skills() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
         技术栈
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {SKILLS.map((skill) => {
          return (
            <Link
              key={skill.title}
              href={skill.href}
              target="_blank"
              rel="noreferrer"
              className={[
                "rounded-2xl border border-white/10 p-6",
                "bg-linear-to-br from-amber-400/20 via-yellow-300/10 to-orange-400/15",
                "backdrop-blur-md transition hover:from-amber-400/25 hover:via-yellow-300/15 hover:to-orange-400/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/50",
              ].join(" ")}
            >
              <div className="flex items-center justify-center">
                <div
                  className={[
                    "flex h-12 w-12 items-center justify-center rounded-2xl",
                    `bg-linear-to-br ${skill.color}`,
                    "border border-white/10",
                  ].join(" ")}
                >
                  <Image
                    src={skill.logoSrc}
                    alt={skill.logoAlt}
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <h3 className="mt-4 text-center text-sm font-semibold text-white/95">
                {skill.title}
              </h3>
              <p
                className="mt-2 text-center text-xs leading-relaxed text-white/70 overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {skill.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

