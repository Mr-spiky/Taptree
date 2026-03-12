import Link from "next/link";

export default function BottomCTA() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Jumpstart your corner of the Internet today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Your audience is waiting. Create your free Taptree in under a minute and
          start sharing everything that matters.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all hover:bg-lime-400 hover:shadow-md active:scale-[0.97]"
          >
            Get started for free
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center rounded-full border-2 border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            Compare plans
          </Link>
        </div>
      </div>
    </section>
  );
}
