from sentence_transformers import SentenceTransformer


# =========================================================
# Embedding model
# =========================================================

MODEL_NAME = "all-MiniLM-L6-v2"


_model = SentenceTransformer(
    MODEL_NAME
)


# =========================================================
# Single text embedding
# =========================================================

def embed_text(text: str) -> list[float]:
    """
    Convert a single piece of text into an embedding vector.
    """

    embedding = _model.encode(
        text,
        normalize_embeddings=True,
    )

    return embedding.tolist()


# =========================================================
# Multiple text embeddings
# =========================================================

def embed_documents(
    documents: list[str],
) -> list[list[float]]:
    """
    Convert multiple documents into embedding vectors.
    """

    if not documents:
        return []

    embeddings = _model.encode(
        documents,
        normalize_embeddings=True,
    )

    return embeddings.tolist()


# =========================================================
# Query embedding
# =========================================================

def embed_query(
    query: str,
) -> list[float]:
    """
    Convert a user query into an embedding vector.

    Uses the same model as document embeddings.
    """

    return embed_text(query)