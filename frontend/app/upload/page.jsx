"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadZone from "@/components/UploadZone";
import { uploadPolicy, analyzePolicy } from "@/lib/api";
import { useAuth } from "@/lib/auth";


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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Insurance Policy Analyzer</h1>
        <p className="text-gray-500 text-sm mb-6">Upload your policy PDF to get a detailed breakdown</p>

        <UploadZone file={file} setFile={setFile} />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Policy Name</label>
          <input
            type="text"
            placeholder="e.g. Max Bupa Health Plan"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
          <select
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="health">Health</option>
            <option value="life">Life</option>
            <option value="vehicle">Vehicle</option>
            <option value="home">Home</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Uploading & Analyzing..." : "Analyze Policy"}
        </button>
      </div>
    </main>
  );
}
