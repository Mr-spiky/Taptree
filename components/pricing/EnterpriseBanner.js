import Link from "next/link";
import { Section } from "./ui";

export default function EnterpriseBanner() {
  return (
    <Section bg="gray" className="py-16">
      <div className="rounded-3xl bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-center shadow-xl sm:p-12">
        <h2 className="text-2xl font-black text-white sm:text-3xl">Agency or Enterprise?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Need custom onboarding, SLA guarantees, SAML SSO, or team workspaces?
          Let&apos;s build a plan that fits your scale.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:bg-slate-100 active:scale-[0.97]"
          >
            Talk to sales
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/examples"
            className="inline-flex items-center rounded-full border-2 border-white/20 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            See agency examples
          </Link>
        </div>
      </div>
    </Section>
  );
}
