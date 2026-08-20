"""
Run once (and again whenever content.py changes) to (re)populate the local
Chroma collection with fresh embeddings.

    cd backend
    python -m app.ingest

Also runs automatically on server startup if the collection is empty
(see main.py) - Render's free tier filesystem is ephemeral, so production
can't rely on this having been run manually ahead of time.
"""

from app.db import get_collection
from app.rag.embed import embed_text
from app.content import CHUNKS


def run():
    collection = get_collection()

    existing = collection.get()
    if existing["ids"]:
        collection.delete(ids=existing["ids"])

    ids = [str(i) for i in range(len(CHUNKS))]
    embeddings = [embed_text(chunk) for chunk in CHUNKS]
    collection.add(ids=ids, embeddings=embeddings, documents=CHUNKS)

    print(f"Ingested {len(CHUNKS)} chunks into Chroma (collection: {collection.name}).")


if __name__ == "__main__":
    run()