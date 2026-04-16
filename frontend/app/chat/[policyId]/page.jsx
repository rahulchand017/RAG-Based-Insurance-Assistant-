"use client";

import { useParams, useRouter } from "next/navigation";
import ChatWindow from "@/components/ChatWindow";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth";

export default function ChatPage() {
  useAuth();
  const params = useParams();
  const policyId = params?.policyId;
  const router = useRouter();

  return (
    <main style={{ background: "#0f1117", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h1 style={{ color: "#E6F1FB", fontSize: "22px", fontWeight: "600", marginBottom: "4px" }}>
              Ask About Your Policy
            </h1>
            <p style={{ color: "#85B7EB", fontSize: "13px" }}>Policy #{policyId}</p>
          </div>
          <button
            onClick={() => router.push(`/results/${policyId}`)}
            style={{
              color: "#85B7EB",
              background: "transparent",
              border: "0.5px solid #2a2d3e",
              borderRadius: "10px",
              padding: "8px 16px",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            ← Back to Results
          </button>
        </div>

        <ChatWindow policyId={policyId} />
      </div>
    </main>
  );
}