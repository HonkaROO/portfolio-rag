from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class Source(BaseModel):
    content: str
    similarity: float


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]
