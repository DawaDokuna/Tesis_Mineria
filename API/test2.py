import numpy as np

# Supongamos que tienes 10 filas de datos
data = np.array(
    [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18],
        [19, 20, 21],
        [22, 23, 24],
        [25, 26, 27],
        [28, 29, 30],
    ]
)

# Selecciona 3 filas aleatorias de forma única
centroides_aleatorios = data[np.random.choice(10, 3, replace=False)]

print(centroides_aleatorios)
