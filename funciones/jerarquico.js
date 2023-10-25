async function printer() {
	if ($("#parametros_form")[0].checkValidity()) {
		const datos = format_data();
		const peticion = {};
		peticion.clusters = $("#num_cluster").val();
		peticion.datos = datos[0];
		const response = await fetch(
			document.location.origin + ":8000/jerarquico",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(peticion),
			}
		);
		const data = await response.json();
		var respuesta = JSON.parse(data);
		$("#grafico1")
			.attr("hidden", false)
			.find("img")
			.attr("src", "data:image/png;base64," + respuesta.primer_grafico);
		$("#grafico2")
			.attr("hidden", false)
			.find("img")
			.attr("src", "data:image/png;base64," + respuesta.segundo_grafico);
		$("#grafico3")
			.attr("hidden", false)
			.find("img")
			.attr("src", "data:image/png;base64," + respuesta.tercer_grafico);
		$("#centros_card").attr("hidden", false);
		var contents = archivo[1];
		var lines = contents.split("\n");
		var newLines = [];
		var encontrado = false;
		if (archivo[0].split(".").pop() == "arff") {
			lines.forEach((element) => {
				if (element.includes("@data")) {
					newLines.push("@attribute Cluster categoric");
					newLines.push(element);
					encontrado = true;
				} else if (element.includes("@attribute")) newLines.push(element);
				else return;
			});
		}
		respuesta["data"].forEach((element) => {
			newLines.push(element.join(","));
		});
		newLines = newLines.join("\n");
		archivo_nuevo = [archivo[0], newLines];
		$("#btn_centroides").attr("hidden", false);
		$("#btn_centroides").data("tipo", 1);
		cargar_tabla();
	}
}
