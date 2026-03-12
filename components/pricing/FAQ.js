import { faqs } from "./data";
import { Section, SectionHeader } from "./ui";

export default function FAQ() {
  return (
    <Section bg="gray" className="py-20">
      <SectionHeader title="Frequently asked questions" />

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-md"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900 transition-colors hover:text-violet-700 [&::-webkit-details-marker]:hidden">
              <span>{faq.q}</span>
              {/* Chevron */}
              <svg
                className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{faq.a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}
