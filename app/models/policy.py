from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    policy_name = Column(String, nullable=False)
    policy_type = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    extracted_text = Column(Text, nullable=True)
    status = Column(String, default="pending")

    coverage = relationship("Coverage", back_populates="policy")
    exclusions = relationship("Exclusion", back_populates="policy")
    claims = relationship("ClaimProcedure", back_populates="policy")
    premiums = relationship("Premium", back_populates="policy")
    terms = relationship("Term", back_populates="policy")
    risk = relationship("RiskAssessment", back_populates="policy")