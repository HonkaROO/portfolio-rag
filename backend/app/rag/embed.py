from functools import lru_cache
import requests

from app.config import settings
from app.model_registry import EMBEDDING_REGISTRY


@lru_cache
def get_model():
    # For now we only support Azure embeddings
    return EMBEDDING_REGISTRY["azure"]


@lru_cache
def get_headers():
    return {
        "api-key": settings.azure_api_key,
        "Content-Type": "application/json",
    }


def embed_text(text: str) -> list[float]:
    """
    Generate embeddings using the configured embedding provider.
    """

    model_info = get_model()

    response = requests.post(
        model_info.endpoint,
        headers=get_headers(),
        json={
            "model": model_info.model,
            "input": text,
        },
        timeout=30,
    )

    response.raise_for_status()

    body = response.json()

    return body["data"][0]["embedding"]