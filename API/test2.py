import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import AgglomerativeClustering
from scipy.cluster.hierarchy import dendrogram

# Generar datos sintéticos para el ejemplo
n_samples = 20
n_features = 2
random_state = 42

X, _ = make_blobs(n_samples=n_samples, n_features=n_features, random_state=random_state)

# Crear el modelo de Clasificación Jerárquica
n_clusters = 3
agg_clustering = AgglomerativeClustering(n_clusters=n_clusters)

# Ajustar el modelo a los datos
labels = agg_clustering.fit_predict(X)

# Visualización de los resultados
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', edgecolor='k')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('Clasificación Jerárquica')
plt.show()

# Visualización del dendrograma
from scipy.cluster import hierarchy

linkage_matrix = hierarchy.linkage(X, method='ward')
dendrogram(linkage_matrix)
plt.title("Dendrograma de Clasificación Jerárquica")
plt.show()