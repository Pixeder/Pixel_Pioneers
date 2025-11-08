# app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from urllib.parse import urlparse, parse_qs
from dotenv import load_dotenv
import os
from functools import lru_cache
import json
import re

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in environment variables.")

app = FastAPI(title="YouTube Video AI Tool")

# ------------------- Models ------------------- #
class VideoRequest(BaseModel):
    url: str

class QuestionRequest(BaseModel):
    url: str
    question: str

# ------------------- Helpers ------------------- #
def extract_video_id(url: str) -> str:
    parsed = urlparse(url)
    if "youtube.com" in parsed.netloc:
        if parsed.path == "/watch":
            return parse_qs(parsed.query).get("v", [None])[0]
        elif parsed.path.startswith("/embed/"):
            return parsed.path.split("/embed/")[1]
    elif "youtu.be" in parsed.netloc:
        return parsed.path.lstrip("/")
    return None

@lru_cache(maxsize=128)
def fetch_transcript(video_id: str) -> str:
    ytt_api = YouTubeTranscriptApi()
    try:
        transcript_list = ytt_api.list(video_id)
        transcript = None
        # Try English first
        try:
            transcript = transcript_list.find_transcript(['en'])
        except NoTranscriptFound:
            for t in transcript_list:
                if getattr(t, 'is_translatable', False):
                    transcript = t.translate('en')
                    break
        if transcript is None:
            transcripts = list(transcript_list)
            if transcripts:
                transcript = transcripts[0]
            else:
                raise NoTranscriptFound(video_id, ["en"], transcript_list)
        fetched_transcript = transcript.fetch()
        return " ".join([t.text for t in fetched_transcript])
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not fetch transcript: {str(e)}")

def chunk_text(text: str, max_chars: int = 5000) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + max_chars
        if end < len(text):
            period_pos = text.rfind('.', start, end)
            if period_pos != -1:
                end = period_pos + 1
        chunks.append(text[start:end].strip())
        start = end
    return chunks

@lru_cache(maxsize=64)
def create_vector_store(content: str) -> FAISS:
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_text(content)
    chunk_docs = [Document(page_content=chunk) for chunk in chunks]
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return FAISS.from_documents(chunk_docs, embeddings)

# ------------------- LLM Setup ------------------- #
llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="meta-llama/llama-4-maverick-17b-128e-instruct",
    temperature=0.7
)

# ------------------- Routes ------------------- #
@app.post("/summarize")
def summarize_video(request: VideoRequest):
    video_id = extract_video_id(request.url)
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL.")

    content = fetch_transcript(video_id)
    chunks = chunk_text(content, max_chars=5000)
    chunk_summaries = []

    for chunk in chunks:
        prompt = f"""
You are an expert summarizer. Analyze the following transcript and return **strict JSON**:

{{
  "summary": {{
    "Detailed Summary": "...",
    "Key Points / Takeaways": "...",
    "Short Summary (TL;DR)": "..."
  }}
}}

Transcript:
{chunk}

Instructions:
- Respond ONLY in valid JSON.
- Fill each field appropriately.
"""
        chunk_summaries.append(llm.invoke(prompt).content)

    # Merge JSON summaries properly
    merged_prompt = f"""
You are an expert summarizer. You have multiple JSON summaries from chunks:

{chr(10).join(chunk_summaries)}

Task:
- Combine them into a single JSON object.
- Merge "Detailed Summary" into one coherent text.
- Merge "Key Points / Takeaways" into a list.
- Merge "Short Summary (TL;DR)" into one concise summary.
- Output ONLY valid JSON.
"""

    final_summary = llm.invoke(merged_prompt)
    final_summary = final_summary.content

    # Remove ```json or ``` wrapping if present
    cleaned_text = re.sub(r"^```json\s*|\s*```$", "", final_summary.strip(), flags=re.MULTILINE)
    try:
        summary_json = json.loads(cleaned_text)
    except json.JSONDecodeError:
        summary_json = {"error": "LLM output is not valid JSON."}

    return summary_json

@app.post("/generate_quiz")
def generate_quiz(request: VideoRequest):
    video_id = extract_video_id(request.url)
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL.")

    content = fetch_transcript(video_id)
    chunks = chunk_text(content, max_chars=5000)
    quiz_sections = []

    for i, chunk in enumerate(chunks):
        prompt = f"""
You are an expert educational content creator. Based on the transcript chunk, create **5 quiz questions** (easy, medium, hard).
Respond strictly in JSON like:

{{
  "quiz": {{
    "easy_question": {{}},
    "medium_question": {{}},
    "hard_question": {{}}
  }}
}}

Transcript chunk {i+1}:
{chunk}

Instructions:
- Each question must have 4 options (A-D) and a correct answer.
- Respond ONLY with valid JSON.
"""
        quiz_sections.append(llm.invoke(prompt).content)

    # Optionally, merge quizzes from chunks into one JSON object
    combined_quiz_text = chr(10).join(quiz_sections)
    merged_quiz_prompt = f"""
You are an educational content creator. Merge these JSON quiz objects into a single valid JSON object:

{combined_quiz_text}

Respond ONLY with valid JSON.
"""
    merged_quiz = llm.invoke(merged_quiz_prompt)
    merged_quiz_text = merged_quiz.content

    # Remove ```json or ``` wrapping if present
    cleaned_text = re.sub(r"^```json\s*|\s*```$", "", merged_quiz_text.strip(), flags=re.MULTILINE)

    # Now parse as JSON
    try:
        quiz_json = json.loads(cleaned_text)
    except json.JSONDecodeError:
        quiz_json = {"error": "LLM output is not valid JSON."}

    return quiz_json

@app.post("/ask_question")
def ask_question(request: QuestionRequest):
    video_id = extract_video_id(request.url)
    if not video_id:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL.")

    content = fetch_transcript(video_id)
    vector_store = create_vector_store(content)
    retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 4})

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    prompt_template = PromptTemplate(
        template="""
You are an intelligent Q&A chatbot. Answer user questions strictly based on the transcript.

Transcript Context:
{context}

Question:
{question}

Answer:
""",
        input_variables=["context", "question"]
    )

    chain = RunnableParallel({
        "context": retriever | RunnableLambda(format_docs),
        "question": RunnablePassthrough()
    }) | prompt_template | llm | StrOutputParser()

    answer = chain.invoke(request.question)
    return {"answer": answer}
