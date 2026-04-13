from google import genai
import json
from app.config.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def parse_policy_with_gemini(extracted_text: str) -> dict:
    prompt = f"""
    You are an expert insurance policy analyzer.
    Analyze the following insurance policy text and extract structured information.
    
    Return ONLY a valid JSON object with exactly this structure, nothing else:
    {{
        "policy_name": "name of the policy",
        "policy_type": "health or car or life or other",
        "coverage_sections": [
            {{
                "coverage_name": "name of coverage",
                "coverage_limit": 0.0,
                "description": "what is covered"
            }}
        ],
        "exclusions": [
            {{
                "exclusion_description": "what is excluded",
                "severity": "high or medium or low",
                "applies_to": "which coverage it applies to"
            }}
        ],
        "claim_procedures": [
            {{
                "step_number": 1,
                "procedure_description": "what to do",
                "required_documents": "list of documents needed",
                "processing_time": "estimated time"
            }}
        ],
        "premiums": [
            {{
                "premium_amount": 0.0,
                "payment_frequency": "monthly or annual",
                "renewal_date": "date if mentioned",
                "additional_charges": "any extra charges"
            }}
        ],
        "terms": [
            {{
                "term_description": "the actual clause or condition",
                "category": "payment or coverage or cancellation or other",
                "impact_level": "high or medium or low",
                "is_favorable": "favorable or unfavorable or unknown"
            }}
        ]
    }}
    
    Insurance Policy Text:
    {extracted_text}
    """

    response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
    raw = response.text.strip()

    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]

    return json.loads(raw.strip())


def generate_risk_assessment(extracted_text: str, parsed_data: dict) -> dict:
    prompt = f"""
    You are an expert insurance risk analyst.
    Based on the insurance policy below, generate a risk assessment.
    
    Return ONLY a valid JSON object with exactly this structure, nothing else:
    {{
        "overall_risk_score": 0.0,
        "favorable_aspects": "summary of what benefits the policyholder",
        "unfavorable_aspects": "summary of hidden risks or bad clauses",
        "regulatory_concerns": "any clauses that seem to bypass regulations",
        "family_impact": "how this policy impacts the policyholder and family"
    }}
    
    overall_risk_score should be between 0.0 and 10.0 where:
    0-3 = low risk, good policy
    4-6 = medium risk, average policy
    7-10 = high risk, concerning policy
    
    Policy Text:
    {extracted_text}
    
    Parsed Policy Data:
    {parsed_data}
    """

    response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
    raw = response.text.strip()

    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]

    return json.loads(raw.strip())