"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("username", res.username);
      router.push("/upload");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    background: "#0f1117",
    border: "0.5px solid #2a2d3e",
    borderRadius: "10px",
    padding: "11px 14px",
    fontSize: "14px",
    color: "#E6F1FB",
    outline: "none",
    boxSizing: "border-box"
  };

  return (
    <main style={{ background: "#0f1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ width: "48px", height: "48px", background: "#378ADD", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <span style={{ color: "#E6F1FB", fontSize: "16px", fontWeight: "600" }}>PA</span>
          </div>
          <h1 style={{ color: "#E6F1FB", fontSize: "22px", fontWeight: "600", marginBottom: "6px" }}>Welcome Back</h1>
          <p style={{ color: "#85B7EB", fontSize: "14px" }}>Login to access your policies</p>
        </div>

        <div style={{ background: "#1a1d2e", border: "0.5px solid #2a2d3e", borderRadius: "16px", padding: "32px" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#B5D4F4", fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label style={{ color: "#B5D4F4", fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "6px" }}>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
          </div>

          {error && <p style={{ color: "#F09595", fontSize: "13px", margin: "10px 0" }}>{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              marginTop: "20px",
              width: "100%",
              background: loading ? "#185FA5" : "#378ADD",
              color: "#E6F1FB",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ textAlign: "center", color: "#85B7EB", fontSize: "13px", marginTop: "20px" }}>
            Don't have an account?{" "}
            <span onClick={() => router.push("/signup")} style={{ color: "#378ADD", cursor: "pointer" }}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}