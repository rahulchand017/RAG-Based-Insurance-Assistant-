from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class ClaimProcedure(Base):
    __tablename__ = "claim_procedures"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    step_number = Column(Integer, nullable=False)
    procedure_description = Column(Text, nullable=False)
    required_documents = Column(Text, nullable=True)
    processing_time = Column(String, nullable=True)

    policy = relationship("Policy", back_populates="claims")