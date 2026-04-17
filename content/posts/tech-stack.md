---
title: 技术栈与工程结构
date: 2026-04-15
excerpt: 用 Next.js + Node/Express 搭建个人博客，文章用 Markdown 维护。
---

这个博客的结构很简单：

1. 前端：Next.js（React + App Router + Tailwind）
2. 后端：Node.js + Express，提供 `/api/posts` 和 `/api/posts/:slug`
3. 内容：Markdown 文件位于 `content/posts`

这样你可以像写文档一样写文章，不需要每次都改前端代码。

```bash
npm run dev
```

在本地同时启动前端与后端后，你就能在浏览器中看到博客页面。

