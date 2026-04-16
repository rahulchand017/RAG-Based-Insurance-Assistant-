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
    <nav style={{ background: "#1a1d2e" }} className="px-8 py-4 flex items-center justify-between relative">

      <div className="w-32" />

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 cursor-pointer" onClick={() => router.push("/upload")}>
        <div style={{ background: "#378ADD" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
          <span style={{ color: "#E6F1FB" }} className="text-xs font-medium">PA</span>
        </div>
        <span style={{ color: "#E6F1FB", fontSize: "20px" }} className="font-semibold hover:opacity-80 transition">
          Policy Analyzer
        </span>
      </div>

      <div className="flex items-center gap-3">
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