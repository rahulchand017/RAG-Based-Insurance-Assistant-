"use client";

import { useState } from "react";

const TABS = ["Coverage", "Exclusions", "Premiums", "Claims", "Risk Score"];

export default function PolicyTabs({ data }) {
  const [active, setActive] = useState("Coverage");

  return (
    <div className="bg-white rounded-2xl shadow-md">
      {/* Tab Bar */}
      <div className="flex border-b overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition ${
              active === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {active === "Coverage" && <CoverageTab sections={data.coverage_sections} />}
        {active === "Exclusions" && <ExclusionsTab exclusions={data.exclusions} />}
        {active === "Premiums" && <PremiumsTab premiums={data.premiums} terms={data.terms} />}
        {active === "Claims" && <ClaimsTab procedures={data.claim_procedures} />}
        {active === "Risk Score" && <RiskTab risk={data.risk_assessment} />}
      </div>
    </div>
  );
}

function CoverageTab({ sections }) {
  return (
    <div className="space-y-4">
      {sections.map((s) => (
        <div key={s.id} className="border rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-800">{s.coverage_name}</h3>
            {s.coverage_limit > 0 && (
              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                ₹{s.coverage_limit.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{s.description}</p>
        </div>
      ))}
    </div>
  );
}

function ExclusionsTab({ exclusions }) {
  const severityColor = (s) => {
    if (s === "high") return "bg-red-100 text-red-700";
    if (s === "medium") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-4">
      {exclusions.map((e) => (
        <div key={e.id} className="border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${severityColor(e.severity)}`}>
              {e.severity}
            </span>
            <span className="text-xs text-gray-400">{e.applies_to}</span>
          </div>
          <p className="text-sm text-gray-700">{e.exclusion_description}</p>
        </div>
      ))}
    </div>
  );
}

function PremiumsTab({ premiums, terms }) {
  return (
    <div className="space-y-6">
      {premiums.map((p) => (
        <div key={p.id} className="border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Premium Amount</span>
            <span className="text-xl font-bold text-blue-600">₹{p.premium_amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Payment Frequency</span>
            <span className="text-sm capitalize text-gray-800">{p.payment_frequency}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Renewal Date</span>
            <span className="text-sm text-gray-800">{p.renewal_date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Additional Charges</span>
            <span className="text-sm text-gray-800">{p.additional_charges}</span>
          </div>
        </div>
      ))}

      <h3 className="font-semibold text-gray-700 mt-4">Terms & Conditions</h3>
      <div className="space-y-3">
        {terms.map((t) => (
          <div key={t.id} className="border rounded-xl p-4">
            <div className="flex gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                t.is_favorable === "favorable" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {t.is_favorable}
              </span>
              <span className="text-xs text-gray-400 capitalize">{t.category} · {t.impact_level} impact</span>
            </div>
            <p className="text-sm text-gray-700">{t.term_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClaimsTab({ procedures }) {
  return (
    <div className="space-y-4">
      {procedures.map((p) => (
        <div key={p.id} className="border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">
              {p.step_number}
            </span>
            <h3 className="font-semibold text-gray-800">{p.procedure_description}</h3>
          </div>
          <p className="text-xs text-gray-500 ml-10">📄 {p.required_documents}</p>
          <p className="text-xs text-gray-400 ml-10 mt-1">⏱ {p.processing_time}</p>
        </div>
      ))}
    </div>
  );
}

function RiskTab({ risk }) {
  const score = risk.overall_risk_score;
  const color = score >= 7 ? "text-red-600" : score >= 5 ? "text-yellow-600" : "text-green-600";
  const bg = score >= 7 ? "bg-red-50" : score >= 5 ? "bg-yellow-50" : "bg-green-50";

  return (
    <div className="space-y-4">
      <div className={`${bg} rounded-xl p-6 text-center`}>
        <p className="text-sm text-gray-500 mb-1">Overall Risk Score</p>
        <p className={`text-5xl font-bold ${color}`}>{score}<span className="text-xl text-gray-400">/10</span></p>
      </div>

      <div className="border rounded-xl p-4">
        <h3 className="font-semibold text-green-700 mb-2">✅ Favorable Aspects</h3>
        <p className="text-sm text-gray-600">{risk.favorable_aspects}</p>
      </div>

      <div className="border rounded-xl p-4">
        <h3 className="font-semibold text-red-700 mb-2">⚠️ Unfavorable Aspects</h3>
        <p className="text-sm text-gray-600">{risk.unfavorable_aspects}</p>
      </div>

      <div className="border rounded-xl p-4">
        <h3 className="font-semibold text-gray-700 mb-2">🏛 Regulatory Concerns</h3>
        <p className="text-sm text-gray-600">{risk.regulatory_concerns}</p>
      </div>

      <div className="border rounded-xl p-4">
        <h3 className="font-semibold text-gray-700 mb-2">👨‍👩‍👧 Family Impact</h3>
        <p className="text-sm text-gray-600">{risk.family_impact}</p>
      </div>
    </div>
  );
}
