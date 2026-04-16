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
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <span
        onClick={() => router.push("/upload")}
        className="text-blue-600 font-bold text-lg cursor-pointer hover:opacity-80"
      >
        Policy Analyzer
      </span>

      <div className="flex items-center gap-4">
        {username && (
          <span className="text-sm text-gray-600">
            👤 <span className="font-medium">{username}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-4 py-1.5 rounded-lg transition font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}