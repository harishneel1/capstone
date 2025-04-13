from langchain_core.messages import HumanMessage
from app.services.graph import create_graph
from app.services.vector_store import get_vector_store

# Cache for the RAG pipeline
_rag_pipeline = None

def get_rag_pipeline():
    """
    Get or create the RAG pipeline
    """
    global _rag_pipeline
    
    # Return cached pipeline if available
    if _rag_pipeline is not None:
        return _rag_pipeline
    
    # Create a new pipeline
    _rag_pipeline = create_graph()
    
    return _rag_pipeline

def process_query(content: str, thread_id: str = None):
    """
    Process a query through the RAG pipeline
    """
    # Get the RAG pipeline
    rag_pipeline = get_rag_pipeline()
    
    # Create input data for the graph
    input_data = {"question": HumanMessage(content=content)}
    
    # Invoke the graph with the input data
    config = {"configurable": {"thread_id": thread_id or "default"}}
    result = rag_pipeline.invoke(input_data, config=config)
    
    return result