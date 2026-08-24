# Project Context: Gumanit Portfolio RAG

Use this file as compact context for Claude, ChatGPT, or another coding assistant before asking it to modify this repository.

## High-Level Summary

This is Christian Paul Gumanit's personal portfolio site with an embedded RAG chatbot named Honka. The frontend is a React/Vite/Tailwind portfolio that displays Christian's experience, projects, certifications, skills, contact information, and resume assets. The backend is a FastAPI API that retrieves relevant portfolio/resume chunks from a local ChromaDB vector store, then asks a selected LLM provider to answer questions grounded in those chunks.

The project is structured as:

```text
frontend/   React + Vite + TypeScript + Tailwind + shadcn-style UI components
backend/    FastAPI backend for chat, retrieval, generation, model switching, and ingestion
supabase/   Legacy/unused pgvector schema from an earlier architecture
```

Important: the README still mentions Supabase/pgvector, but the current backend code uses ChromaDB through `backend/app/db.py`. Treat ChromaDB as the current implementation unless the user explicitly asks to migrate back to Supabase.

## Current Architecture

The current chat flow is:

1. User asks a question in `frontend/src/components/ChatWidget.tsx`.
2. The frontend POSTs to `POST /chat/stream` on the FastAPI backend.
3. The backend validates the question, rate-limits by client IP, and checks deterministic shortcuts.
4. If the question asks about the model or website, the backend returns a deterministic answer without RAG or LLM calls.
5. If the question looks like prompt injection, the backend returns a fixed refusal.
6. Otherwise, `backend/app/rag/retrieve.py` embeds the question and queries ChromaDB.
7. If the top similarity is below `min_similarity`, the backend skips generation and returns a no-context answer.
8. If relevant chunks exist, `backend/app/rag/generate.py` builds a prompt and calls the currently selected provider/model.
9. The streaming endpoint emits SSE frames for the RAG trace UI: `query`, `retrieve`, `generate`, `respond`, or `error`.

## Tech Stack

Frontend:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI primitives
- shadcn-style local UI components
- lucide-react icons
- react-markdown
- motion

Backend:

- FastAPI
- Uvicorn
- Pydantic / pydantic-settings
- ChromaDB persistent local collection
- sentence-transformers for local embeddings
- requests for LLM provider calls

LLM providers currently represented in code:

- Groq: `llama-3.1-8b-instant`
- Gemini: `gemini-3.1-flash-lite`
- Azure OpenAI / Foundry-style Responses endpoint: `gpt-5-nano`

## Key Files

Backend:

- `backend/app/main.py`: FastAPI app, CORS, startup ingestion if Chroma collection is empty, health route, chat router registration.
- `backend/app/config.py`: environment-backed settings and defaults.
- `backend/app/content.py`: canonical chatbot knowledge chunks. Update this when resume/portfolio facts change.
- `backend/app/ingest.py`: deletes and recreates Chroma documents from `content.py`.
- `backend/app/db.py`: ChromaDB persistent client and `documents` collection.
- `backend/app/routers/chat.py`: chat endpoints, SSE streaming, deterministic model/site answers, RAG orchestration, model switching.
- `backend/app/rag/embed.py`: embedding helper.
- `backend/app/rag/retrieve.py`: Chroma similarity search and confidence filtering.
- `backend/app/rag/generate.py`: system prompt, runtime context prompt, provider-specific generation calls.
- `backend/app/model_registry.py`: supported model/provider registry.
- `backend/app/runtime.py`: mutable `current_model`, initialized from settings.
- `backend/app/security.py`: IP rate limit, question validation, prompt-injection pattern checks.
- `backend/app/schemas.py`: Pydantic request/response models.

Frontend:

- `frontend/src/App.tsx`: page composition and section order.
- `frontend/src/components/ChatWidget.tsx`: Honka chat UI, model dropdown, SSE parsing, cooldown, Markdown rendering.
- `frontend/src/components/RAGTrace.tsx`: visual trace for query/retrieve/generate/respond stages.
- `frontend/src/data/resume.ts`: visible portfolio data for profile, experience, projects, technologies, skills, certifications, education, and social links.
- `frontend/src/components/*`: portfolio sections and reusable UI.
- `frontend/public/*`: images, project screenshots, certification images, avatar, and resume PDF.

Deployment/config:

- `backend/render.yaml`: Render backend deployment config.
- `frontend/vercel.json`: Vercel frontend fallback config.
- `frontend/package.json`: frontend scripts and dependencies.
- `backend/requirements.txt`: backend Python dependencies.
- `supabase/schema.sql`: legacy pgvector schema, currently not used by backend code.

## Environment Variables

Backend settings are defined in `backend/app/config.py`.

Common backend variables:

- `LLM_MODEL`: default current model key; default is `llama-3.1-8b-instant`.
- `GROQ_API_KEY`
- `GEMINI_API_KEY`
- `AZURE_API_KEY`
- `ALLOWED_ORIGINS`: comma-separated CORS origins; default `http://localhost:5173`.
- `EMBEDDING_MODEL`: default `all-MiniLM-L6-v2`.
- `MATCH_COUNT`: number of retrieved chunks; default `4`.
- `CHROMA_PERSIST_DIR`: default `./chroma_data`.
- `MIN_SIMILARITY`: default `0.35`.
- `RATE_LIMIT_MAX_REQUESTS`: default `10`.
- `RATE_LIMIT_WINDOW_SECONDS`: default `60`.
- `MAX_QUESTION_LENGTH`: default `500`.

Frontend:

- `VITE_API_URL`: backend base URL. Defaults to `http://localhost:8000` in `ChatWidget.tsx`.
- `VITE_FORMSPREE_ID`: used by the contact form if configured.

## Local Development Commands

Backend:

```bash
cd backend
python -m venv .venv
pip install -r requirements.txt
python -m app.ingest
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
npm run build
npm run lint
```

When `backend/app/content.py` changes, run:

```bash
cd backend
python -m app.ingest
```

The backend also auto-ingests on startup if the Chroma collection is empty.

## API Surface

Backend routes:

- `GET /health`: returns `{"status": "ok"}`.
- `POST /chat`: non-streaming chat response. Body: `{"question": "..."}`.
- `POST /chat/stream`: streaming chat response using Server-Sent Events over POST.
- `POST /model/{model_name}`: switches global runtime model if `model_name` exists in `MODEL_REGISTRY`.

SSE stages from `/chat/stream`:

- `query`
- `retrieve`
- `generate`
- `respond`
- `error`

Response sources include retrieved chunk content and similarity scores.

## Current Portfolio Facts

Visible profile facts live in `frontend/src/data/resume.ts`; chatbot facts live in `backend/app/content.py`.

Current identity:

- Name: Christian Paul Gumanit
- Title: Software Engineer
- Location: Lapu-lapu City, Cebu
- Email: `christiangumanit@gmail.com`
- GitHub: `https://github.com/HonkaROO`
- LinkedIn: `https://www.linkedin.com/in/christian-gumanit/`

Displayed experience includes:

- Software Engineer at N-PAX Cebu Corporation, Inc. from August 2025 to present.
- Backend Developer at Xpertis Solutions, Inc. from February 2025 to May 2025.
- Project Manager at Alliance Software Inc. from September 2024 to December 2024.
- House Representative at USJ-R Supreme Student Council from May 2023 to May 2024.

Displayed projects include:

- N-PAX Onboarding eXpert (NOX)
- N-PAX File Management (Trackquire)
- EnrollME
- SCSHelpDesk

Displayed certifications include:

- Microsoft Agentic AI Business Solutions Architect
- Microsoft Azure AI Engineer Associate
- Google Project Management Professional
- AWS Academy Cloud Architecting
- AWS Academy Cloud Foundations
- React - The Complete Guide 2024

Education:

- Bachelor of Science in Computer Science, University of San Jose-Recoletos, June 2021 to May 2025.

## Important Implementation Notes

- Keep `frontend/src/data/resume.ts` and `backend/app/content.py` synchronized when changing portfolio facts. The page and chatbot do not share one source of truth.
- The current vector database is ChromaDB, not Supabase. Do not assume `supabase/schema.sql` is active.
- `backend/app/main.py` auto-ingests on startup only when the Chroma collection is empty. To refresh changed content in an existing local Chroma directory, run `python -m app.ingest`.
- `backend/app/model_registry.py` currently defines `get_supported_providers` twice. The second definition returns a formatted string, overriding the first. This may be intentional for prompt rendering, but the name suggests a possible cleanup target.
- `backend/app/rag/generate.py` has an `_post` and `_extract` wrapper, but the provider functions currently call `requests.post` directly and `raise_for_status()`. Provider errors may bypass the intended `LLMProviderError` wrapper in some paths.
- Azure endpoints in `model_registry.py` are example URLs and likely need real deployment endpoints before Azure generation works.
- The model switch endpoint mutates a global `current_model`; this is simple but process-local and not persistent across backend restarts or multiple workers.
- The frontend model dropdown uses provider IDs mapped to backend model names in `MODEL_MAP`.
- The chat frontend manually parses SSE because it uses POST, not native `EventSource`.
- The frontend imposes a local send cooldown, while the backend also rate-limits by IP.

## Coding Conventions

- Follow existing project style and keep changes scoped.
- Frontend components use TypeScript, Tailwind utility classes, and local UI primitives under `frontend/src/components/ui`.
- Prefer lucide-react icons when adding UI buttons or labels.
- Backend is simple function-oriented FastAPI code. Keep RAG steps readable and explicit.
- For user-facing portfolio facts, update both the display data and chatbot chunks unless the request only targets one side.
- After backend content or retrieval changes, ingest and test chat behavior.
- After frontend UI changes, run `npm run build` where feasible.

## Suggested Prompts For Future Assistants

Useful starting prompt:

```text
You are working in the Gumanit Portfolio RAG repo. Read PROJECT_CONTEXT.md first, then inspect the files relevant to my request. Preserve the current React/Vite/Tailwind frontend and FastAPI/ChromaDB backend architecture unless I explicitly ask for a migration.
```

When changing portfolio facts:

```text
Update both frontend/src/data/resume.ts and backend/app/content.py so the visible portfolio and Honka chatbot stay consistent. Then explain whether python -m app.ingest needs to be run.
```

When changing chat behavior:

```text
Inspect backend/app/routers/chat.py, backend/app/rag/retrieve.py, backend/app/rag/generate.py, and frontend/src/components/ChatWidget.tsx before editing. Keep the SSE stages compatible with RAGTrace.
```
