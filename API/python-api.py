from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import test

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/saludo")
def read_root():
    return {"message": "Hola, debería funcionar asi!"}