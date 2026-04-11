from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class Exclusion(Base):
    __tablename__ = "exclusions"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    exclusion_description = Column(Text, nullable=False)
    severity = Column(String, default="medium")  # high, medium, low
    applies_to = Column(String, nullable=True)

    policy = relationship("Policy", back_populates="exclusions")