import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/api";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-20 pt-10">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {post.title}
            </h1>
            {post.date ? (
              <div className="mt-3 text-xs font-medium text-white/70">
                {post.date}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const text = String(children ?? "");

                const isInline =
                  !className || !String(className).includes("language-");

                if (isInline) {
                  return (
                    <code className="rounded bg-black/25 px-1.5 py-0.5 text-xs text-white/90">
                      {text}
                    </code>
                  );
                }

                return (
                  <pre className="overflow-x-auto rounded-xl bg-black/30 p-4">
                    <code className={className ? className : ""} {...props}>
                      {text}
                    </code>
                  </pre>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

