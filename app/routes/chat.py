from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    # blueprint — rag service will go here later
    return {
        "policy_id": request.policy_id,
        "question": request.question,
        "answer": "RAG chatbot answer will appear here"
    }