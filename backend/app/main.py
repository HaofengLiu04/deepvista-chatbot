from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

from app.models import (
    ChatRequest, ChatResponse, HealthResponse, ErrorResponse
)
from app.services.openai_service import OpenAIService

# Initialize FastAPI app
app = FastAPI(
    title="DeepVista Chatbot API",
    description="AI-powered chatbot API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services lazily
openai_service = None

def get_openai_service():
    global openai_service
    if openai_service is None:
        openai_service = OpenAIService()
    return openai_service

 


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal server error",
            detail=str(exc),
            timestamp=datetime.now().isoformat()
        ).dict()
    )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now().isoformat()
    )


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send a message and receive AI response"""
    try:
        # Validate message
        if not request.message.strip():
            raise HTTPException(
                status_code=400, 
                detail="Message cannot be empty"
            )
        
        # Generate AI response
        ai_response = await get_openai_service().generate_response(request.message)
        
        return ChatResponse(
            response=ai_response,
            timestamp=datetime.now().isoformat()
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process chat message: {str(e)}"
        )


 


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "DeepVista Chatbot API",
        "version": "1.0.0",
            "endpoints": {
            "chat": "POST /chat - Send a message and receive AI response",
            "health": "GET /health - Health check endpoint"
        }
    }


if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    
    uvicorn.run(app, host=host, port=port)