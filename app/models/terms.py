from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class Term(Base):
    __tablename__ = "terms_and_conditions"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    term_description = Column(Text, nullable=False)
    category = Column(String, nullable=True)  # payment, coverage, cancellation
    impact_level = Column(String, default="medium")  # high, medium, low
    is_favorable = Column(String, default="unknown")  # favorable, unfavorable, unknown

    policy = relationship("Policy", back_populates="terms")