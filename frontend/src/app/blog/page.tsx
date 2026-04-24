import { BlogTabs } from "./BlogTabs";

export default async function BlogPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          文章
        </h1>
        <p className="mt-3 text-sm text-white/70">
          技术文章与读书笔记。
        </p>
      </div>

      <BlogTabs />
    </section>
  );
}

