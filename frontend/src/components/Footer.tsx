export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70 backdrop-blur-md">
        © {new Date().getFullYear()} Stronger. Built with Next.js + Node/Express.
      </div>
    </footer>
  );
}

