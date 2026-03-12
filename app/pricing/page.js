import {
  PricingHero,
  TrustBanner,
  GrowthSteps,
  EarnMore,
  FeatureTable,
  Showcase,
  Testimonial,
  EnterpriseBanner,
  FAQ,
  BottomCTA,
} from "@/components/pricing";

export const metadata = {
  title: "Pricing — Taptree",
  description:
    "Pick the plan that fits your goals. Start free, upgrade when you need more power.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* 1 — Hero: billing toggle + 4 plan cards + enterprise link */}
      <PricingHero />

      {/* 2 — Trust banner: "70M+ creators" + brand logos */}
      <TrustBanner />

      {/* 3 — Growth steps: 3 simple steps */}
      <GrowthSteps />

      {/* 4 — Earn more: tabbed mini-table */}
      <EarnMore />

      {/* 5 — Full feature comparison table */}
      <FeatureTable />

      {/* 6 — Showcase cards: "Everything you need" */}
      <Showcase />

      {/* 7 — Testimonial quote */}
      <Testimonial />

      {/* 8 — Enterprise CTA banner */}
      <EnterpriseBanner />

      {/* 9 — FAQ accordion */}
      <FAQ />

      {/* 10 — Bottom CTA: "Jumpstart your corner…" */}
      <BottomCTA />
    </main>
  );
}
