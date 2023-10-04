from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from sklearn.cluster import KMeans
import json
import graficos as gf

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
        initinicio = "random" if peticion["random_state"] else data[:centroides]
        kmeans = KMeans(
            n_clusters=centroides,
            init=initinicio,
            n_init=1,
            max_iter=iteraciones,
        )
        kmeans.fit(data)
        etiquetas_de_cluster = kmeans.labels_
        data_con_etiquetas = np.column_stack((data, etiquetas_de_cluster))
        primer_grafico = gf.crear_grafico_kmeans(etiquetas_de_cluster)
        segundo_grafico = gf.crear_grafico_kmeans2(etiquetas_de_cluster)
        return json.dumps(
            {
                "data": data_con_etiquetas.tolist(),
                "primer_grafico": primer_grafico,
                "segundo_grafico": segundo_grafico,
            }
        )
    except Exception as e:
        return str(e)
