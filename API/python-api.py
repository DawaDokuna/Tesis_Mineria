from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from sklearn.cluster import KMeans
from io import BytesIO
import base64
from matplotlib import pyplot as plt
import json

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
        fig, ax = plt.subplots(figsize=(8, 6))
        objetos = np.arange(len(etiquetas_de_cluster))
        centroides = np.unique(etiquetas_de_cluster)
        for centroide in centroides:
            objetos_en_centroide = objetos[etiquetas_de_cluster == centroide]
            ax.scatter(objetos_en_centroide, [centroide] * len(objetos_en_centroide), label=f'Cluster {centroide +1}')
        ax.set_xlabel('Objetos')
        ax.set_ylabel('Centroides')
        ax.legend()
        img_data = BytesIO()
        fig.savefig(img_data, format='png')
        img_data.seek(0)
        img_base64 = base64.b64encode(img_data.read()).decode()
        data_con_etiquetas = np.column_stack((data, etiquetas_de_cluster))
        return json.dumps(
            {
                "data": data_con_etiquetas.tolist(),
                "imagen": img_base64,
            }
        )
    except Exception as e:
        return str(e)
