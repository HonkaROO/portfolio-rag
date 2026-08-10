import json
import time

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse

from app.runtime import current_model
from app.model_registry import MODEL_REGISTRY
from app.schemas import ChatRequest, ChatResponse, Source
from app.rag.retrieve import retrieve_chunks
from app.rag.generate import generate_answer, LLMProviderError
from app.security import (
    check_rate_limit,
    validate_question,
    looks_like_injection,
    INJECTION_RESPONSE,
)

router = APIRouter()

NO_CONTEXT_ANSWER = (
    "I don't have information on that yet — try asking about Christian's "
    "experience, projects, or skills, or reach out to him directly."
)


# -----------------------------------------------------------
# Runtime Model Identification
# These questions bypass RAG, embeddings, and the LLM entirely.
# -----------------------------------------------------------

MODEL_QUERY_KEYWORDS = [
    "what model",
    "which model",
    "what ai model",
    "which ai model",
    "what llm",
    "which llm",
    "what provider",
    "which provider",
    "what are you running",
    "what model are you using",
    "which model are you using",
    "who powers you",
]

PORTFOLIO_QUERY_KEYWORDS = [
    "what is this website",
    "what is this site",
    "what is this portfolio",
    "what's this website",
    "what's this site",
    "what's this portfolio",
    "what is this website about",
    "what is this site about",
    "what is this portfolio about",
    "what's this website about",
    "what's this site about",
    "what's this portfolio about",
    "tell me about this website",
    "tell me about this site",
    "tell me about this portfolio",
    "what is this chatbot",
    "what's this chatbot",
    "how does this chatbot work",
    "how does this ai work",
    "what is this ai",
    "who is christian",
    "tell me about christian",
    "about christian",
]

def is_model_query(question: str) -> bool:
    q = question.lower().strip()
    
    return any(
        keyword in q
        for keyword in MODEL_QUERY_KEYWORDS
    )
    
def is_portfolio_query(question: str) -> str:
    q = question.lower().strip()
    
    return any(
        keyword in q
        for keyword in PORTFOLIO_QUERY_KEYWORDS
    )

def model_query_response(question: str) -> str | None:
    q = question.lower()

    if any(keyword in q for keyword in MODEL_QUERY_KEYWORDS):
        model = MODEL_REGISTRY[current_model]

        return (
            f"I'm currently running **{model.model}** "
            f"via **{model.provider.title()}**.\n\n"
            "This portfolio supports live model switching between "
            "Groq, Google Gemini, and Azure AI Foundry."
        )

    return None

def portfolio_query_response(question: str) -> str:
    return (
        "This is Christian Paul Gumanit's personal portfolio website. "
        "It showcases his experience as a Software Engineer, his "
        "projects, certifications, technical skills, and work involving "
        "AI, web development, cloud technologies, and project management.\n\n"
        "The website also features Honka, an AI-powered RAG chatbot "
        "that can answer questions about Christian using information "
        "from his portfolio and resume."
    )

@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest, request: Request):
    check_rate_limit(request)

    question = validate_question(req.question)

    # 1. Runtime/model information
    # Deterministic response — does not consume an LLM call.
    model_answer = model_query_response(question)

    if model_answer:
        return ChatResponse(
            answer=model_answer,
            sources=[],
        )

    # 2. Safe portfolio/site information
    # Deterministic response — does not consume an LLM call.
    if is_portfolio_query(question):
        return ChatResponse(
            answer=portfolio_query_response(question),
            sources=[],
        )

    # 3. Security guardrail
    if looks_like_injection(question):
        return ChatResponse(
            answer=INJECTION_RESPONSE,
            sources=[],
        )

    # 4. RAG retrieval
    try:
        chunks = retrieve_chunks(question)
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="The knowledge base is temporarily unavailable.",
        ) from exc

    # 5. No relevant context
    if not chunks:
        return ChatResponse(
            answer=NO_CONTEXT_ANSWER,
            sources=[],
        )

    # 6. Generate using currently selected model
    try:
        answer = generate_answer(question, chunks)
    except LLMProviderError as exc:
        raise HTTPException(
            status_code=exc.status_code,
            detail=exc.message,
        ) from exc

    return ChatResponse(
        answer=answer,
        sources=[
            Source(
                content=c["content"],
                similarity=c.get("similarity", 0.0),
            )
            for c in chunks
        ],
    )
    
def _sse(stage: str, **payload) -> str:
    """
    One Server-Sent Event frame.

    Each stage the frontend's RAGTrace widget lights up corresponds exactly
    to one of these being sent.
    """
    return f"data: {json.dumps({'stage': stage, **payload})}\n\n"


def _stream_chat(question: str):
    t_start = time.perf_counter()

    yield _sse("query")

    # 1. Runtime/model information
    # Deterministic response — no embedding, Supabase, or LLM call.
    model_answer = model_query_response(question)

    if model_answer:
        yield _sse(
            "respond",
            elapsed_ms=round(
                (time.perf_counter() - t_start) * 1000
            ),
            answer=model_answer,
            sources=[],
            model=current_model,
        )
        return

    # 2. Safe portfolio/site information
    # Deterministic response — no embedding, Supabase, or LLM call.
    if is_portfolio_query(question):
        yield _sse(
            "respond",
            elapsed_ms=round(
                (time.perf_counter() - t_start) * 1000
            ),
            answer=portfolio_query_response(question),
            sources=[],
            model=current_model,
        )
        return

    # 3. Security guardrail
    if looks_like_injection(question):
        yield _sse(
            "respond",
            elapsed_ms=round(
                (time.perf_counter() - t_start) * 1000
            ),
            answer=INJECTION_RESPONSE,
            sources=[],
            model=current_model,
        )
        return

    # 4. RAG retrieval
    try:
        t0 = time.perf_counter()

        chunks = retrieve_chunks(question)

        retrieve_ms = round(
            (time.perf_counter() - t0) * 1000
        )

    except Exception:
        yield _sse(
            "error",
            message="The knowledge base is temporarily unavailable.",
        )
        return

    yield _sse(
        "retrieve",
        elapsed_ms=retrieve_ms,
        chunk_count=len(chunks),
    )

    # 5. No relevant context
    if not chunks:
        yield _sse(
            "respond",
            elapsed_ms=round(
                (time.perf_counter() - t_start) * 1000
            ),
            answer=NO_CONTEXT_ANSWER,
            sources=[],
            model=current_model,
        )
        return

    # 6. Generate using currently selected model
    yield _sse("generate")

    t1 = time.perf_counter()

    try:
        answer = generate_answer(question, chunks)

    except LLMProviderError as exc:
        yield _sse(
            "error",
            message=exc.message,
            provider=exc.provider,
        )
        return

    generate_ms = round(
        (time.perf_counter() - t1) * 1000
    )

    yield _sse(
        "respond",
        elapsed_ms=round(
            (time.perf_counter() - t_start) * 1000
        ),
        generate_ms=generate_ms,
        answer=answer,
        sources=[
            {
                "content": c["content"],
                "similarity": c.get("similarity", 0.0),
            }
            for c in chunks
        ],
        model=current_model,
    )

@router.post("/chat/stream")
def chat_stream(req: ChatRequest, request: Request):
    check_rate_limit(request)

    question = validate_question(req.question)

    return StreamingResponse(
        _stream_chat(question),
        media_type="text/event-stream",
    )


@router.post("/model/{model_name}")
def switch_model(model_name: str):
    global current_model

    if model_name not in MODEL_REGISTRY:
        raise HTTPException(
            status_code=400,
            detail="Unknown model",
        )

    current_model = model_name

    return {
        "success": True,
        "current_model": current_model,
    }