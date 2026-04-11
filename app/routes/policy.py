from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db

router = APIRouter()

@router.get("/policy/{policy_id}")
async def get_policy(
    policy_id: int,
    db: Session = Depends(get_db)
):
    # blueprint — will fetch full policy data from db later
    return {
        "policy_id": policy_id,
        "message": "policy data will appear here"
    }