from typing import Any

from app.config import settings
from app.model_registry import MODEL_REGISTRY
from app.rag.retrieve import retrieve_chunks


current_model = settings.llm_model


def get_current_model() -> str:
    """
    Return the currently configured LLM model.
    """
    return current_model


def set_current_model(model_name: str) -> None:
    """
    Change the currently active model.

    The model must exist in MODEL_REGISTRY.
    """
    global current_model

    if model_name not in MODEL_REGISTRY:
        raise ValueError(
            f"Unsupported model: {model_name}"
        )

    current_model = model_name


def get_model_info() -> Any:
    """
    Return information about the currently active model.
    """
    return MODEL_REGISTRY[current_model]


async def generate_answer(question: str) -> str:
    """
    Main RAG pipeline:

        question
            ↓
        ChromaDB retrieval
            ↓
        context
            ↓
        selected LLM
            ↓
        answer
    """

    # ---------------------------------------------
    # 1. Retrieve relevant knowledge from ChromaDB
    # ---------------------------------------------

    chunks = retrieve_chunks(question)

    if not chunks:
        context = "No relevant information was found in the knowledge base."
    else:
        context = "\n\n".join(chunks)

    # ---------------------------------------------
    # 2. Get currently selected model
    # ---------------------------------------------

    model_info = MODEL_REGISTRY[current_model]

    provider = model_info.provider
    model_name = model_info.model

    # ---------------------------------------------
    # 3. Build prompt
    # ---------------------------------------------

    prompt = f"""
You are Honka, an AI assistant for Christian Paul Gumanit's portfolio.

Answer the user's question using the provided portfolio context.

If the answer cannot be determined from the context, say that you
don't have enough information rather than inventing details.

Be concise, professional, and conversational.

PORTFOLIO CONTEXT:
{context}

USER QUESTION:
{question}
"""

    # ---------------------------------------------
    # 4. Generate using selected provider
    # ---------------------------------------------

    if provider == "groq":
        return await _generate_groq(prompt, model_name)

    if provider == "gemini":
        return await _generate_gemini(prompt, model_name)

    if provider == "azure":
        return await _generate_azure(prompt, model_info)

    raise ValueError(
        f"Unsupported provider: {provider}"
    )


async def _generate_groq(
    prompt: str,
    model_name: str,
) -> str:

    from groq import AsyncGroq

    client = AsyncGroq(
        api_key=settings.groq_api_key
    )

    response = await client.chat.completions.create(
        model=model_name,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response.choices[0].message.content or ""


async def _generate_gemini(
    prompt: str,
    model_name: str,
) -> str:

    from google import genai

    client = genai.Client(
        api_key=settings.gemini_api_key
    )

    response = await client.aio.models.generate_content(
        model=model_name,
        contents=prompt,
    )

    return response.text or ""


async def _generate_azure(
    prompt: str,
    model_info: Any,
) -> str:

    from openai import AsyncOpenAI

    client = AsyncOpenAI(
        api_key=settings.azure_api_key,
        base_url=settings.azure_endpoint,
    )

    response = await client.chat.completions.create(
        model=model_info.model,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response.choices[0].message.content or ""