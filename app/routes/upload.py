from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.policy import PolicyResponse

router = APIRouter()

@router.post("/upload-policy", response_model=PolicyResponse)
async def upload_policy(
    file: UploadFile = File(...),
    policy_name: str = "My Policy",
    policy_type: str = "health",
    db: Session = Depends(get_db)
):
    # blueprint — extraction service will go here later
    return {
        "id": 1,
        "policy_name": policy_name,
        "policy_type": policy_type,
        "upload_date": "2024-01-01T00:00:00",
        "status": "pending"
    }