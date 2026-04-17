export default function ExamplePage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-20 pt-10">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          页面渲染示例
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/75">
          这个页面展示了如何在 Next.js 中渲染不同类型的内容。
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-medium text-white">标题示例</h2>
          <p className="mt-2 text-sm text-white/70">
            这是一个二级标题，用于组织页面内容的结构。
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-white">三级标题</h3>
          <p className="mt-2 text-sm text-white/70">
            这是一个三级标题，用于更详细的内容组织。
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm text-white/80">
            这是一个普通段落，展示了基本的文本渲染。你可以在这里添加任意长度的文本内容，系统会自动处理换行和 spacing。
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-white">列表示例</h3>
          <ul className="mt-2 space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50"></span>
              <span>项目一</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50"></span>
              <span>项目二</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50"></span>
              <span>项目三</span>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-white">代码示例</h3>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-black/30 p-4 text-xs text-white/90">
            <code>
              {`// 这是一个代码示例
function hello() {
  console.log('Hello, world!');
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-white">链接示例</h3>
          <p className="mt-2 text-sm text-white/70">
            这是一个 <a href="#" className="text-[#6b1eff] hover:underline">链接</a>，点击后可以跳转到其他页面。
          </p>
        </div>
      </div>
    </section>
  );
}