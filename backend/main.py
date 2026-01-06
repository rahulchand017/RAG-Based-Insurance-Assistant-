from fastapi import FastAPI
from routers import upload, qa

app = FastAPI(title="Insurance Policy LLM API")

# Register routes
app.include_router(upload.router)
app.include_router(qa.router)

@app.get("/")
def health_check():
    return {"status": "Backend running successfully"}
