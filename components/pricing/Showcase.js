import { showcaseCards } from "./data";
import { Section, SectionHeader } from "./ui";

const colorMap = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    icon: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
};

export default function Showcase() {
  return (
    <Section bg="white" className="py-20">
      <SectionHeader
        title="Everything you need, and then some."
        subtitle="Build a link-in-bio that converts clicks into customers with native commerce, analytics, and automation."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {showcaseCards.map((card) => {
          const c = colorMap[card.color] || colorMap.emerald;
          return (
            <article
              key={card.title}
              className={`group relative overflow-hidden rounded-2xl border ${c.border} ${c.bg} p-6 transition-all duration-300 hover:shadow-lg`}
            >
              {/* Decorative dot */}
              <div className={`mb-4 h-3 w-3 rounded-full ${c.dot}`} aria-hidden="true" />

              {/* Decorative mock image placeholder */}
              <div
                className={`mb-6 h-36 w-full rounded-xl ${c.border} border-2 border-dashed flex items-center justify-center`}
              >
                <svg
                  className="h-10 w-10 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
