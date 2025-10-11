import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from mangum import Mangum

app = FastAPI(title="TextRefine AI API", version="1.0.0", docs_url=None, redoc_url=None)

# Configure CORS - Allow all origins for Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you should specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class RephraseRequest(BaseModel):
    text: str
    style: str

class RephraseResponse(BaseModel):
    rephrased_text: str

def get_style_prompts():
    return {
        "general": {
            "prompt": "You are a helpful writing assistant. Rephrase the following text to improve clarity, readability, and flow while maintaining the original meaning. Make it more polished and well-structured.",
            "temperature": 0.5,
            "max_tokens": 800
        },
        "professional": {
            "prompt": "You are a professional writing assistant. Rephrase the following text to make it more professional, formal, and polished while maintaining the original meaning. Use clear, concise language appropriate for business or academic contexts.",
            "temperature": 0.3,
            "max_tokens": 800
        },
        "friendly": {
            "prompt": "You are a friendly writing assistant. Rephrase the following text to make it more conversational, warm, and approachable while maintaining the original meaning. Use a casual yet respectful tone that feels personal and engaging.",
            "temperature": 0.7,
            "max_tokens": 800
        },
        "creative": {
            "prompt": "You are a creative writing assistant. Rephrase the following text to make it more engaging, imaginative, and expressive while maintaining the original meaning. Use vivid language, varied sentence structures, and creative expressions.",
            "temperature": 0.9,
            "max_tokens": 1000
        }
    }

@app.get("/api")
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/styles")
async def get_styles():
    styles = get_style_prompts()
    return {"styles": list(styles.keys())}

@app.post("/api/rephrase", response_model=RephraseResponse)
async def rephrase_text(request: RephraseRequest):
    try:
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")

        styles = get_style_prompts()

        if request.style not in styles:
            raise HTTPException(status_code=400, detail=f"Invalid style. Available styles: {list(styles.keys())}")

        style_config = styles[request.style]

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": style_config["prompt"]},
                {"role": "user", "content": request.text}
            ],
            max_tokens=style_config["max_tokens"],
            temperature=style_config["temperature"]
        )

        rephrased_text = response.choices[0].message.content

        return RephraseResponse(rephrased_text=rephrased_text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

# Handler for Vercel
handler = Mangum(app)
