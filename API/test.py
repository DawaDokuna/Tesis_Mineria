import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs

def test():
    # Datos en tres dimensiones (ejes X, Y y Z)
    x = [1, 2, 1, 2, 4, 4, 4, 4, 2, 3, 2]
    y = [1, 1, 2, 2, 1, 2, 3, 4, 4, 4, 5]
    z = [0, 1, 0, 1, 3, 1, 3, 5, 1, 4, 2]

    # Crear una matriz de puntos 3D
    data = np.array(list(zip(x, y, z)))

    # Centroides iniciales
    initial_centroids = np.array([[1, 1, 0], [2, 1, 1]])

    # Crear un objeto KMeans con centroides iniciales
    kmeans = KMeans(n_clusters=2, init=initial_centroids, n_init=1)

    # Ajustar el modelo a los datos
    kmeans.fit(data)

    # Obtener las etiquetas de clúster asignadas a cada punto de datos
    labels = kmeans.labels_

    # Crear una malla de valores X y Y
    x_range = np.linspace(min(x), max(x), 100)
    y_range = np.linspace(min(y), max(y), 100)
    xx, yy = np.meshgrid(x_range, y_range)

    # Calcular valores Z basados en etiquetas de clúster
    zz = np.zeros_like(xx)
    for i in range(len(x_range)):
        for j in range(len(y_range)):
            point = np.array([xx[j, i], yy[j, i], 0])
            distances = np.linalg.norm(data - point, axis=1)
            nearest_cluster = labels[np.argmin(distances)]
            zz[j, i] = nearest_cluster

    # Crear un diagrama de contorno 2D
    plt.contourf(xx, yy, zz, cmap='viridis', levels=[-0.5, 0.5, 1.5, 2.5], alpha=0.6)
    plt.colorbar()
    plt.title("Diagrama de Contorno 2D de Clústeres")
    plt.xlabel("X")
    plt.ylabel("Y")

    # Visualizar los datos y los centroides
    plt.scatter(x, y, c=labels, cmap='viridis', s=50)
    plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], marker='X', s=200, c='red', label='Centroids')
    plt.legend()
    plt.show()
test()