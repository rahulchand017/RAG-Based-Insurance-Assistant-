from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class RiskResponse(BaseModel):
    id: int
    policy_id: int
    overall_risk_score: Optional[float]
    favorable_aspects: Optional[str]
    unfavorable_aspects: Optional[str]
    regulatory_concerns: Optional[str]
    family_impact: Optional[str]
    assessed_at: datetime

    class Config:
        from_attributes = True