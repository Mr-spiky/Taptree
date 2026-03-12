"use client";

import { useState } from "react";
import Link from "next/link";
import { plans } from "./data";
import { CheckIcon } from "./ui";

/* ─── Billing Toggle ────────────────────────────────────────── */
function BillingToggle({ isYearly, onToggle }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        onClick={() => onToggle(false)}
        className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
          !isYearly ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onToggle(true)}
        className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
          isYearly ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Annually
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
          Save up to 22%
        </span>
      </button>
    </div>
  );
}

/* ─── Single Plan Card ──────────────────────────────────────── */
function PlanCard({ plan, isYearly }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const displayPrice = price === 0 ? "$0" : `$${price}`;
  const period = price === 0 ? "" : isYearly ? "/mo, billed yearly" : "/month";

  return (
    <article
      className={`pricing-card group relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:shadow-lg ${
        plan.featured
          ? "border-violet-300 bg-white ring-2 ring-violet-200 shadow-md scale-[1.02]"
          : "border-slate-200 bg-white shadow-sm hover:border-slate-300"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-violet-700 px-3 py-1 text-xs font-bold text-white shadow-sm">
          {plan.badge}
        </span>
      )}

      {/* Plan Name */}
      <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-black tracking-tight text-slate-900">{displayPrice}</span>
        {period && <span className="text-sm text-slate-500">{period}</span>}
      </div>

      {/* Tagline */}
      <p className="mt-3 min-h-10 text-sm leading-relaxed text-slate-600">{plan.tagline}</p>

      {/* CTA Button */}
      <Link
        href={plan.id === "premium" ? "/#contact" : "/signup"}
        className={`mt-6 flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
          plan.ctaVariant === "primary"
            ? "bg-violet-700 text-white hover:bg-violet-800 shadow-sm hover:shadow-md"
            : "border-2 border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50"
        }`}
      >
        {plan.cta}
      </Link>

      {/* Feature Highlights */}
      <ul className="mt-6 flex-1 space-y-3">
        {plan.highlights.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-700">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ─── Pricing Hero (export) ─────────────────────────────────── */
export default function PricingHero() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-slate-50 pb-4 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
            Pricing
          </p>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Pick your plan.{" "}
            <span className="bg-linear-to-r from-violet-600 to-emerald-500 bg-clip-text text-transparent">
              Make it yours.
            </span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Start free, upgrade when you need more power. Everything is built for creators, teams,
            and brands.
          </p>
        </div>

        {/* Toggle */}
        <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />

        {/* Plan Cards Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>

        {/* Enterprise Link */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Agency or Enterprise?{" "}
            <Link
              href="/#contact"
              className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4 hover:text-violet-800"
            >
              Get in touch for custom pricing &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
