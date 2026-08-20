from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.runtime import generate_answer
from app.schemas import ChatRequest


app = FastAPI(
    title="Honka Portfolio RAG API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "Honka Portfolio RAG API",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


@app.post("/chat")
async def chat(request: ChatRequest):

    answer = await generate_answer(
        request.question
    )

    return {
        "answer": answer
    }