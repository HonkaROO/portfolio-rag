"""
Run once (and again whenever content.py changes) to (re)populate the
`documents` table in Supabase with fresh embeddings.

    cd backend
    python -m app.ingest
"""

from app.db import get_client
from app.rag.embed import embed_text
from app.content import CHUNKS


def run():
    client = get_client()
    client.table("documents").delete().neq("id", 0).execute()  # clear old rows

    rows = [{"content": chunk, "embedding": embed_text(chunk)} for chunk in CHUNKS]
    client.table("documents").insert(rows).execute()
    print(f"Ingested {len(rows)} chunks into Supabase.")


if __name__ == "__main__":
    run()
