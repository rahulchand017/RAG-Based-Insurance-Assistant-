# RAG-Based Insurance Policy Analyzer

An AI-powered full-stack web application that helps users understand their insurance policies through intelligent analysis, risk scoring, and a conversational chatbot — built with FastAPI, Next.js, and Groq's Llama 3.3.

**Live Demo:** [rag-insurance-analyzer.vercel.app](https://rag-insurance-analyzer.vercel.app)  
**Backend API Docs:** [rag-based-insurance-analyzer.onrender.com/docs](https://rag-based-insurance-analyzer.onrender.com/docs)

---

## Why I Built This

Insurance policies are notoriously difficult to understand — filled with legal jargon, hidden exclusions, and complex terms. I built this tool to make policy analysis accessible to everyone. Upload your PDF, get a clean breakdown, and chat with an AI that actually knows your policy.

---

## Features

- PDF Upload and Parsing — Upload any insurance policy PDF and get instant structured insights
- 5-Tab Results View — Coverage, Exclusions, Premiums, Claims, and Risk Score
- AI Risk Scoring — Overall risk score out of 10 with favorable and unfavorable aspects
- RAG Chatbot — Ask natural language questions, answered strictly from your policy data
- Chat Memory — Conversation history persisted per policy using localStorage
- User Dashboard — View and manage all your uploaded policies in one place
- Policy Delete — Remove old policies from your dashboard
- JWT Authentication — Secure login and signup with token-based auth

---

## Architecture
<img width="564" height="485" alt="image" src="https://github.com/user-attachments/assets/c2f3afa2-c8cc-453a-8b58-93a9f5b06eda" />
---

## User Flow

<img width="566" height="575" alt="image" src="https://github.com/user-attachments/assets/24b89612-b890-4795-9fa6-edb664153010" />

---

## Tech Stack

**Backend**
- FastAPI
- SQLAlchemy + SQLite
- pdfplumber for PDF extraction
- Groq Llama 3.3-70B for AI parsing and RAG chat
- passlib + bcrypt for password hashing
- python-jose for JWT tokens

**Frontend**
- Next.js 14 with App Router
- Tailwind CSS
- localStorage for chat persistence

**Deployment**
- Vercel for frontend
- Render for backend

---

## Project Structure

---

## Local Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Groq API Key — free at [console.groq.com](https://console.groq.com)

### Backend

```bash
git clone https://github.com/rahulchand017/RAG_Based_Insurance_Analyzer.git
cd RAG_Based_Insurance_Analyzer

python -m venv venv
venv\Scripts\Activate.ps1   # Windows
source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt
```

Create a `.env` file:

```bash
uvicorn main:app --reload
# Runs at http://localhost:8000
# API docs at http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```bash
npm run dev
# Runs at http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /register | Create account |
| POST | /login | Login and get token |
| POST | /upload-policy | Upload PDF |
| POST | /analyze-policy/{id} | Run AI analysis |
| GET | /policy/{id} | Get full policy data |
| GET | /my-policies | Get user's policies |
| DELETE | /policy/{id} | Delete a policy |
| POST | /chat | Ask question via RAG |

---

## How RAG Works

1. User asks a question about their policy
2. Backend fetches all structured data for that policy from the database
3. The data is injected as context into the Groq prompt
4. Llama 3.3-70B answers based strictly on the policy — no hallucinations
5. Response is returned to the user in the chat UI

---

## Contact

**Rahul Chand**  
GitHub: [@rahulchand017](https://github.com/rahulchand017)

---

If you found this useful, consider giving it a star on GitHub.

