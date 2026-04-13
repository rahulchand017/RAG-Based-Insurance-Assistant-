from sqlalchemy.orm import Session
from app.models.policy import Policy
from app.models.coverage import Coverage
from app.models.exclusions import Exclusion
from app.models.terms import Term
from app.models.risk import RiskAssessment
from app.services.parsing_service import generate_risk_assessment


def save_risk_assessment(db: Session, policy_id: int, risk_data: dict) -> RiskAssessment:
    risk = RiskAssessment(
        policy_id=policy_id,
        overall_risk_score=risk_data.get("overall_risk_score"),
        favorable_aspects=risk_data.get("favorable_aspects"),
        unfavorable_aspects=risk_data.get("unfavorable_aspects"),
        regulatory_concerns=risk_data.get("regulatory_concerns"),
        family_impact=risk_data.get("family_impact")
    )
    db.add(risk)
    db.commit()
    db.refresh(risk)
    return risk


def calculate_and_save_risk(db: Session, policy_id: int) -> RiskAssessment:
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        return None

    coverages = db.query(Coverage).filter(Coverage.policy_id == policy_id).all()
    exclusions = db.query(Exclusion).filter(Exclusion.policy_id == policy_id).all()
    terms = db.query(Term).filter(Term.policy_id == policy_id).all()

    parsed_data = {
        "coverage_sections": [
            {"coverage_name": c.coverage_name, "coverage_limit": c.coverage_limit, "description": c.description}
            for c in coverages
        ],
        "exclusions": [
            {"exclusion_description": e.exclusion_description, "severity": e.severity}
            for e in exclusions
        ],
        "terms": [
            {"term_description": t.term_description, "impact_level": t.impact_level, "is_favorable": t.is_favorable}
            for t in terms
        ]
    }

    # blueprint — gemini risk assessment will activate once api key is added
    risk_data = generate_risk_assessment(policy.extracted_text, parsed_data)

    return save_risk_assessment(db, policy_id, risk_data)


def get_risk_assessment(db: Session, policy_id: int) -> RiskAssessment:
    return db.query(RiskAssessment).filter(RiskAssessment.policy_id == policy_id).first()