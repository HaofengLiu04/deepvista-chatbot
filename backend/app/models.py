from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="The user's message")


class ChatResponse(BaseModel):
    response: str = Field(..., description="AI generated response")
    timestamp: str = Field(..., description="ISO-8601 timestamp")


class HealthResponse(BaseModel):
    status: str = Field(default="healthy", description="Service health status")
    timestamp: str = Field(..., description="ISO-8601 timestamp")



class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")
    timestamp: str = Field(..., description="ISO-8601 timestamp")