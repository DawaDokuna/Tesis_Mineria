async function printer() {
	if ($("#parametros_form")[0].checkValidity()) {
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
		// let centro_num = 0;
		// $("#centros").empty();
		// respuesta.centros.forEach((element) => {
		// 	var centro = $("<div>", {
		// 		class: "col-12 col-md-6 col-lg-4 mx-2 mx-auto text-center card",
		// 		html: "<h4>Centro " + centro_num++ + "</h4>",
		// 	});
		// 	element.forEach((element2) => {
		// 		centro.append(
		// 			$("<h5>", {
		// 				html: element2.toFixed(3),
		// 				class: "badge badge-pill badge-primary-webx mx-auto p-2",
		// 			})
		// 		);
		// 	});
		// 	$("#centros").append(centro);
		// 	$("#centros_card").attr("hidden", false);
		// });
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
function descargar_dbscan() {
	contenido = archivo_nuevo[1].split("\n");
	var listo = false;
	var nuevo_contenido = [];
	contenido.forEach((element) => {
		nuevo_contenido.push(element);
		var elemento = element.split(",");
		if (element.includes("@data") || archivo_nuevo[0] != "arff") {
			listo = true;
		}
		if (listo && elemento[elemento.length -1] == "-1") {
			nuevo_contenido.pop();
		}
	});
	nuevo_contenido = nuevo_contenido.join("\n");
    const blob = new Blob([nuevo_contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = "kmeans_"+$("#num_cluster").val()+"_Clusters" + '.' + archivo_nuevo[0];
    enlace.click();
    URL.revokeObjectURL(url);
}