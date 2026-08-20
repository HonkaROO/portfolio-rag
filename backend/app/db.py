from functools import lru_cache
import chromadb
from app.config import settings

COLLECTION_NAME = "documents"


@lru_cache
def get_client() -> chromadb.ClientAPI:
    # Persists to disk locally for fast dev iteration (re-running the app
    # doesn't require re-ingesting every time). On Render's free tier the
    # filesystem is ephemeral and gets wiped on every deploy/restart, so
    # this directory won't survive in production - that's fine because
    # main.py re-ingests automatically on startup if the collection is
    # empty. See ingest.py.
    return chromadb.PersistentClient(path=settings.chroma_persist_dir)


@lru_cache
def get_collection():
    client = get_client()
    # Explicitly cosine space so `1 - distance` below matches the same
    # 0-1 similarity semantics the rest of the app (min_similarity, the
    # RAGTrace chunk_count/similarity display) was already built around.
    return client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},
    )