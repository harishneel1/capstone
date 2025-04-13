from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import StreamingResponse
import json
import asyncio
from typing import AsyncGenerator, Dict, Any, List

from app.models.schemas import QueryRequest
from app.services.rag import get_rag_pipeline

router = APIRouter()

@router.post("/invoke")
async def invoke(request: Request) -> StreamingResponse:
    """
    Process a query and stream the response
    """
    try:
        # Get JSON data from request
        data = await request.json()
        
        # Extract query content (handling both direct string and JSON object)
        if isinstance(data, str):
            content = data
        elif isinstance(data, dict) and "content" in data:
            content = data["content"]
        else:
            raise HTTPException(status_code=400, detail="Invalid request format. Expected string or JSON with content field.")
        
        # Get the RAG pipeline from service
        rag_pipeline = get_rag_pipeline()
        
        # Create streaming response
        return StreamingResponse(
            stream_rag_response(content, rag_pipeline),
            media_type="text/event-stream"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

async def stream_rag_response(content: str, rag_pipeline) -> AsyncGenerator[str, None]:
    """
    Stream the RAG pipeline response
    
    This specifically formats the output to match the frontend's expected format:
    - Steps are wrapped in <step><step_name>name</step_name>{json_data}</step>
    - The final answer is in <step><step_name>final_answer</step_name>{"answer": "content", "tools_used": []}</step>
    """
    try:
        # Create input data for the graph
        from langchain_core.messages import HumanMessage
        input_data = {"question": HumanMessage(content=content)}
        
        # Define the steps that will be streamed - this should match the actual graph nodes
        steps = [
            {"name": "question_rewriter", "result": {"status": "processing"}},
            {"name": "question_classifier", "result": {"status": "processing"}},
            {"name": "retrieve", "result": {"status": "processing"}},
            {"name": "retrieval_grader", "result": {"status": "processing"}},
            {"name": "generate_answer", "result": {"status": "processing"}}
        ]
        
        # Stream each step with a short delay to simulate processing
        for step in steps:
            step_name = step["name"]
            yield f"<step><step_name>{step_name}</step_name>{json.dumps(step['result'])}</step>"
            await asyncio.sleep(0.5)
            
            # After "processing", send completion status
            yield f"<step><step_name>{step_name}</step_name>{json.dumps({'status': 'completed'})}</step>"
            await asyncio.sleep(0.2)
        
        # In the actual implementation, we'll consume the stream from langgraph
        # TODO: Replace with actual streaming from graph.stream()
        # For now, this is a placeholder that matches the frontend's expected format
        
        # Yield final answer at the end
        final_answer = {
            "answer": f"This is a placeholder answer for: {content}",
            "tools_used": ["vector_store"]
        }
        
        yield f"<step><step_name>final_answer</step_name>{json.dumps(final_answer)}</step>"
    
    except Exception as e:
        error_response = {"error": str(e)}
        yield f"<step><step_name>error</step_name>{json.dumps(error_response)}</step>"