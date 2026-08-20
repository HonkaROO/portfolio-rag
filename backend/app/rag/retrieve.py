from typing import Any

from ..db import get_collection
from .embed import embed_documents, embed_query


# =========================================================
# Collection
# =========================================================

def get_rag_collection():
    """
    Return the ChromaDB collection used by Honka.
    """

    return get_collection()


# =========================================================
# Add documents
# =========================================================

def add_documents(
    documents: list[str],
    ids: list[str],
    metadatas: list[dict[str, Any]] | None = None,
) -> None:
    """
    Add documents and their embeddings to ChromaDB.
    """

    if not documents:
        return

    if len(documents) != len(ids):
        raise ValueError(
            "documents and ids must have the same length"
        )

    if metadatas is not None and len(metadatas) != len(documents):
        raise ValueError(
            "documents and metadatas must have the same length"
        )

    collection = get_rag_collection()

    embeddings = embed_documents(
        documents
    )

    collection.add(
        documents=documents,
        embeddings=embeddings,
        ids=ids,
        metadatas=metadatas,
    )


# =========================================================
# Clear collection
# =========================================================

def clear_collection() -> None:
    """
    Remove all existing documents from the collection.
    """

    collection = get_rag_collection()

    existing = collection.get()

    ids = existing.get("ids", [])

    if ids:
        collection.delete(
            ids=ids
        )


# =========================================================
# Collection count
# =========================================================

def get_document_count() -> int:
    """
    Return the number of documents currently stored.
    """

    collection = get_rag_collection()

    return collection.count()


# =========================================================
# Similarity search
# =========================================================

def retrieve_chunks(
    query: str,
    top_k: int = 5,
) -> list[dict[str, Any]]:
    """
    Retrieve the most relevant knowledge chunks from ChromaDB.
    """

    query = query.strip()

    if not query:
        return []

    if top_k <= 0:
        return []

    collection = get_rag_collection()

    if collection.count() == 0:
        return []

    query_embedding = embed_query(
        query
    )

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=min(
            top_k,
            collection.count(),
        ),
        include=[
            "documents",
            "metadatas",
            "distances",
        ],
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]
    ids = results.get("ids", [[]])[0]

    chunks: list[dict[str, Any]] = []

    for index, document in enumerate(documents):

        metadata = (
            metadatas[index]
            if index < len(metadatas)
            else {}
        )

        distance = (
            distances[index]
            if index < len(distances)
            else None
        )

        document_id = (
            ids[index]
            if index < len(ids)
            else None
        )

        chunks.append(
            {
                "id": document_id,
                "content": document,
                "metadata": metadata,
                "distance": distance,
            }
        )

    return chunks