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
    var respuesta = JSON.parse(data);
    $("#parametros_form").append(
      $("<img>", {
        src: "data:image/png;base64," + respuesta.imagen,
        alt: "Kmeans",
        class: "img-fluid",
        style: "max-width: 100%; height: auto;",
        id: "kmeans_img",
      })
    );
    console.log($("#kmeans_img"));
  }
}

