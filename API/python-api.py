import random
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

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
    try:
        peticion = await request.json()
        valores_columnas = []
        for columna in peticion["datos"]:
            valores_columnas.append(columna)
        data = np.array(valores_columnas)
        centroides = int(peticion["clusters"])
        iteraciones = (
            int(peticion["iteraciones"]) if peticion["iteraciones"] != "" else 300
        )
        init = random.randint(1, len(data)) if peticion["random_state"] else 1
        centroides_iniciales = data[:centroides]
        kmeans = KMeans(
            n_clusters=centroides,
            init=centroides_iniciales,
            n_init=init,
            max_iter=iteraciones,
        )
        kmeans.fit(data)
        centroides_kmeans = kmeans.cluster_centers_
        return str(centroides_kmeans)
    except Exception as e:
        return str(e)
