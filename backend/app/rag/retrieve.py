from app.db import get_collection
from app.rag.embed import embed_text
from app.config import settings


def retrieve_chunks(question: str) -> list[dict]:
    """Embed the question and run a cosine-similarity search against the
    local Chroma collection, then drop the result entirely if even the
    best match isn't actually relevant - this is what lets the caller
    skip the LLM call rather than generating an answer that isn't
    grounded in real context."""
    collection = get_collection()
    query_embedding = embed_text(question)

    result = collection.query(
        query_embeddings=[query_embedding],
        n_results=settings.match_count,
    )

    documents = result.get("documents") or [[]]
    distances = result.get("distances") or [[]]

    # Chroma returns cosine *distance* (0 = identical); convert to the same
    # 0-1 similarity scale the rest of the app expects.
    chunks = [
        {"content": doc, "similarity": 1 - dist}
        for doc, dist in zip(documents[0], distances[0])
    ]
    return _filter_low_confidence(chunks)


def _filter_low_confidence(chunks: list[dict]) -> list[dict]:
    if not chunks:
        return []
    top_score = chunks[0].get("similarity", 0)
    if top_score < settings.min_similarity:
        # Best match still isn't close enough to be useful - treat this
        # exactly like "no results" so the router skips generation.
        return []
    return chunks