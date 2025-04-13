from typing import Dict, List, Optional, TypedDict
from pydantic import BaseModel, Field

# Request models
class QueryRequest(BaseModel):
    content: str = Field(..., description="The question to ask")
    thread_id: Optional[str] = Field(None, description="Optional thread ID for conversation continuity")

# Response models
class StepResult(TypedDict):
    name: str
    result: Dict[str, str]

class QueryResponse(BaseModel):
    question: str
    steps: List[StepResult] = []
    result: Dict[str, str] = {}

# Agent state models
class AgentState(TypedDict):
    messages: List
    documents: List
    on_topic: str
    rephrased_question: str
    proceed_to_generate: bool
    rephrase_count: int
    question: dict

class GradeQuestion(BaseModel):
    score: str = Field(
        description="Question is about the specified topics? If yes -> 'Yes' if not -> 'No'"
    )

class GradeDocument(BaseModel):
    score: str = Field(
        description="Document is relevant to the question? If yes -> 'Yes' if not -> 'No'"
    )