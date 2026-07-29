from app.db import get_client
from app.rag.embed import embed_text
from app.config import settings


def retrieve_chunks(question: str) -> list[dict]:
    """Embed the question and run cosine-similarity search via the
    match_documents() Postgres function (see supabase/schema.sql)."""
    query_embedding = embed_text(question)
    client = get_client()
    result = client.rpc(
        "match_documents",
        {
            "query_embedding": query_embedding,
            "match_count": settings.match_count,
        },
    ).execute()
    return result.data or []
