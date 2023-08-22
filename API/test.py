import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

def test():

    # Genera datos aleatorios para el ejemplo
    n_samples = 300
    n_features = 2
    n_clusters = 3

    X, y = make_blobs(n_samples=n_samples, n_features=n_features, centers=n_clusters, random_state=42)

    # Visualiza los datos generados
    plt.scatter(X[:, 0], X[:, 1], s=50)
    plt.title("Datos generados")
    plt.show()

    # Crea un objeto KMeans
    kmeans = KMeans(n_clusters=n_clusters, n_init=10)

    # Ajusta el modelo a los datos
    kmeans.fit(X)

    # Obtiene las etiquetas de clúster asignadas a cada punto de datos
    labels = kmeans.labels_

    # Obtiene las coordenadas de los centros de clúster
    cluster_centers = kmeans.cluster_centers_

    # Visualiza los resultados
    plt.scatter(X[:, 0], X[:, 1], c=labels, s=50, cmap='viridis')
    plt.scatter(cluster_centers[:, 0], cluster_centers[:, 1], c='red', s=200, marker='X')
    plt.title("Resultado de K-Means")
    plt.show()
test()