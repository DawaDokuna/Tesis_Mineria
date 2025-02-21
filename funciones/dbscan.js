async function printer() {
	if ($("#parametros_form")[0].checkValidity()) {
		$("[name='iniciar']").prop('disabled', true);
		const datos = format_data();
		const peticion = {};
		peticion.min_cluster = $("#min_cluster").val();
		peticion.eps = $("#eps").val();
		peticion.datos = datos[0];
		const response = await fetch(document.location.origin + ":8000/dbscan", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(peticion),
		});
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

		$("#centros").empty();
		Object.keys(respuesta.grupos).forEach((element) => {
			var centro = $("<div>", {
				class: "col-12 col-md-6 col-lg-4 m-2 row mx-auto text-center card",
				html:
					"<h4>" + (element == -1 ? "Ruido" : "Centro " + element) + "</h4>",
			});
			centro.append($("<div>", { class: "d-flex flex-wrap g-2" }));
			respuesta.grupos[element].forEach((element2) => {
				centro.children("div").append(
					$("<div>", {
						html: element2.join(", "),
						class: "badge col badge-pill badge-primary-webx m-2 p-2",
					})
				);
			});
			$("#centros").append(centro);
			$("#centros_card").attr("hidden", false);
		});
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
		$("[name='iniciar']").prop('disabled', false);
	}
}

