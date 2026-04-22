import { getPosts } from "@/lib/api";
import { BlogTabs } from "./BlogTabs";

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          文章
        </h1>
        <p className="mt-3 text-sm text-white/70">
          这里是你的文章列表（从后端的 Markdown 文件自动生成）。
        </p>
      </div>

      <BlogTabs posts={posts} />
    </section>
  );
}

