from pydantic import BaseModel

class ChatRequest(BaseModel):
    policy_id: int
    question: str

class ChatResponse(BaseModel):
    policy_id: int
    question: str
    answer: str