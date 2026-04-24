"use client";

import { useState, type FormEvent } from "react";
import { submitContact } from "@/lib/api";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    | { ok: true; message: string }
    | { ok: false; message: string }
    | null
  >(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await submitContact({ name, email, message });
      setStatus({ ok: true, message: "发送成功！我们会尽快回复你。" });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const messageStr =
        err instanceof Error ? err.message : "发送失败，请稍后重试。";
      setStatus({ ok: false, message: messageStr });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-white/80">
          <div>你的名字</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/40 backdrop-blur-md outline-none focus:border-white/20"
            placeholder="Name"
            required
          />
        </label>

        <label className="space-y-2 text-sm text-white/80">
          <div>邮箱</div>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/40 backdrop-blur-md outline-none focus:border-white/20"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-white/80">
        <div>留言内容</div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full resize-y rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/40 backdrop-blur-md outline-none focus:border-white/20"
          placeholder="写点什么吧..."
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
      >
        {loading ? "发送中..." : "发送"}
      </button>

      {status ? (
        <div
          className={[
            "rounded-xl border px-4 py-3 text-sm backdrop-blur-md",
            status.ok
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
              : "border-rose-400/30 bg-rose-400/10 text-rose-100",
          ].join(" ")}
          role="status"
        >
          {status.message}
        </div>
      ) : null}
    </form>
  );
}

