async function printer() {
  if ($("#parametros_form")[0].checkValidity()) {
    const datos = format_data();
    const peticion = {};
    peticion.clusters = $("#num_cluster").val();
    peticion.iteraciones = $("#max_iter").val();
    peticion.datos = datos[0];
    peticion.columnas = datos[1];
    const response = await fetch(document.location.origin + ':8000/kmeans', {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(peticion),
    });
    const data = await response.json();
    console.log(data);
  }
}

