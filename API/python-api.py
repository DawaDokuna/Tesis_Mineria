from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.metrics import davies_bouldin_score, calinski_harabasz_score, silhouette_score
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
            int(peticion["iteraciones"]) if peticion["iteraciones"] != "" else 500
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
                "centros":kmeans.cluster_centers_.tolist()
            }
        )
    except Exception as e:
        return str(e)


@app.post("/jerarquico")
async def jerarquico_endpoint(request: Request):
    try:
        peticion = await request.json()
        valores_columnas = []
        for columna in peticion["datos"]:
            valores_columnas.append(columna)
        data = np.array(valores_columnas)
        data = data.astype(float)
        num_clusters = int(peticion["clusters"])
        jerarquico = AgglomerativeClustering(n_clusters=num_clusters)
        jerarquico.fit(data)
        etiquetas_de_cluster = jerarquico.labels_
        data_con_etiquetas = np.column_stack((data, etiquetas_de_cluster))
        primer_grafico = gf.crear_grafico_kmeans(etiquetas_de_cluster)
        segundo_grafico = gf.crear_grafico_kmeans2(etiquetas_de_cluster)
        tercer_grafico = gf.crear_grafico_jerarquico(data)
        return json.dumps(
            {
                "data": data_con_etiquetas.tolist(),
                "primer_grafico": primer_grafico,
                "segundo_grafico": segundo_grafico,
                "tercer_grafico": tercer_grafico,
            }
        )
    except Exception as e:
        return str(e)

@app.post("/dbscan")
async def dbscan_endpoint(request: Request):
    try:
        peticion = await request.json()
        valores_columnas = []
        for columna in peticion["datos"]:
            valores_columnas.append(columna)
        data = np.array(valores_columnas)
        data = data.astype(float)
        min_clusters = int(peticion["min_cluster"])
        eps = float(peticion["eps"])
        dbscan = DBSCAN(eps=eps, min_samples=min_clusters)
        dbscan.fit(data)
        etiquetas_de_cluster = dbscan.labels_
        data_con_etiquetas = np.column_stack((data, etiquetas_de_cluster))
        primer_grafico = gf.crear_grafico_kmeans(etiquetas_de_cluster)
        segundo_grafico = gf.crear_grafico_kmeans2(etiquetas_de_cluster)
        grupos = {}
        for etiqueta, objeto in zip(etiquetas_de_cluster, data):
            etiqueta_str = str(etiqueta)
            if etiqueta_str not in grupos:
                grupos[etiqueta_str] = []
            grupos[etiqueta_str].append(objeto.tolist())
        return json.dumps(
            {
                "data": data_con_etiquetas.tolist(),
                "primer_grafico": primer_grafico,
                "segundo_grafico": segundo_grafico,
                "grupos": grupos,
            }
        )
    except Exception as e:
        return str(e)

@app.post("/davies")
async def davies_endpoint(request: Request):
    try:
        peticion = await request.json()
        valores_columnas = []
        for columna in peticion["datos"]:
            valores_columnas.append(columna)
        data = np.array(valores_columnas)
        data = data.astype(float)
        clusters = data[:, -1]
        score = davies_bouldin_score(data, clusters)
        return json.dumps(
            {
                "score": str(score)
            }
        )
    except Exception as e:
        return str(e)
    
@app.post("/calinski")
async def calinski_endpoint(request: Request):
    try:
        peticion = await request.json()
        valores_columnas = []
        for columna in peticion["datos"]:
            valores_columnas.append(columna)
        data = np.array(valores_columnas)
        data = data.astype(float)
        clusters = data[:, -1]
        score = calinski_harabasz_score(data, clusters)
        return json.dumps(
            {
                "score": str(score)
            }
        )
    except Exception as e:
        return str(e)
    
@app.post("/silhouette")
async def silhouette_endpoint(request: Request):
    try:
        peticion = await request.json()
        valores_columnas = []
        for columna in peticion["datos"]:
            valores_columnas.append(columna)
        data = np.array(valores_columnas)
        data = data.astype(float)
        clusters = data[:, -1]
        score = silhouette_score(data, clusters)
        return json.dumps(
            {
                "score": str(score)
            }
        )
    except Exception as e:
        return str(e)