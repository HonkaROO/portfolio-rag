from app.db import get_client
from app.rag.embed import embed_text
from app.config import settings


def retrieve_chunks(question: str) -> list[dict]:
    """Embed the question and run cosine-similarity search via the
    match_documents() Postgres function (see supabase/schema.sql), then
    drop the result entirely if even the best match isn't actually
    relevant - this is what lets the caller skip the LLM call rather than
    generating an answer that isn't grounded in real context."""
    query_embedding = embed_text(question)
    client = get_client()
    result = client.rpc(
        "match_documents",
        {
            "query_embedding": query_embedding,
            "match_count": settings.match_count,
        },
    ).execute()
    chunks = result.data or []
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