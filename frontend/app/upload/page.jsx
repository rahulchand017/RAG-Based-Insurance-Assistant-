"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadZone from "@/components/UploadZone";
import { uploadPolicy, analyzePolicy } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function UploadPage() {
  useAuth();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [policyName, setPolicyName] = useState("");
  const [policyType, setPolicyType] = useState("health");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!file || !policyName) {
      setError("Please provide a file and policy name.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const uploaded = await uploadPolicy(file, policyName, policyType);
      await analyzePolicy(uploaded.id);
      router.push(`/results/${uploaded.id}`);
    } catch (err) {
      setError("Something went wrong. Make sure the backend is running.");
      setLoading(false);
    }
  }

  return (
    <main style={{ background: "#0f1117", minHeight: "100vh" }}>
      <Navbar />
      <div className="flex items-center justify-center p-6" style={{ minHeight: "calc(100vh - 64px)" }}>
        <div style={{ background: "#1a1d2e", border: "0.5px solid #2a2d3e", borderRadius: "16px", width: "100%", maxWidth: "500px", padding: "36px" }}>
          
          <h1 style={{ color: "#E6F1FB", fontSize: "22px", fontWeight: "600", marginBottom: "6px" }}>
            Analyze Your Policy
          </h1>
          <p style={{ color: "#85B7EB", fontSize: "14px", marginBottom: "28px" }}>
            Upload a PDF to get coverage breakdown, risk score and AI chat
          </p>

          <UploadZone file={file} setFile={setFile} />

          <div style={{ marginTop: "20px" }}>
            <label style={{ color: "#B5D4F4", fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>
              Policy Name
            </label>
            <input
              type="text"
              placeholder="e.g. Max Bupa Health Plan"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              style={{
                width: "100%",
                background: "#0f1117",
                border: "0.5px solid #2a2d3e",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "14px",
                color: "#E6F1FB",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <label style={{ color: "#B5D4F4", fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>
              Policy Type
            </label>
            <select
              value={policyType}
              onChange={(e) => setPolicyType(e.target.value)}
              style={{
                width: "100%",
                background: "#0f1117",
                border: "0.5px solid #2a2d3e",
                borderRadius: "10px",
                padding: "10px 14px",
                fontSize: "14px",
                color: "#E6F1FB",
                outline: "none",
                boxSizing: "border-box"
              }}
            >
              <option value="health">Health</option>
              <option value="life">Life</option>
              <option value="vehicle">Vehicle</option>
              <option value="home">Home</option>
              <option value="travel">Travel</option>
            </select>
          </div>

          {error && (
            <p style={{ color: "#F09595", fontSize: "13px", marginTop: "12px" }}>{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: "24px",
              width: "100%",
              background: loading ? "#185FA5" : "#378ADD",
              color: "#E6F1FB",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Uploading & Analyzing..." : "Analyze Policy"}
          </button>
        </div>
      </div>
    </main>
  );
}