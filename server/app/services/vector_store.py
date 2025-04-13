import time
from pinecone import Pinecone, ServerlessSpec
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore

from app.config import settings

# Cache for the vector store
_vector_store = None

def get_vector_store():
    """
    Get or create the vector store
    """
    global _vector_store
    
    # Return cached vector store if available
    if _vector_store is not None:
        return _vector_store
    
    # Initialize Pinecone client
    pc = Pinecone(api_key=settings.PINECONE_API_KEY)
    
    # Initialize embeddings
    embeddings = OpenAIEmbeddings(model=settings.EMBEDDING_MODEL)
    
    # Check if index exists, create if it doesn't
    existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]
    
    if settings.PINECONE_INDEX_NAME not in existing_indexes:
        pc.create_index(
            name=settings.PINECONE_INDEX_NAME,
            dimension=1536,  # Dimension for text-embedding-3-small
            metric="cosine",
            spec=ServerlessSpec(
                cloud=settings.PINECONE_CLOUD, 
                region=settings.PINECONE_REGION
            ),
        )
        # Wait for index to be ready
        while not pc.describe_index(settings.PINECONE_INDEX_NAME).status["ready"]:
            time.sleep(1)
    
    # Get the index
    index = pc.Index(settings.PINECONE_INDEX_NAME)
    
    # Create the vector store
    _vector_store = PineconeVectorStore(index=index, embedding=embeddings)
    
    # Create retriever with similarity search
    retriever = _vector_store.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={"k": 3, "score_threshold": 0.5},
    )
    
    return retriever