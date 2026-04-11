from pydantic import BaseModel
from typing import Optional

class CoverageCreate(BaseModel):
    policy_id: int
    coverage_name: str
    coverage_limit: Optional[float] = None
    description: Optional[str] = None

class CoverageResponse(BaseModel):
    id: int
    policy_id: int
    coverage_name: str
    coverage_limit: Optional[float]
    description: Optional[str]

    class Config:
        from_attributes = True