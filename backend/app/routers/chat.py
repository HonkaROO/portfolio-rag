from fastapi import APIRouter, HTTPException
from app.runtime import current_model
from app.model_registry import MODEL_REGISTRY
from app.schemas import ChatRequest, ChatResponse, Source
from app.rag.retrieve import retrieve_chunks
from app.rag.generate import generate_answer

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if not req.question.strip():
        raise HTTPException(status_code=400, detail="question must not be empty")

    chunks = retrieve_chunks(req.question)
    if not chunks:
        return ChatResponse(
            answer="I don't have information on that yet — try asking about Christian's "
            "experience, projects, or skills, or reach out to him directly.",
            sources=[],
        )

    answer = generate_answer(req.question, chunks)
    return ChatResponse(
        answer=answer,
        sources=[Source(content=c["content"], similarity=c.get("similarity", 0.0)) for c in chunks],
    )
    
@router.post("/model/{model_name}")
def switch_model(model_name: str):
    global current_model

    if model_name not in MODEL_REGISTRY:
        raise HTTPException(400, "Unknown model")

    current_model = model_name

    return {
        "success": True,
        "current_model": current_model
    }
