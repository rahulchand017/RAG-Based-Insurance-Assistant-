from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db

router = APIRouter()

@router.post("/analyze-policy/{policy_id}")
async def analyze_policy(
    policy_id: int,
    db: Session = Depends(get_db)
):
    # blueprint — parsing service + risk service will go here later
    return {
        "message": f"Policy {policy_id} analysis triggered",
        "status": "processing"
    }