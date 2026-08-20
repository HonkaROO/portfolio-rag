from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import chat
from app.db import get_collection
from app import ingest

app = FastAPI(title="Gumanit Portfolio RAG API")

print("ALLOWED_ORIGINS =", settings.allowed_origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.allowed_origins.split(",")],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def ensure_ingested():
    # Render's free tier filesystem is ephemeral - a persisted Chroma
    # directory from a previous deploy won't be there after a redeploy or
    # restart. Re-ingest automatically if the collection is empty instead
    # of requiring a manual step in production; the corpus is tiny so
    # this costs well under a second.
    collection = get_collection()
    if collection.count() == 0:
        print("Chroma collection is empty - running ingest...")
        ingest.run()
    else:
        print(f"Chroma collection already has {collection.count()} chunks.")


app.include_router(chat.router)


@app.get("/health")
def health():
    return {"status": "ok"}