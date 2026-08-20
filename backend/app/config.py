from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ==========================================
    # Application
    # ==========================================

    app_name: str = "Honka API"
    environment: str = "development"

    # ==========================================
    # ChromaDB
    # ==========================================

    chroma_path: str = "./chroma_data"
    chroma_collection: str = "honka_knowledge"

    # ==========================================
    # Embeddings
    # ==========================================

    embedding_model: str = "all-MiniLM-L6-v2"

    # ==========================================
    # LLM
    # ==========================================

    llm_provider: str = "groq"
    llm_model: str = ""

    # ==========================================
    # Groq
    # ==========================================

    groq_api_key: str | None = None

    # ==========================================
    # Gemini
    # ==========================================

    gemini_api_key: str | None = None

    # ==========================================
    # Azure OpenAI
    # ==========================================

    azure_openai_api_key: str | None = None
    azure_openai_endpoint: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()