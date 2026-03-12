"use client";

import { useState } from "react";
import { earnTabs } from "./data";
import { CheckIcon, SectionHeader } from "./ui";

export default function EarnMore() {
  const [activeTab, setActiveTab] = useState(earnTabs[0].id);
  const current = earnTabs.find((t) => t.id === activeTab) ?? earnTabs[0];

  const planKeys = ["free", "starter", "pro", "premium"];
  const planLabels = ["Free", "Starter", "Pro", "Premium"];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get more ways to earn."
          subtitle="Monetize your audience with built-in commerce, tips, and integrations."
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {earnTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mini Table */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-4 font-semibold text-slate-900">Feature</th>
                {planLabels.map((label) => (
                  <th key={label} className="px-5 py-4 text-center font-semibold text-slate-900">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {current.rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-slate-50 transition-colors hover:bg-slate-50 ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <td className="px-5 py-3.5 text-slate-700">{row.feature}</td>
                  {planKeys.map((key) => (
                    <td key={key} className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center">
                        <CheckIcon active={row[key]} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
