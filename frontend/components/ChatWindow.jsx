"use client";

import { useState, useRef, useEffect } from "react";
import { chatWithPolicy } from "@/lib/api";

export default function ChatWindow({ policyId }) {
  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") return [
      { role: "ai", text: "Hi! Ask me anything about your insurance policy." }
    ];
    const saved = localStorage.getItem(`chat_${policyId}`);
    return saved ? JSON.parse(saved) : [
      { role: "ai", text: "Hi! Ask me anything about your insurance policy." }
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem(`chat_${policyId}`, JSON.stringify(messages));
    }
  }, [messages, policyId]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);
    try {
      const res = await chatWithPolicy(policyId, question);
      setMessages((prev) => [...prev, { role: "ai", text: res.answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div style={{ background: "#1a1d2e", border: "0.5px solid #2a2d3e", borderRadius: "16px", display: "flex", flexDirection: "column", height: "70vh" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%",
              padding: "12px 16px",
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: msg.role === "user" ? "#185FA5" : "#0f1117",
              border: msg.role === "user" ? "none" : "0.5px solid #2a2d3e",
              color: msg.role === "user" ? "#E6F1FB" : "#B5D4F4",
              fontSize: "14px",
              lineHeight: "1.6"
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "12px 16px",
              borderRadius: "16px 16px 16px 4px",
              background: "#0f1117",
              border: "0.5px solid #2a2d3e",
              color: "#85B7EB",
              fontSize: "14px"
            }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ borderTop: "0.5px solid #2a2d3e", padding: "16px", display: "flex", gap: "12px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about coverage, exclusions, claims..."
          style={{
            flex: 1,
            background: "#0f1117",
            border: "0.5px solid #2a2d3e",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "14px",
            color: "#E6F1FB",
            outline: "none"
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? "#185FA5" : "#378ADD",
            color: "#E6F1FB",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            opacity: loading || !input.trim() ? 0.6 : 1,
            transition: "opacity 0.2s"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}