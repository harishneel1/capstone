from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.routes import query
from app.config import settings

# Create FastAPI application
app = FastAPI(
    title="Sapiens RAG API",
    description="API for querying information from Sapiens book",
    version="0.1.0"
)

# Add CORS middleware with settings that match frontend requirements
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers directly at root level to match frontend expectations
# Frontend expects http://localhost:8000/invoke
app.include_router(query.router)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to API"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)