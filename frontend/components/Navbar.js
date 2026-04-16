"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/login");
  }

  return (
    <nav style={{ background: "#1a1d2e", borderBottom: "0.5px solid #2a2d3e" }} className="px-8 py-4 flex items-center justify-between relative">

      <div
        onClick={() => router.push("/dashboard")}
        style={{ background: "#378ADD" }}
        className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition"
      >
        <span style={{ color: "#E6F1FB" }} className="text-xs font-medium">PA</span>
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <span style={{ color: "#E6F1FB", fontSize: "20px" }} className="font-semibold hover:opacity-80 transition">
          Policy Analyzer
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/dashboard")}
          style={{ color: "#85B7EB", border: "0.5px solid #2a2d3e", fontSize: "13px" }}
          className="bg-transparent px-4 py-1.5 rounded-full hover:opacity-70 transition"
        >
          My Policies
        </button>
        <button
          onClick={() => router.push("/upload")}
          style={{ color: "#B5D4F4", background: "#185FA5", border: "none", fontSize: "13px" }}
          className="px-4 py-1.5 rounded-full hover:opacity-80 transition"
        >
          + Upload
        </button>
        {username && (
          <div style={{ background: "#2a2d3e", border: "0.5px solid #3a3d4e" }} className="flex items-center gap-2 px-3 py-1.5 rounded-full">
            <div style={{ background: "#185FA5" }} className="w-6 h-6 rounded-full flex items-center justify-center">
              <span style={{ color: "#B5D4F4" }} className="text-xs font-medium">
                {username[0].toUpperCase()}
              </span>
            </div>
            <span style={{ color: "#B5D4F4" }} className="text-sm font-medium">{username}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{ color: "#85B7EB", border: "0.5px solid #3a3d4e", fontSize: "14px" }}
          className="bg-transparent px-4 py-1.5 rounded-full hover:opacity-70 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
