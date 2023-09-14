async function printer() {
  if ($("#parametros_form")[0].checkValidity()) {
    const datos = format_data();
    const peticion = {parametros : {}, datos : []};
    peticion.parametros.clusters = $("#num_cluster").val();
    peticion.parametros.iteraciones = $("#max_iter").val();
    peticion.datos = datos;
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

