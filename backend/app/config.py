from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )

    supabase_url: str
    supabase_key: str

    llm_model: str = "llama-3.1-8b-instant"

    groq_api_key: str = ""
    gemini_api_key: str = ""
    azure_api_key: str = ""
    
    # azure_endpoint: str
    # azure_embedding_model: str

    allowed_origins: str = "http://localhost:5173"

    embedding_model: str = "all-MiniLM-L6-v2"
    match_count: int = 4

    # Below this cosine similarity, the top retrieved chunk is treated as
    # "not actually relevant" and the LLM call is skipped entirely rather
    # than generating an answer ungrounded in real context. Tune this
    # empirically for your embedding model - 0.35 is a conservative
    # starting point for all-MiniLM-L6-v2.
    min_similarity: float = 0.35

    # Simple in-memory per-IP rate limit for /chat and /chat/stream.
    # Single-process only (fine for a single Render instance) - swap for
    # a shared store (Redis, etc.) if this ever runs multi-instance.
    rate_limit_max_requests: int = 10
    rate_limit_window_seconds: int = 60

    max_question_length: int = 500


settings = Settings()