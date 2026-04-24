const GOALS_2026 = [
  {
    title: "减重 10kg",
    description: "控制饮食 + 每周规律运动，养成健康的生活方式",
    icon: "🎯",
    progress: 0,
    color: "from-rose-400/25 to-pink-500/20",
  },
  {
    title: "Node.js 深入学习",
    description: "掌握核心原理，阅读源码，完成 2-3 个完整项目",
    icon: "📚",
    progress: 0,
    color: "from-emerald-400/25 to-green-500/20",
  },
  {
    title: "买房计划",
    description: "了解房产政策，攒够首付，选定目标城市",
    icon: "🏠",
    progress: 0,
    color: "from-amber-400/25 to-orange-500/20",
  },
  {
    title: "技术博客更新",
    description: "每月至少输出 2 篇高质量技术文章",
    icon: "✍️",
    progress: 0,
    color: "from-sky-400/25 to-blue-500/20",
  },
  {
    title: "英语口语提升",
    description: "每天练习 30 分钟，年底达到流利对话水平",
    icon: "🗣️",
    progress: 15,
    color: "from-violet-400/25 to-purple-500/20",
  },
  {
    title: "旅行计划",
    description: "完成至少 2 次长途旅行，探索新目的地",
    icon: "✈️",
    progress: 10,
    color: "from-cyan-400/25 to-teal-500/20",
  },
];

export default function Goals2026() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          2026 计划目标
        </h2>
        <p className="mt-2 text-sm text-white/60">新的一年，新的期待</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GOALS_2026.map((goal) => (
          <div
            key={goal.title}
            className={[
              "rounded-2xl border border-white/10 p-5",
              "bg-linear-to-br from-sky-500/15 via-blue-500/10 to-indigo-500/15",
              "bg-[#0b1220]/80 backdrop-blur-md",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-xl text-xl",
                  `bg-linear-to-br ${goal.color}`,
                  "border border-white/10",
                ].join(" ")}
              >
                {goal.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-white/95">
                  {goal.title}
                </div>
                <div className="mt-0.5 text-xs text-white/60">
                  {goal.description}
                </div>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <div className="mt-2 text-right text-xs text-white/50">
              {goal.progress}% 完成
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}