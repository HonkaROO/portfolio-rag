from functools import lru_cache
from sentence_transformers import SentenceTransformer
from app.config import settings


@lru_cache
def get_model() -> SentenceTransformer:
    # Runs locally, no API cost. all-MiniLM-L6-v2 -> 384-dim vectors.
    return SentenceTransformer(settings.embedding_model)


def embed_text(text: str) -> list[float]:
    model = get_model()
    return model.encode(text, normalize_embeddings=True).tolist()
