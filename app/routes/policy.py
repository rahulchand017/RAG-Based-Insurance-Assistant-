from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.policy import Policy
from app.models.coverage import Coverage
from app.models.exclusions import Exclusion
from app.models.claims import ClaimProcedure
from app.models.premiums import Premium
from app.models.terms import Term
from app.models.risk import RiskAssessment

router = APIRouter()

@router.get("/policy/{policy_id}")
async def get_policy(
    policy_id: int,
    db: Session = Depends(get_db)
):
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")

    coverages = db.query(Coverage).filter(Coverage.policy_id == policy_id).all()
    exclusions = db.query(Exclusion).filter(Exclusion.policy_id == policy_id).all()
    claims = db.query(ClaimProcedure).filter(ClaimProcedure.policy_id == policy_id).all()
    premiums = db.query(Premium).filter(Premium.policy_id == policy_id).all()
    terms = db.query(Term).filter(Term.policy_id == policy_id).all()
    risk = db.query(RiskAssessment).filter(RiskAssessment.policy_id == policy_id).first()

    return {
        "policy": {
            "id": policy.id,
            "policy_name": policy.policy_name,
            "policy_type": policy.policy_type,
            "upload_date": policy.upload_date,
            "status": policy.status
        },
        "coverage_sections": [
            {"id": c.id, "coverage_name": c.coverage_name, "coverage_limit": c.coverage_limit, "description": c.description}
            for c in coverages
        ],
        "exclusions": [
            {"id": e.id, "exclusion_description": e.exclusion_description, "severity": e.severity, "applies_to": e.applies_to}
            for e in exclusions
        ],
        "claim_procedures": [
            {"id": cl.id, "step_number": cl.step_number, "procedure_description": cl.procedure_description, "required_documents": cl.required_documents, "processing_time": cl.processing_time}
            for cl in claims
        ],
        "premiums": [
            {"id": p.id, "premium_amount": p.premium_amount, "payment_frequency": p.payment_frequency, "renewal_date": p.renewal_date, "additional_charges": p.additional_charges}
            for p in premiums
        ],
        "terms": [
            {"id": t.id, "term_description": t.term_description, "category": t.category, "impact_level": t.impact_level, "is_favorable": t.is_favorable}
            for t in terms
        ],
        "risk_assessment": {
            "overall_risk_score": risk.overall_risk_score,
            "favorable_aspects": risk.favorable_aspects,
            "unfavorable_aspects": risk.unfavorable_aspects,
            "regulatory_concerns": risk.regulatory_concerns,
            "family_impact": risk.family_impact,
            "assessed_at": risk.assessed_at
        } if risk else None
    }