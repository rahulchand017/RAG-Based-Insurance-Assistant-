"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPolicy } from "@/lib/api";
import PolicyTabs from "@/components/PolicyTabs";

export default function ResultsPage() {
  const { policyId } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPolicy(policyId)
      .then(setData)
      .catch(() => setError("Failed to load policy data."));
  }, [policyId]);

  if (error) return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">{error}</p>
    </main>
  );

  if (!data) return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading policy...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{data.policy.policy_name}</h1>
            <p className="text-sm text-gray-500 capitalize">{data.policy.policy_type} Policy · {data.policy.status}</p>
          </div>
          <button
            onClick={() => router.push(`/chat/${policyId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            💬 Ask AI
          </button>
        </div>

        <PolicyTabs data={data} />
      </div>
    </main>
  );
}
