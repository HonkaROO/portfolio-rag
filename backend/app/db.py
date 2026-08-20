from pathlib import Path

import chromadb


# =========================================================
# ChromaDB configuration
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

CHROMA_DIR = BASE_DIR / "chroma_db"

COLLECTION_NAME = "honka_resume"


# =========================================================
# ChromaDB client
# =========================================================

_client = chromadb.PersistentClient(
    path=str(CHROMA_DIR)
)


# =========================================================
# Collection
# =========================================================

collection = _client.get_or_create_collection(
    name=COLLECTION_NAME,
    metadata={
        "description": "Honka portfolio RAG knowledge base",
    },
)


def get_collection():
    """
    Return the Honka ChromaDB collection.
    """

    return collection


def reset_collection() -> None:
    """
    Delete and recreate the ChromaDB collection.

    Useful during development/re-ingestion.
    """

    global collection

    try:
        _client.delete_collection(
            name=COLLECTION_NAME
        )
    except Exception:
        pass

    collection = _client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={
            "description": "Honka portfolio RAG knowledge base",
        },
    )