"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPolicy } from "@/lib/api";
import PolicyTabs from "@/components/PolicyTabs";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function ResultsPage() {
  useAuth();
  const params = useParams();
  const policyId = params?.policyId;
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!policyId) return;
    getPolicy(policyId)
      .then(setData)
      .catch(() => setError("Failed to load policy data."));
  }, [policyId]);

  if (error) return (
    <main style={{ background: "#0f1117", minHeight: "100vh" }}>
      <Navbar />
      <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
        <p style={{ color: "#F09595" }}>{error}</p>
      </div>
    </main>
  );

  if (!data) return (
    <main style={{ background: "#0f1117", minHeight: "100vh" }}>
      <Navbar />
      <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 64px)" }}>
        <p style={{ color: "#85B7EB" }}>Loading policy...</p>
      </div>
    </main>
  );

  return (
    <main style={{ background: "#0f1117", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ color: "#E6F1FB", fontSize: "24px", fontWeight: "600", marginBottom: "4px" }}>
              {data.policy.policy_name}
            </h1>
            <p style={{ color: "#85B7EB", fontSize: "13px", textTransform: "capitalize" }}>
              {data.policy.policy_type} Policy · {data.policy.status}
            </p>
          </div>
          <button
            onClick={() => router.push(`/chat/${policyId}`)}
            style={{
              background: "#378ADD",
              color: "#E6F1FB",
              border: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            💬 Ask AI
          </button>
        </div>

        <PolicyTabs data={data} />
      </div>
    </main>
  );
}