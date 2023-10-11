async function printer() {
  if ($("#parametros_form")[0].checkValidity()) {
    const datos = format_data();
    const peticion = {};
    peticion.clusters = $("#num_cluster").val();
    peticion.iteraciones = $("#max_iter").val();
    peticion.random_state = $("#random_state").is(":checked");
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
    var respuesta = JSON.parse(data);
    $("#grafico1").attr("hidden", false).find("img").attr("src", "data:image/png;base64," + respuesta.primer_grafico);
    $("#grafico2").attr("hidden", false).find("img").attr("src", "data:image/png;base64," + respuesta.segundo_grafico);
  }
}
