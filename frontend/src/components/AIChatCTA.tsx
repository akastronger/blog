export default function AIChatCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 p-8 md:p-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Ready to chat with AI?
                <br />
                Start a conversation now!
              </h2>
              <p className="mt-4 text-white/90">
                Experience the power of AI-driven conversations. Get answers, insights, and assistance on various topics. (这是一个AI智障还在完善 😊 可以转接入类智能)
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a
                href="https://www.doubao.com/chat/"
                className="inline-flex items-center gap-2 rounded-full bg-[#111b26] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span>💬</span>
                Start Chatting
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}