from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )

    llm_model: str = "llama-3.1-8b-instant"

    groq_api_key: str = ""
    gemini_api_key: str = ""
    azure_api_key: str = ""

    allowed_origins: str = "http://localhost:5173"

    embedding_model: str = "all-MiniLM-L6-v2"
    match_count: int = 4

    # Where the local Chroma collection persists on disk. Relative to
    # wherever the process is started from (backend/ if you're running
    # `python -m app.ingest` or `uvicorn app.main:app` from there).
    chroma_persist_dir: str = "./chroma_data"

    min_similarity: float = 0.35

    rate_limit_max_requests: int = 10
    rate_limit_window_seconds: int = 60

    max_question_length: int = 500

settings = Settings()