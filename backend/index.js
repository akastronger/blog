const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs/promises");

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;
const CONTENT_DIR = path.join(__dirname, "..", "content", "posts");
const DATA_DIR = path.join(__dirname, "..", "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.jsonl");

function parseFrontMatter(markdown) {
  // Very small subset: parse YAML-like `--- ... ---` at top.
  // Expected keys: title, date, excerpt.
  if (!markdown.startsWith("---")) return {};

  const endIdx = markdown.indexOf("\n---", 3);
  if (endIdx === -1) return {};

  const fmRaw = markdown.slice(3, endIdx).trim();
  const lines = fmRaw.split("\n").map((l) => l.trim()).filter(Boolean);

  const out = {};
  for (const line of lines) {
    const match = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2] ?? "";
    // Strip surrounding quotes.
    value = value.replace(/^["']/, "").replace(/["']$/, "");
    out[key] = value;
  }

  return out;
}

function firstParagraph(text) {
  const cleaned = text.replace(/\r/g, "").trim();
  // Drop markdown code fences etc. Keep it simple: first non-empty line block.
  const parts = cleaned.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return parts[0] ?? "";
}

async function listPosts() {
  const files = await fs.readdir(CONTENT_DIR);
  const markdownFiles = files.filter((f) => f.endsWith(".md") || f.endsWith(".markdown"));

  const posts = [];
  for (const file of markdownFiles) {
    const slug = file.replace(/\.(md|markdown)$/, "");
    const fullPath = path.join(CONTENT_DIR, file);
    const markdown = await fs.readFile(fullPath, "utf8");
    const fm = parseFrontMatter(markdown);

    const contentWithoutFm = markdown.startsWith("---")
      ? markdown.slice(markdown.indexOf("\n---", 3) + 4).trim()
      : markdown;

    const excerptSource = fm.excerpt ? fm.excerpt : firstParagraph(contentWithoutFm);
    const excerpt = excerptSource.length > 160 ? `${excerptSource.slice(0, 160)}...` : excerptSource;

    posts.push({
      slug,
      title: fm.title || slug,
      date: fm.date || "",
      excerpt,
    });
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

async function getPostBySlug(slug) {
  const fullPathMd = path.join(CONTENT_DIR, `${slug}.md`);
  const fullPathMarkdown = path.join(CONTENT_DIR, `${slug}.markdown`);

  let fullPath = fullPathMd;
  try {
    await fs.access(fullPathMd);
  } catch {
    fullPath = fullPathMarkdown;
  }

  const markdown = await fs.readFile(fullPath, "utf8");
  const fm = parseFrontMatter(markdown);
  const content = markdown.startsWith("---")
    ? markdown.slice(markdown.indexOf("\n---", 3) + 4).trim()
    : markdown;

  return {
    slug,
    title: fm.title || slug,
    date: fm.date || "",
    content,
  };
}

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/posts", async (_req, res) => {
  try {
    const posts = await listPosts();
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: "Failed to list posts" });
  }
});

app.get("/api/posts/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await getPostBySlug(slug);
    res.json(post);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "name/email/message are required" });
    }
    if (typeof message !== "string" || message.trim().length < 5) {
      return res.status(400).json({ ok: false, error: "message too short" });
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    const row = {
      name: String(name),
      email: String(email),
      message: String(message),
      at: new Date().toISOString(),
    };
    await fs.appendFile(CONTACTS_FILE, JSON.stringify(row) + "\n", "utf8");

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Failed to submit contact" });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${PORT}`);
});

