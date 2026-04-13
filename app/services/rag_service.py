from google import genai
from sqlalchemy.orm import Session
from app.config.config import settings
from app.models.policy import Policy
from app.models.coverage import Coverage
from app.models.exclusions import Exclusion
from app.models.claims import ClaimProcedure
from app.models.premiums import Premium
from app.models.terms import Term
from app.models.risk import RiskAssessment

client = genai.Client(api_key=settings.GEMINI_API_KEY)



def build_policy_context(db: Session, policy_id: int) -> str:
    policy = db.query(Policy).filter(Policy.id == policy_id).first()
    if not policy:
        return ""

    coverages = db.query(Coverage).filter(Coverage.policy_id == policy_id).all()
    exclusions = db.query(Exclusion).filter(Exclusion.policy_id == policy_id).all()
    claims = db.query(ClaimProcedure).filter(ClaimProcedure.policy_id == policy_id).all()
    premiums = db.query(Premium).filter(Premium.policy_id == policy_id).all()
    terms = db.query(Term).filter(Term.policy_id == policy_id).all()
    risk = db.query(RiskAssessment).filter(RiskAssessment.policy_id == policy_id).first()

    context = f"""
    POLICY NAME: {policy.policy_name}
    POLICY TYPE: {policy.policy_type}

    COVERAGE SECTIONS:
    {chr(10).join([f"- {c.coverage_name}: limit {c.coverage_limit}, {c.description}" for c in coverages])}

    EXCLUSIONS:
    {chr(10).join([f"- [{e.severity.upper()}] {e.exclusion_description}" for e in exclusions])}

    CLAIM PROCEDURES:
    {chr(10).join([f"Step {c.step_number}: {c.procedure_description} | Docs: {c.required_documents} | Time: {c.processing_time}" for c in claims])}

    PREMIUMS AND CHARGES:
    {chr(10).join([f"- Amount: {p.premium_amount}, Frequency: {p.payment_frequency}, Renewal: {p.renewal_date}, Extra: {p.additional_charges}" for p in premiums])}

    TERMS AND CONDITIONS:
    {chr(10).join([f"- [{t.impact_level.upper()}] [{t.is_favorable.upper()}] {t.term_description}" for t in terms])}

    RISK ASSESSMENT:
    - Overall Risk Score: {risk.overall_risk_score if risk else 'not assessed yet'}
    - Favorable Aspects: {risk.favorable_aspects if risk else 'not assessed yet'}
    - Unfavorable Aspects: {risk.unfavorable_aspects if risk else 'not assessed yet'}
    - Regulatory Concerns: {risk.regulatory_concerns if risk else 'not assessed yet'}
    - Family Impact: {risk.family_impact if risk else 'not assessed yet'}
    """

    return context.strip()


def ask_policy_question(db: Session, policy_id: int, question: str) -> str:
    context = build_policy_context(db, policy_id)

    if not context:
        return "Policy not found. Please upload and analyze a policy first."

    prompt = f"""
    You are an intelligent insurance policy advisor helping a regular person 
    understand their insurance policy clearly and honestly.

    You have access to the full details of their insurance policy below.
    Answer the user's question based strictly on this policy data.
    Be clear, honest, and highlight anything that could negatively impact the user.
    If something is not covered in the policy data, say so clearly.
    Never make up information that is not in the policy.

    POLICY DATA:
    {context}

    USER QUESTION:
    {question}

    Answer in simple language that anyone can understand.
    """

    # blueprint — will activate once gemini api key is added
    response = client.models.generate_content(model="gemini-2.0-flash-lite", contents=prompt)
    return response.text.strip()