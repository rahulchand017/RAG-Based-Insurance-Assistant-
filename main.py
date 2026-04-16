from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import Base, engine
from app.models import policy, coverage, exclusions, claims, premiums, terms, risk, user
from app.routes import upload, analyze, policy as policy_route, chat
from app.routes import auth_routes as auth


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Insurance Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(analyze.router)
app.include_router(policy_route.router)
app.include_router(chat.router)
app.include_router(auth.router)
