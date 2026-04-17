export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export type PostDetail = {
  slug: string;
  title: string;
  date: string;
  content: string;
};

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

export async function getPosts(): Promise<PostSummary[]> {
  const res = await fetch(`${BACKEND_URL}/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPost(slug: string): Promise<PostDetail> {
  const res = await fetch(`${BACKEND_URL}/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

export async function submitContact(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<{ ok: boolean }> {
  const res = await fetch(`${BACKEND_URL}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Failed to submit contact");
  return data;
}

