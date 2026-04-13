"use client";

import { useParams, useRouter } from "next/navigation";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  const params = useParams();
  const policyId = params?.policyId;
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ask About Your Policy</h1>
            <p className="text-sm text-gray-500">Policy #{policyId}</p>
          </div>
          <button
            onClick={() => router.push(`/results/${policyId}`)}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Results
          </button>
        </div>

        <ChatWindow policyId={policyId} />
      </div>
    </main>
  );
}
