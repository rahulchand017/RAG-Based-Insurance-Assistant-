from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.rag_service import ask_policy_question

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    answer = ask_policy_question(db, request.policy_id, request.question)
    return {
        "policy_id": request.policy_id,
        "question": request.question,
        "answer": answer
    }