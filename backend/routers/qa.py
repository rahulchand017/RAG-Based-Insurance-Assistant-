from fastapi import APIRouter

router = APIRouter(
    prefix="/qa",
    tags=["Q&A"]
)

@router.get("/")
def test_qa():
    return {"message": "QA route working"}
