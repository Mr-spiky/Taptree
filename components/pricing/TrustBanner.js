import { trustedBrands } from "./data";
import { Section } from "./ui";

export default function TrustBanner() {
  return (
    <Section bg="white" className="border-y border-slate-200 py-14">
      <div className="text-center">
        {/* Heading */}
        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          The only link in bio trusted by{" "}
          <span className="bg-linear-to-r from-violet-600 to-emerald-500 bg-clip-text text-transparent">
            70M+ creators
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-500">
          Join the world&apos;s biggest brands and creators who rely on Taptree every day.
        </p>

        {/* Brand Logos */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {trustedBrands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-bold tracking-wide text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
            >
              {brand}
            </div>
          ))}
        </div>

        {/* Decorative creator preview strip */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {[
            "bg-violet-200",
            "bg-emerald-200",
            "bg-amber-200",
            "bg-rose-200",
            "bg-sky-200",
          ].map((color, i) => (
            <div
              key={i}
              className={`h-16 w-12 rounded-xl ${color} sm:h-20 sm:w-16`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
