from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class Coverage(Base):
    __tablename__ = "coverage_sections"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    coverage_name = Column(String, nullable=False)
    coverage_limit = Column(Float, nullable=True)
    description = Column(Text, nullable=True)

    policy = relationship("Policy", back_populates="coverage")