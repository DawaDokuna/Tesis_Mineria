async function printer() {
	if ($("#parametros_form")[0].checkValidity()) {
		$("[name='iniciar']").prop('disabled', true);
		const datos = format_data();
		const peticion = {};
		peticion.datos = datos[0];
		const response = await fetch(document.location.origin + ":8000/silhouette", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(peticion),
		});
		$("#metric").html(JSON.parse(await response.json()).score);
		$("#centros_card").attr("hidden", false);
		$("[name='iniciar']").prop('disabled', false);
	}
}