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

## New in this pass

- **Navbar** — sticky, smooth-scrolls to each section, includes theme toggle + resume download, collapses to a mobile menu.
- **About section** — bio + your degree/location. Drop a real photo at `frontend/public/avatar.jpg` (400x400px works well); until then it shows a monogram automatically, so nothing breaks.
- **Dark/light theme toggle** — persists via `localStorage`, no flash on reload (handled in `index.html`).
- **Scroll-reveal animations** — sections fade/slide in via `components/Reveal.tsx` + `hooks/useReveal.ts`; respects `prefers-reduced-motion`.
- **Downloadable resume PDF** — `frontend/public/resume.pdf` is your real resume file, served as-is at `/resume.pdf`. To update it later, just replace that file with your latest export (keep the filename, or update the two `href="/resume.pdf"` links in `Navbar.tsx` if you rename it) — no rebuild step needed for the PDF itself.
- **Contact form** — posts to Formspree (free, no backend needed). Sign up at formspree.io, create a form, and set `VITE_FORMSPREE_ID` in `frontend/.env` to its ID.

## Recommended deploy: frontend-only on Vercel, backend on Render

For this project, splitting frontend and backend across Vercel + Render is the
simplest path: the RAG backend needs `sentence-transformers` for free local
embeddings, which is too large for Vercel's serverless function limits. Vercel
serves the React app; Render (free tier) runs the FastAPI + embedding model
continuously. Both are still $0. See the Backend/Frontend sections above for
each platform's steps.

If you'd rather run everything on Vercel later, the trade-off is swapping the
local embedding model for an API-based one (e.g. Gemini's embedding endpoint)
so the function stays small — happy to do that migration when you're ready.

## Updating your content

Edit `frontend/src/data/resume.ts` for what's displayed on the page, and
`backend/app/content.py` for what the chatbot can answer about — then re-run
`python -m app.ingest` so the chatbot's knowledge stays in sync with the page.

## Cost

Every piece above runs on a free tier: Vercel (frontend), Render (backend),
Supabase (vector DB), Groq or Gemini (LLM calls). The only realistic limits
you'll hit are rate limits under heavy traffic, not billing.
