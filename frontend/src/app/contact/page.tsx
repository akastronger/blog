import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Contact
        </h1>
        <p className="mt-3 text-sm text-white/70">
          发送一条消息给我，我会在看到后尽快回复。
        </p>

        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

