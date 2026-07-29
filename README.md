# Gumanit Portfolio — Interactive RAG Chatbot

Personal portfolio with a RAG-powered chat assistant that answers questions about
the resume content on the page. Built entirely on free tiers.

```
frontend/   React + Vite + Tailwind + shadcn/ui
backend/    FastAPI — retrieval + generation
supabase/   Postgres schema (pgvector) for the vector store
```

## Architecture

React frontend (Vercel) → FastAPI backend (Render) → Supabase Postgres + pgvector
(similarity search) → Groq/Gemini free-tier LLM (answer generation).

Embeddings are generated locally with `sentence-transformers` (no API cost) at
ingest time and at query time.

## 1. Supabase (vector store)

1. Create a free project at supabase.com.
2. Open the SQL editor, paste and run `supabase/schema.sql`.
3. Grab your Project URL and `service_role` key from Project Settings → API.

## 2. Backend (FastAPI)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in SUPABASE_URL, SUPABASE_KEY, and an LLM key
```

Get a free LLM key from either:
- **Groq** (console.groq.com) — recommended, generous free rate limits
- **Gemini** (aistudio.google.com/apikey) — set `LLM_PROVIDER=gemini`

Ingest the resume content into Supabase (re-run any time `app/content.py` changes):

```bash
python -m app.ingest
```

Run locally:

```bash
uvicorn app.main:app --reload
```

Deploy to **Render** (free tier):
1. Push this repo to GitHub.
2. New Web Service → connect the repo → root directory `backend`.
3. Render reads `render.yaml` automatically, or set build/start commands manually:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add the env vars from `.env.example` in the Render dashboard.

Note: Render's free tier sleeps after ~15 min idle; the first request after a
lull takes 30-50s to wake up. Fine for a portfolio, worth a line in your About
section, or ping it with a free uptime monitor (e.g. UptimeRobot) to keep it warm.

## 3. Frontend (React)

```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL to your Render backend URL
npm run dev
```

To pull in more shadcn/ui components beyond the button/card/badge already
included:

```bash
npx shadcn@latest add <component-name>
```

Deploy to **Vercel** (free tier):
1. Import the repo, set root directory to `frontend`.
2. Vercel auto-detects Vite; `vercel.json` is included as a fallback.
3. Add `VITE_API_URL` as an environment variable pointing to your Render backend.

## Updating your content

Edit `frontend/src/data/resume.ts` for what's displayed on the page, and
`backend/app/content.py` for what the chatbot can answer about — then re-run
`python -m app.ingest` so the chatbot's knowledge stays in sync with the page.

## Cost

Every piece above runs on a free tier: Vercel (frontend), Render (backend),
Supabase (vector DB), Groq or Gemini (LLM calls). The only realistic limits
you'll hit are rate limits under heavy traffic, not billing.
