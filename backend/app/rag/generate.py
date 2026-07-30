import requests

from app.config import settings
from app.model_registry import (
    MODEL_REGISTRY,
    get_supported_models,
    get_supported_providers,
)
from app.runtime import current_model


SYSTEM_PROMPT = (
    "You are Honka, an AI assistant embedded in Christian Paul Gumanit's portfolio. "
    "Your primary purpose is to answer questions about Christian using ONLY the supplied "
    "resume context and the runtime information provided. "
    "If asked about yourself, your model, the AI stack, or how this chatbot is built, "
    "use the runtime information supplied in the prompt. "
    "Never fabricate information. "
    "If the answer cannot be found in either the runtime information or the resume context, "
    "clearly state that you don't have that information. "
    "Keep responses concise (2-4 sentences), professional, and always refer to Christian in the third person."
)


def build_prompt(question: str, chunks: list[dict], model_info) -> str:
    supported_models = "\n".join(
        f"- {model['name']} ({model['provider']})"
        for model in get_supported_models()
    )

    supported_providers = "\n".join(
        f"- {provider}"
        for provider in get_supported_providers()
    )

    context = "\n\n".join(
        f"- {chunk['content']}" for chunk in chunks
    )

    runtime_context = f"""
Chatbot Runtime Information

Current Provider:
{model_info.provider.title()}

Current Model:
{model_info.model}

Architecture:
- FastAPI backend
- React + Vite frontend
- Supabase Vector Search
- Retrieval-Augmented Generation (RAG)
- Sentence Transformers embeddings

Supported AI Providers:
{supported_providers}

Supported Models:
{supported_models}

Implementation Notes:
Christian intentionally designed this chatbot with a provider registry that allows
switching between multiple AI providers by changing configuration only. The retrieval
pipeline, vector search, and backend logic remain unchanged regardless of the selected model.
""".strip()


    return f"""
{runtime_context}

----------------------------------------

Resume Context:
{context}

----------------------------------------

User Question:
{question}

Instructions:
- Answer using ONLY the runtime information and resume context above.
- Never invent information.
- If asked about the AI model or architecture, answer using the runtime information.
- If asked about Christian's experience, answer using the resume context.
- If the information is unavailable, say so.
- Keep the response concise.
""".strip()


def generate_answer(question: str, chunks: list[dict]) -> str:
    model_info = MODEL_REGISTRY.get(current_model)

    if model_info is None:
        supported = ", ".join(MODEL_REGISTRY.keys())
        raise ValueError(
            f"Unsupported model '{settings.llm_model}'. "
            f"Supported models: {supported}"
        )

    prompt = build_prompt(question, chunks, model_info)

    if model_info.provider == "groq":
        return _generate_groq(prompt, model_info.model)

    if model_info.provider == "gemini":
        return _generate_gemini(prompt, model_info.model)

    if model_info.provider == "azure":
        return _generate_azure(prompt, model_info)

    raise ValueError(f"Unsupported provider: {model_info.provider}")


def _generate_groq(prompt: str, model: str) -> str:
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.groq_api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": model,
            "messages": [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            "temperature": 0.3,
            "max_tokens": 300,
        },
        timeout=30,
    )

    response.raise_for_status()

    return response.json()["choices"][0]["message"]["content"].strip()


def _generate_gemini(prompt: str, model: str) -> str:
    response = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        params={
            "key": settings.gemini_api_key,
        },
        headers={
            "Content-Type": "application/json",
        },
        json={
            "systemInstruction": {
                "parts": [
                    {
                        "text": SYSTEM_PROMPT,
                    }
                ]
            },
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt,
                        }
                    ]
                }
            ],
        },
        timeout=30,
    )

    response.raise_for_status()

    return response.json()["candidates"][0]["content"]["parts"][0]["text"].strip()


def _generate_azure(prompt: str, model_info) -> str:
    response = requests.post(
        f"{model_info.endpoint}/chat/completions",
        headers={
            "api-key": settings.azure_api_key,
            "Content-Type": "application/json",
        },
        json={
            "model": model_info.model,
            "messages": [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            "temperature": 0.3,
            "max_tokens": 300,
        },
        timeout=30,
    )

    response.raise_for_status()

    return response.json()["choices"][0]["message"]["content"].strip()