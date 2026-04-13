from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.policy import Policy
from app.models.coverage import Coverage
from app.models.exclusions import Exclusion
from app.models.claims import ClaimProcedure
from app.models.premiums import Premium
from app.models.terms import Term
from app.services.extraction_service import extract_text_from_pdf
from app.services.parsing_service import parse_policy_with_gemini
from app.schemas.policy import PolicyResponse

router = APIRouter()

@router.post("/upload-policy", response_model=PolicyResponse)
async def upload_policy(
    file: UploadFile = File(...),
    policy_name: str = Form(...),
    policy_type: str = Form(...),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    file_bytes = await file.read()

    extracted_text = extract_text_from_pdf(file_bytes)
    if not extracted_text:
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")

    policy = Policy(
        policy_name=policy_name,
        policy_type=policy_type,
        extracted_text=extracted_text,
        status="processing"
    )
    db.add(policy)
    db.commit()
    db.refresh(policy)

    try:
        parsed = parse_policy_with_gemini(extracted_text)

        for c in parsed.get("coverage_sections", []):
            db.add(Coverage(
                policy_id=policy.id,
                coverage_name=c.get("coverage_name"),
                coverage_limit=c.get("coverage_limit"),
                description=c.get("description")
            ))

        for e in parsed.get("exclusions", []):
            db.add(Exclusion(
                policy_id=policy.id,
                exclusion_description=e.get("exclusion_description"),
                severity=e.get("severity", "medium"),
                applies_to=e.get("applies_to")
            ))

        for cl in parsed.get("claim_procedures", []):
            db.add(ClaimProcedure(
                policy_id=policy.id,
                step_number=cl.get("step_number"),
                procedure_description=cl.get("procedure_description"),
                required_documents=cl.get("required_documents"),
                processing_time=cl.get("processing_time")
            ))

        for p in parsed.get("premiums", []):
            db.add(Premium(
                policy_id=policy.id,
                premium_amount=p.get("premium_amount", 0.0),
                payment_frequency=p.get("payment_frequency"),
                renewal_date=p.get("renewal_date"),
                additional_charges=p.get("additional_charges")
            ))

        for t in parsed.get("terms", []):
            db.add(Term(
                policy_id=policy.id,
                term_description=t.get("term_description"),
                category=t.get("category"),
                impact_level=t.get("impact_level", "medium"),
                is_favorable=t.get("is_favorable", "unknown")
            ))

        policy.status = "processed"
        db.commit()
        db.refresh(policy)

    except Exception as ex:
        policy.status = "failed"
        db.commit()
        raise HTTPException(status_code=500, detail=f"Parsing failed: {str(ex)}")

    return policy