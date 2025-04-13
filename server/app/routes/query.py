from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.services.rag import process_query



class QueryInput(BaseModel):
    content: str
    thread_id: Optional[str] = None

router = APIRouter()

@router.post("/invoke")
def invoke(request: QueryInput) -> Dict[str, Any]:
    """
    Process a query and return a simple response
    """
    try:
        print(f"Processing query: {request.content}")
        response = process_query(request.content, request.thread_id)

        return {
            "answer": response["messages"][-1].content, 
            "success": True
        }
    
    except Exception as e:
        return {
            "error": f"Error processing query: {str(e)}",
            "success": False
        }