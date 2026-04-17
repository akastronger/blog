import {
  Code2,
  LineChart,
  Palette,
  Search,
} from "lucide-react";

const SKILLS = [
  {
    title: "Web Development",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Code2,
    color: "from-sky-400/25 to-indigo-400/20",
  },
  {
    title: "UI/UX Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Palette,
    color: "from-fuchsia-400/25 to-pink-400/20",
  },
  {
    title: "SEO Optimization",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Search,
    color: "from-emerald-400/20 to-lime-400/15",
  },
  {
    title: "Performance Tuning",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: LineChart,
    color: "from-amber-400/20 to-rose-400/15",
  },
];

export default function Skills() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          My Skills
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {SKILLS.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.title}
              className={[
                "rounded-2xl border border-white/10 bg-white/10 p-6",
                "backdrop-blur-md",
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
                  <Icon className="h-6 w-6 text-white/90" />
                </div>
              </div>
              <h3 className="mt-4 text-center text-sm font-semibold text-white/95">
                {skill.title}
              </h3>
              <p className="mt-2 text-center text-xs leading-relaxed text-white/70">
                {skill.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

