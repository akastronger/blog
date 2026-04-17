export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-20 pt-10">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          About
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/75">
          这是一个示例个人博客：前端用 Next.js（React + App Router + Tailwind）
          搭建页面，后端用 Node.js + Express 提供 `/api/posts` 与 `/api/contact`
          接口，文章内容来自 `content/posts` 目录下的 Markdown 文件。
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/75">
          你可以把自己的文字和头像替换进去，并新增 `.md` 文件来自动生成新文章页面。
        </p>
      </div>
    </section>
  );
}

