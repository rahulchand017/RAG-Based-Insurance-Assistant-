from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class Premium(Base):
    __tablename__ = "premiums"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    premium_amount = Column(Float, nullable=False)
    payment_frequency = Column(String, nullable=True)  # monthly, annual
    renewal_date = Column(String, nullable=True)
    additional_charges = Column(String, nullable=True)

    policy = relationship("Policy", back_populates="premiums")