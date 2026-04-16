const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function uploadPolicy(file, policyName, policyType) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("policy_name", policyName);
  formData.append("policy_type", policyType);

  const res = await fetch(`${BASE_URL}/upload-policy`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload policy");
  return res.json();
}

export async function analyzePolicy(policyId) {
  const res = await fetch(`${BASE_URL}/analyze-policy/${policyId}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to analyze policy");
  return res.json();
}

export async function getPolicy(policyId) {
  const res = await fetch(`${BASE_URL}/policy/${policyId}`);

  if (!res.ok) throw new Error("Failed to fetch policy");
  return res.json();
}

export async function chatWithPolicy(policyId, question) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ policy_id: policyId, question }),
  });

  if (!res.ok) throw new Error("Failed to get answer");
  return res.json();
}

export async function registerUser(email, username, password) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Registration failed");
  }
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Login failed");
  }
  return res.json();
}

export async function getMyPolicies() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/my-policies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch policies");
  return res.json();
}

export async function deletePolicy(policyId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/policy/${policyId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete policy");
  return res.json();
}