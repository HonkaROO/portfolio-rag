from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str
    supabase_key: str  # use the service_role key for ingest, anon key is fine for read-only chat
    groq_api_key: str = ""
    gemini_api_key: str = ""
    llm_provider: str = "groq"  # "groq" or "gemini"
    allowed_origins: str = "http://localhost:5173"
    embedding_model: str = "all-MiniLM-L6-v2"
    match_count: int = 4
    gemini_model: str = "gemini-3.1-flash-lite"
    
    class Config:
        env_file = ".env"


settings = Settings()
