# Sapiens RAG API

A RAG (Retrieval-Augmented Generation) system built with LangGraph for querying information from Yuval Noah Harari's book "Sapiens."

## Project Structure

```
sapiens-rag/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── models/              # Pydantic models
│   │   ├── __init__.py
│   │   └── schemas.py
│   ├── routes/              # API routes
│   │   ├── __init__.py
│   │   └── query.py
│   ├── services/            # Business logic
│   │   ├── __init__.py
│   │   ├── rag.py           # RAG service
│   │   ├── vector_store.py  # Vector store operations
│   │   └── graph.py         # LangGraph definition
│   └── utils/               # Utility functions
│       ├── __init__.py
│       └── helpers.py
├── requirements.txt         # Dependencies
├── .env.example             # Example environment variables
└── README.md                # Project documentation
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd sapiens-rag
```

2. Set up a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file based on `.env.example` and add your API keys:
```bash
cp .env.example .env
# Edit .env to add your API keys
```

5. Run the API server:
```bash
python -m app.main
```

The API will be available at http://localhost:8000

## API Endpoints

- `POST /invoke`: Process a query and stream the response
  - Request Body: Raw text or JSON with a "content" field containing the query
  - Response: Streaming response with step-by-step processing and final answer

## Frontend Integration

This API is designed to work with the provided React frontend. Ensure the frontend is configured to connect to `http://localhost:8000/invoke`.

## Development

To run the server in development mode with hot reloading:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```