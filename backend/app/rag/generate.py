import requests
from app.config import settings

SYSTEM_PROMPT = (
    "You are a helpful assistant embedded in Christian Paul Gumanit's portfolio site. "
    "Answer questions about his experience, projects, and skills using ONLY the provided "
    "context. If the context doesn't cover the question, say you don't have that detail "
    "and suggest contacting Christian directly. Keep answers concise (2-4 sentences) and "
    "speak about him in the third person."
)


def build_prompt(question: str, chunks: list[dict]) -> str:
    context = "\n\n".join(f"- {c['content']}" for c in chunks)
    return (
        f"Context from Christian's resume:\n{context}\n\n"
        f"Question: {question}\n\n"
        "Answer using only the context above."
    )


def generate_answer(question: str, chunks: list[dict]) -> str:
    prompt = build_prompt(question, chunks)
    if settings.llm_provider == "gemini":
        return _generate_gemini(prompt)
    return _generate_groq(prompt)


def _generate_groq(prompt: str) -> str:
    resp = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {settings.groq_api_key}"},
        json={
            "model": "llama-3.1-8b-instant",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.3,
            "max_tokens": 300,
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["choices"][0]["message"]["content"].strip()


def _generate_gemini(prompt: str) -> str:
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{settings.gemini_model}:generateContent"
    )

    resp = requests.post(
        url,
        params={"key": settings.gemini_api_key},
        json={
            "systemInstruction": {
                "parts": [{"text": SYSTEM_PROMPT}]
            },
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ],
        },
        timeout=30,
    )

    resp.raise_for_status()

    return resp.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
