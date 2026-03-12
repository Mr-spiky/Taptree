import { Fragment } from "react";
import { featureCategories } from "./data";
import { Section, SectionHeader, CheckIcon } from "./ui";

const planHeaders = ["Free", "Starter", "Pro", "Premium"];
const planKeys = ["free", "starter", "pro", "premium"];

export default function FeatureTable() {
  return (
    <Section bg="gray" className="py-20" id="features">
      <SectionHeader title="All Features" subtitle="A detailed look at what every plan includes." />

      <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-175 w-full text-left text-sm">
          {/* Sticky header */}
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b-2 border-slate-200">
              <th className="w-2/5 px-6 py-5 text-base font-bold text-slate-900">Feature</th>
              {planHeaders.map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-5 text-center text-base font-bold ${
                    i === 2 ? "text-violet-700" : "text-slate-900"
                  }`}
                >
                  {h}
                  {i === 2 && (
                    <span className="ml-1.5 inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                      Popular
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {featureCategories.map((group) => (
              <Fragment key={group.category}>
                {/* Category header row */}
                <tr>
                  <td
                    colSpan={5}
                    className="bg-slate-50 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    {group.category}
                  </td>
                </tr>

                {/* Feature rows */}
                {group.rows.map((row, ri) => (
                  <tr
                    key={`${group.category}-${row.feature}`}
                    className={`border-b border-slate-50 transition-colors hover:bg-violet-50/40 ${
                      ri % 2 === 0 ? "" : "bg-slate-50/30"
                    }`}
                  >
                    <td className="px-6 py-3.5 text-slate-700">{row.feature}</td>
                    {planKeys.map((key) => (
                      <td key={key} className="px-4 py-3.5 text-center">
                        <span className="inline-flex items-center justify-center">
                          <CheckIcon active={row[key]} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
