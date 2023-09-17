from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import kmeans
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/kmeans")
async def kmeans_endpoint(request: Request):
    peticion = await request.json()
    return str("hola")