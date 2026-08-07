import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request

from app.config import settings

_hits: dict[str, deque] = defaultdict(deque)


def get_client_ip(request: Request) -> str:
    # Render (and most PaaS providers) sit behind a proxy, so the real
    # client IP arrives via X-Forwarded-For rather than request.client.
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def check_rate_limit(request: Request) -> None:
    ip = get_client_ip(request)
    now = time.time()
    window = _hits[ip]

    while window and now - window[0] > settings.rate_limit_window_seconds:
        window.popleft()

    if len(window) >= settings.rate_limit_max_requests:
        raise HTTPException(
            status_code=429,
            detail="Too many requests — please wait a moment before asking again.",
        )

    window.append(now)




def validate_question(question: str) -> str:
    question = question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="question must not be empty")
    if len(question) > settings.max_question_length:
        raise HTTPException(
            status_code=400,
            detail=f"question is too long (max {settings.max_question_length} characters)",
        )
    return question



_INJECTION_PATTERNS = [
    "ignore previous instructions",
    "ignore the above",
    "ignore all previous",
    "disregard your instructions",
    "disregard the system prompt",
    "you are now",
    "pretend you are",
    "pretend to be",
    "act as",
    "reveal your system prompt",
    "reveal your instructions",
    "what is your system prompt",
    "show me your prompt",
    "print your prompt",
    "repeat the words above",
    "repeat everything above",
    "new instructions:",
    "system:",
    "jailbreak",
    "developer mode",
    "override your",
    "forget your instructions",
    "forget everything",
]

INJECTION_RESPONSE = (
    "I can only answer questions about Christian's experience, projects, and skills — "
    "try asking about one of those instead."
)


def looks_like_injection(text: str) -> bool:
    lowered = text.lower()
    return any(pattern in lowered for pattern in _INJECTION_PATTERNS)