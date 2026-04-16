"use client";

import { useState } from "react";

const TABS = ["Coverage", "Exclusions", "Premiums", "Claims", "Risk Score"];

export default function PolicyTabs({ data }) {
  const [active, setActive] = useState("Coverage");

  return (
    <div style={{ background: "#1a1d2e", border: "0.5px solid #2a2d3e", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ display: "flex", borderBottom: "0.5px solid #2a2d3e", overflowX: "auto" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: "14px 20px",
              fontSize: "14px",
              fontWeight: "500",
              whiteSpace: "nowrap",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: active === tab ? "#378ADD" : "#85B7EB",
              borderBottom: active === tab ? "2px solid #378ADD" : "2px solid transparent",
              transition: "all 0.2s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px" }}>
        {active === "Coverage" && <CoverageTab sections={data.coverage_sections} />}
        {active === "Exclusions" && <ExclusionsTab exclusions={data.exclusions} />}
        {active === "Premiums" && <PremiumsTab premiums={data.premiums} terms={data.terms} />}
        {active === "Claims" && <ClaimsTab procedures={data.claim_procedures} />}
        {active === "Risk Score" && <RiskTab risk={data.risk_assessment} />}
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div style={{ background: "#0f1117", border: "0.5px solid #2a2d3e", borderRadius: "12px", padding: "16px", marginBottom: "12px" }}>
      {children}
    </div>
  );
}

function Badge({ text, color }) {
  const colors = {
    red: { bg: "#2a1a1a", color: "#F09595" },
    yellow: { bg: "#2a2410", color: "#FAC775" },
    green: { bg: "#1a2a1a", color: "#C0DD97" },
    blue: { bg: "#1a2233", color: "#85B7EB" },
    gray: { bg: "#2a2d3e", color: "#B5D4F4" },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{ background: c.bg, color: c.color, fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "999px" }}>
      {text}
    </span>
  );
}

function CoverageTab({ sections }) {
  return (
    <div>
      {sections.map((s) => (
        <Card key={s.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ color: "#E6F1FB", fontWeight: "500", fontSize: "15px" }}>{s.coverage_name}</span>
            {s.coverage_limit > 0 && (
              <Badge text={`₹${s.coverage_limit.toLocaleString()}`} color="green" />
            )}
          </div>
          <p style={{ color: "#85B7EB", fontSize: "13px", margin: 0 }}>{s.description}</p>
        </Card>
      ))}
    </div>
  );
}

function ExclusionsTab({ exclusions }) {
  const severityColor = (s) => s === "high" ? "red" : s === "medium" ? "yellow" : "gray";
  return (
    <div>
      {exclusions.map((e) => (
        <Card key={e.id}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
            <Badge text={e.severity} color={severityColor(e.severity)} />
            <span style={{ color: "#85B7EB", fontSize: "12px" }}>{e.applies_to}</span>
          </div>
          <p style={{ color: "#B5D4F4", fontSize: "13px", margin: 0 }}>{e.exclusion_description}</p>
        </Card>
      ))}
    </div>
  );
}

function PremiumsTab({ premiums, terms }) {
  return (
    <div>
      {premiums.map((p) => (
        <Card key={p.id}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ color: "#85B7EB", fontSize: "13px" }}>Premium Amount</span>
            <span style={{ color: "#378ADD", fontSize: "22px", fontWeight: "600" }}>₹{p.premium_amount.toLocaleString()}</span>
          </div>
          {[
            ["Payment Frequency", p.payment_frequency],
            ["Renewal Date", p.renewal_date],
            ["Additional Charges", p.additional_charges],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#85B7EB", fontSize: "13px" }}>{label}</span>
              <span style={{ color: "#B5D4F4", fontSize: "13px", textTransform: "capitalize" }}>{value}</span>
            </div>
          ))}
        </Card>
      ))}

      <p style={{ color: "#E6F1FB", fontWeight: "500", fontSize: "15px", margin: "20px 0 12px" }}>Terms & Conditions</p>
      {terms.map((t) => (
        <Card key={t.id}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
            <Badge text={t.is_favorable} color={t.is_favorable === "favorable" ? "green" : "red"} />
            <span style={{ color: "#85B7EB", fontSize: "12px", textTransform: "capitalize" }}>{t.category} · {t.impact_level} impact</span>
          </div>
          <p style={{ color: "#B5D4F4", fontSize: "13px", margin: 0 }}>{t.term_description}</p>
        </Card>
      ))}
    </div>
  );
}

function ClaimsTab({ procedures }) {
  return (
    <div>
      {procedures.map((p) => (
        <Card key={p.id}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#185FA5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#E6F1FB", fontSize: "13px", fontWeight: "600" }}>{p.step_number}</span>
            </div>
            <div>
              <p style={{ color: "#E6F1FB", fontWeight: "500", fontSize: "14px", margin: "0 0 6px" }}>{p.procedure_description}</p>
              <p style={{ color: "#85B7EB", fontSize: "12px", margin: "0 0 4px" }}>📄 {p.required_documents}</p>
              <p style={{ color: "#85B7EB", fontSize: "12px", margin: 0 }}>⏱ {p.processing_time}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function RiskTab({ risk }) {
  const score = risk.overall_risk_score;
  const color = score >= 7 ? "#F09595" : score >= 5 ? "#FAC775" : "#C0DD97";
  const bg = score >= 7 ? "#2a1a1a" : score >= 5 ? "#2a2410" : "#1a2a1a";

  return (
    <div>
      <div style={{ background: bg, borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "16px" }}>
        <p style={{ color: "#85B7EB", fontSize: "13px", marginBottom: "8px" }}>Overall Risk Score</p>
        <p style={{ color, fontSize: "52px", fontWeight: "700", margin: 0 }}>
          {score}<span style={{ fontSize: "20px", color: "#85B7EB" }}>/10</span>
        </p>
      </div>

      {[
        { label: "✅ Favorable Aspects", text: risk.favorable_aspects, color: "#C0DD97" },
        { label: "⚠️ Unfavorable Aspects", text: risk.unfavorable_aspects, color: "#F09595" },
        { label: "🏛 Regulatory Concerns", text: risk.regulatory_concerns, color: "#E6F1FB" },
        { label: "👨‍👩‍👧 Family Impact", text: risk.family_impact, color: "#E6F1FB" },
      ].map(({ label, text, color }) => (
        <Card key={label}>
          <p style={{ color, fontWeight: "500", fontSize: "14px", marginBottom: "8px" }}>{label}</p>
          <p style={{ color: "#85B7EB", fontSize: "13px", margin: 0, lineHeight: "1.6" }}>{text}</p>
        </Card>
      ))}
    </div>
  );
}