import Link from "next/link";
import { getPosts } from "@/lib/api";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Blog
        </h1>
        <p className="mt-3 text-sm text-white/70">
          这里是你的文章列表（从后端的 Markdown 文件自动生成）。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md transition hover:bg-white/15"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm font-medium text-white/90">
                {post.title}
              </div>
              <div className="text-xs font-medium text-white/60">
                {post.date}
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/70">
              {post.excerpt}
            </p>
            <div className="mt-5 text-xs font-semibold text-white/80">
              Read more →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

