import Link from "next/link";
import { growthSteps } from "./data";
import { Section, SectionHeader, StepIcon, CTAButton } from "./ui";

export default function GrowthSteps() {
  return (
    <Section bg="violet" className="py-20">
      <SectionHeader
        title="Your growth starts here."
        subtitle="Launch faster with better monetization and clearer analytics — three simple steps."
      />

      {/* Steps Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {growthSteps.map((step) => (
          <article
            key={step.step}
            className="group relative rounded-2xl border border-white/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            {/* Step number chip */}
            <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
              {step.step}
            </span>

            {/* Icon */}
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <StepIcon name={step.icon} className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <CTAButton href="/signup" variant="primary" size="lg">
          Get started for free
        </CTAButton>
        <Link
          href="/examples"
          className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4 hover:text-violet-800"
        >
          Find out more &rarr;
        </Link>
      </div>
    </Section>
  );
}
