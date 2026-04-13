from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.risk_service import calculate_and_save_risk

router = APIRouter()

@router.post("/analyze-policy/{policy_id}")
async def analyze_policy(
    policy_id: int,
    db: Session = Depends(get_db)
):
    risk = calculate_and_save_risk(db, policy_id)
    if not risk:
        raise HTTPException(status_code=404, detail="Policy not found")

    return {
        "policy_id": policy_id,
        "overall_risk_score": risk.overall_risk_score,
        "favorable_aspects": risk.favorable_aspects,
        "unfavorable_aspects": risk.unfavorable_aspects,
        "regulatory_concerns": risk.regulatory_concerns,
        "family_impact": risk.family_impact,
        "assessed_at": risk.assessed_at
    }