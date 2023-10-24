from io import BytesIO
import base64
from matplotlib import pyplot as plt
import numpy as np
from scipy.cluster.hierarchy import linkage, dendrogram

def crear_grafico_kmeans(etiquetas_de_cluster):
    fig, ax = plt.subplots(figsize=(8, 6))
    objetos = np.arange(len(etiquetas_de_cluster))
    centroides = np.unique(etiquetas_de_cluster)
    for centroide in centroides:
        objetos_en_centroide = objetos[etiquetas_de_cluster == centroide]
        ax.scatter(objetos_en_centroide, [centroide] * len(objetos_en_centroide), label=f'Cluster {centroide }')
    ax.set_xlabel('Objetos')
    ax.set_ylabel('Centroides')
    ax.legend()
    img_data = BytesIO()
    fig.savefig(img_data, format='png')
    img_data.seek(0)
    return base64.b64encode(img_data.read()).decode()

def crear_grafico_kmeans2(etiquetas_de_cluster):
    fig, ax = plt.subplots(figsize=(8, 6))
    centroides = np.unique(etiquetas_de_cluster)
    cuenta_por_centroide = [np.sum(etiquetas_de_cluster == centroide) for centroide in centroides]
    colores_personalizados = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
    ax.bar(centroides, cuenta_por_centroide, color=colores_personalizados[:len(centroides)], tick_label=centroides)
    ax.set_xlabel('Centroides')
    ax.set_ylabel('Número de Objetos')
    img_data = BytesIO()
    fig.savefig(img_data, format='png')
    img_data.seek(0)
    return base64.b64encode(img_data.read()).decode()

def crear_grafico_jerarquico(data):
    linkage_matrix = linkage(data, method='ward') 
    dendrogram(linkage_matrix)
    plt.title('Dendrogram')
    plt.xlabel('Samples')
    plt.ylabel('Distance')
    img_data = BytesIO()
    plt.savefig(img_data, format='png')
    img_data.seek(0)
    return base64.b64encode(img_data.read()).decode()