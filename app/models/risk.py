from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.database import Base

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    overall_risk_score = Column(Float, nullable=True)
    favorable_aspects = Column(Text, nullable=True)
    unfavorable_aspects = Column(Text, nullable=True)
    regulatory_concerns = Column(Text, nullable=True)
    family_impact = Column(Text, nullable=True)
    assessed_at = Column(DateTime, default=datetime.utcnow)

    policy = relationship("Policy", back_populates="risk")