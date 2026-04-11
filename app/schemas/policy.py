from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PolicyCreate(BaseModel):
    policy_name: str
    policy_type: str

class PolicyResponse(BaseModel):
    id: int
    policy_name: str
    policy_type: str
    upload_date: datetime
    status: str

    class Config:
        from_attributes = True