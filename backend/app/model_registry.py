from dataclasses import dataclass


@dataclass(frozen=True)
class ModelInfo:
    provider: str
    model: str
    endpoint: str


MODEL_REGISTRY = {
    # Groq
    "llama-3.1-8b-instant": ModelInfo(
        provider="groq",
        model="llama-3.1-8b-instant",
        endpoint="https://api.groq.com/openai/v1/chat/completions",
    ),

    # Gemini
    "gemini-3.1-flash-lite": ModelInfo(
        provider="gemini",
        model="gemini-3.1-flash-lite",
        endpoint="https://generativelanguage.googleapis.com/v1beta",

    ),
    
    # Azure OpenAI
    "gpt-5-nano": ModelInfo(
        provider="azure",
        model="gpt-5-nano",
        endpoint="https://example-hub-resource.services.ai.azure.com/openai/v1/responses",
    ),
}

EMBEDDING_REGISTRY = {
    "azure": ModelInfo(
        provider="azure",
        model="text-embedding-3-small",
        endpoint="https://example-hub-resource.openai.azure.com/openai/v1/embeddings",
    ),
}

def get_model(name: str) -> ModelInfo:
    try:
        return MODEL_REGISTRY[name]
    except KeyError:
        supported = ", ".join(MODEL_REGISTRY.keys())
        raise ValueError(
            f"Unknown model '{name}'. Supported models: {supported}"
        )

def get_supported_models():
    return [
        {
            "name": name,
            "provider": info.provider.title(),
        }
        for name, info in MODEL_REGISTRY.items()
    ]


def get_supported_providers():
    return sorted(
        {info.provider.title() for info in MODEL_REGISTRY.values()}
    )


def get_supported_providers() -> str:
    providers = sorted(
        {info.provider.title() for info in MODEL_REGISTRY.values()}
    )
    return "\n".join(
        f"- {provider}"
        for provider in providers
    )