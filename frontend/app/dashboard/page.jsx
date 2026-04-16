"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyPolicies, deletePolicy } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  useAuth();
  const router = useRouter();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    getMyPolicies()
      .then(setPolicies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this policy?")) return;
    setDeleting(id);
    try {
      await deletePolicy(id);
      setPolicies((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete policy.");
    } finally {
      setDeleting(null);
    }
  }

  const typeColors = {
    health: { bg: "#1a2a1a", color: "#C0DD97" },
    life: { bg: "#1a2233", color: "#85B7EB" },
    vehicle: { bg: "#2a2410", color: "#FAC775" },
    home: { bg: "#2a1a2a", color: "#ED93B1" },
    travel: { bg: "#1a2a2a", color: "#5DCAA5" },
  };

  return (
    <main style={{ background: "#0f1117", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ color: "#E6F1FB", fontSize: "24px", fontWeight: "600", marginBottom: "4px" }}>
              My Policies
            </h1>
            <p style={{ color: "#85B7EB", fontSize: "13px" }}>
              {policies.length} {policies.length === 1 ? "policy" : "policies"} uploaded
            </p>
          </div>
          <button
            onClick={() => router.push("/upload")}
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
            + Upload New
          </button>
        </div>

        {loading ? (
          <p style={{ color: "#85B7EB", textAlign: "center", marginTop: "60px" }}>Loading your policies...</p>
        ) : policies.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <p style={{ color: "#85B7EB", fontSize: "16px", marginBottom: "16px" }}>No policies uploaded yet</p>
            <button
              onClick={() => router.push("/upload")}
              style={{
                background: "#378ADD",
                color: "#E6F1FB",
                border: "none",
                borderRadius: "10px",
                padding: "10px 24px",
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              Upload Your First Policy
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {policies.map((p) => {
              const tc = typeColors[p.policy_type] || typeColors.health;
              return (
                <div
                  key={p.id}
                  style={{
                    background: "#1a1d2e",
                    border: "0.5px solid #2a2d3e",
                    borderRadius: "14px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ color: "#E6F1FB", fontWeight: "600", fontSize: "15px", marginBottom: "4px" }}>
                        {p.policy_name}
                      </p>
                      <span style={{
                        background: tc.bg,
                        color: tc.color,
                        fontSize: "11px",
                        fontWeight: "500",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        textTransform: "capitalize"
                      }}>
                        {p.policy_type}
                      </span>
                    </div>
                    <span style={{
                      background: p.status === "processed" ? "#1a2a1a" : "#2a2410",
                      color: p.status === "processed" ? "#C0DD97" : "#FAC775",
                      fontSize: "11px",
                      padding: "3px 10px",
                      borderRadius: "999px"
                    }}>
                      {p.status}
                    </span>
                  </div>

                  <p style={{ color: "#85B7EB", fontSize: "12px" }}>
                    {new Date(p.upload_date).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>

                  <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                    <button
                      onClick={() => router.push(`/results/${p.id}`)}
                      style={{
                        flex: 1,
                        background: "#378ADD",
                        color: "#E6F1FB",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer"
                      }}
                    >
                      View Results
                    </button>
                    <button
                      onClick={() => router.push(`/chat/${p.id}`)}
                      style={{
                        flex: 1,
                        background: "#2a2d3e",
                        color: "#B5D4F4",
                        border: "0.5px solid #3a3d4e",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "13px",
                        cursor: "pointer"
                      }}
                    >
                      Ask AI
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deleting === p.id}
                      style={{
                        background: "#2a1a1a",
                        color: "#F09595",
                        border: "0.5px solid #3a2a2a",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontSize: "13px",
                        cursor: "pointer",
                        opacity: deleting === p.id ? 0.5 : 1
                      }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}