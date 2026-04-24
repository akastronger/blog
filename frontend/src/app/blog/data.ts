export interface Article {
  title: string;
  author?: string;
  url: string;
  tags: string[];
  wordCount?: string;
  rating?: number;
}

export const BLOG_DATA: Record<string, Article[]> = {
  juejin: [
    {
      title: "OpenCode 配置手册",
      url: "https://juejin.cn/post/7613785351649329167",
      tags: ["工具配置"],
    },
    {
      title: "Windows Terminal 美化",
      url: "https://juejin.cn/post/123456790",
      tags: ["终端", "美化"],
    },
    {
      title: "Powershell 自动补全",
      url: "https://juejin.cn/post/123456791",
      tags: ["终端", "效率"],
    },
    {
      title: "vue3+ts+eslint+prettier 创建项目",
      url: "https://juejin.cn/post/123456792",
      tags: ["Vue", "工具"],
    },
    {
      title: "vue3+ts+vite ESLint+Prettier+Stylelint+husky 指南",
      url: "https://juejin.cn/post/123456793",
      tags: ["Vue", "工程化"],
    },
    {
      title: "Vue3 +Vite + TypeScript + ElementPlus + Pinia 搭建",
      url: "https://juejin.cn/post/123456794",
      tags: ["Vue", "UI"],
    },
    {
      title: "vite+vue3 配置 ESLint 与 prettier",
      url: "https://juejin.cn/post/123456795",
      tags: ["Vite", "工具"],
    },
  ],
  misc: [
    {
      title: "随笔文章示例1",
      url: "/blog/misc-1",
      tags: ["随笔"],
    },
  ],
  reading: [
    {
      title: "一句顶一万句（2022新版）",
      author: "刘震云",
      url: "https://weread.qq.com/web/reader/3de32670813ab703eg013597",
      tags: ["小说", "年代", "茅盾文学奖"],
      wordCount: "26.7万",
      rating: 91.3,
    },
    {
      title: "理解人性（果麦经典）",
      author: "阿尔弗雷德·阿德勒",
      url: "https://weread.qq.com/web/reader/2f832fb0813abb283g017629",
      tags: ["心理学", "个体心理学"],
      wordCount: "14.7万",
      rating: 91.4,
    },
    {
      title: "我们内心的冲突",
      author: "卡伦·霍妮",
      url: "https://weread.qq.com/web/reader/b36326307203c2b2b36493f",
      tags: ["心理学", "精神分析"],
      wordCount: "13万",
      rating: 81.9,
    },
    {
      title: "凡事发生必有利于我",
      author: "老杨的猫头鹰",
      url: "https://weread.qq.com/web/reader/2cb32e40813ab9e2bg016497",
      tags: ["个人成长", "人生哲学"],
      wordCount: "13.3万",
      rating: 83.8,
    },
  ],
  personal: [
    {
      title: "个人文章示例1",
      url: "/blog/personal-1",
      tags: ["个人"],
    },
  ],
  tech: [
    {
      title: "技术文章示例1",
      url: "/blog/tech-1",
      tags: ["技术"],
    },
  ],
};