var archivo = [];
var archivo_nuevo = [];
var data_dropzone;
function cargar_tabla() {
	archivo[1] = archivo[1].replaceAll(/\r/g, "");
	if ($("#btn_centroides").data("tipo") == 1 && archivo_nuevo.length != 0) {
		var contents = archivo_nuevo[1];
		$("#btn_centroides").data("tipo",2);
	} else {
		var contents = archivo[1];
		$("#btn_centroides").data("tipo",1);
	}
	var lines = contents.split("\n");
	var colums_removed = false;
	var columnas = [];
	var options_columnas = '<option value="">Seleccione...</option>';
	var filas = [];
	var tabla = '<table class="table" id="file_table">';
	if (archivo[0].split(".").pop() == "arff") {
		var data = false;
		for (var i = 0, j = 0; i < lines.length; i++) {
			var values = lines[i].split(" ");
			if (values[0] == "@attribute") {
				columnas.push(values[1]);
				options_columnas +=
					"<option value=" + values[1] + ">" + values[1] + "</option>";
			} else if (values[0] == "@data") {
				data = true;
			} else if (data) {
				var values = lines[i].split(",");
				if (values.length != columnas.length) {
					colums_removed = true;
				} else {
					filas.push(values);
				}
			}
		}
		tabla += "<thead><tr>";
		columnas.forEach((element) => {
			tabla += "<th>" + element + "</th>";
		});
		tabla += "</tr></thead>";
		tabla += "<tbody>";
		for (var i = 0; i < filas.length; i++) {
			tabla += "<tr>";
			for (var j = 0; j < filas[i].length; j++) {
				tabla += "<td>" + filas[i][j] + "</td>";
			}
			tabla += "</tr>";
		}
		tabla += "</tbody>";
		tabla += "</table>";
	} else {
		columnas = lines[0].split(",").length;
		for (var i = 0; i < lines.length; i++) {
			var values = lines[i].split(",");
			if (values.length != columnas) {
				colums_removed = true;
			} else {
				filas.push(values);
			}
		}
		tabla += "<thead><tr>";
		for (let i = 0; i < columnas; i++) {
			tabla += "<th>Columna " + (i + 1) + "</th>";
			options_columnas +=
				'<option value="' + i + '">Columna ' + (i + 1) + "</option>";
		}
		tabla += "</tr></thead>";
		tabla += "<tbody>";
		for (var i = 0; i < filas.length; i++) {
			tabla += "<tr>";
			for (var j = 0; j < filas[i].length; j++) {
				tabla += "<td>" + filas[i][j] + "</td>";
			}
			tabla += "</tr>";
		}
		tabla += "</tbody>";
		tabla += "</table>";
	}
	$("#select_delete_col").html(options_columnas);
	$("#result").empty();
	$("#result").html(tabla);

	$("#btn_opciones").attr("hidden", false);
	let table = new DataTable("#file_table", {
		ordering: false,
	});
	if (colums_removed) {
		var alerta = $("<div/>", {
			class: "alert alert-danger mt-3 fw-bold",
			role: "alert",
			text: "Se han eliminado algunas columnas debido a que no todas las filas tienen el mismo número de columnas.",
		});
		$("#mensaje_tabla").append(alerta);
		var targetOffset = $("#file_table").offset().top - 200;

		$("html, body").animate(
			{
				scrollTop: targetOffset,
			},
			2
		);
	}
	$("[name='iniciar']").prop('disabled', false);
}
function botonera() {
	var btn = $("<button>")
		.attr({
			type: "button",
			id: "btn_opciones",
			class: "btn my-3 col-8 btn-primary mx-auto py-2 text-light fw-bold",
			"data-bs-toggle": "collapse",
			"data-bs-target": "#opciones",
			hidden: true,
		})
		.text("Opciones de conjunto");
	var card = $("<div>").addClass("card collapse mb-3").attr("id", "opciones");
	var cardBody = $("<div>").addClass("card-body");
	var cardTitle = $("<h5>").addClass("card-title").text("Opciones de archivo");
	var inputGroup1 = $("<div>").addClass(
		"col-sm-12 col-md-8 mx-auto input-group mb-3"
	);
	var label1 = $("<label>")
		.addClass("input-group-text text-wrap")
		.attr("for", "select_delete_col")
		.text("Eliminar columna");
	var selectDeleteCol = $("<select>")
		.addClass("form-select")
		.attr("id", "select_delete_col");
	selectDeleteCol.append(
		$("<option>").prop("selected", true).text("Seleccione...")
	);
	var buttonDelete = $("<button>")
		.addClass("btn btn-outline-primary")
		.attr("type", "button")
		.text("Eliminar")
		.click(borrar_columna);
	inputGroup1.append(label1, selectDeleteCol, buttonDelete);
	var inputGroup2 = $("<div>").addClass(
		"col-sm-12 col-md-8 mx-auto input-group mb-3"
	);
	var buttonComillas = $("<button>")
		.addClass("btn btn-outline-primary")
		.attr("type", "button")
		.text("Eliminar Comillas")
		.click(comillas);
	var div = $("<div>");
	var inputCaracter = $("<input>").addClass("form-control").attr({
		type: "text",
		id: "caracter_a_borrar",
		placeholder: "Caracter especial",
	});
	var buttonCaracter = $("<button>")
		.addClass("btn btn-outline-primary")
		.attr("type", "button")
		.text("Eliminar Caracter")
		.click(caracter);
	inputGroup2.append(buttonComillas, div, inputCaracter, buttonCaracter);
	cardBody.append(cardTitle, inputGroup1, inputGroup2);
	card.append(cardBody);
	$("#botonera").append(btn, card);
}
function comillas() {
	lineas = archivo[1].split("\n");
	var archivo_nuevo = [];
	lineas.forEach((element) => {
		archivo_nuevo.push(element.replaceAll('"', ""));
	});
	archivo[1] = archivo_nuevo.join("\n");
	cargar_tabla();
}
function caracter() {
	lineas = archivo[1].split("\n");
	caracter_borrar = $("#caracter_a_borrar").val();
	var archivo_nuevo = [];
	lineas.forEach((element) => {
		archivo_nuevo.push(element.replaceAll(caracter_borrar, ""));
	});
	archivo[1] = archivo_nuevo.join("\n");
	cargar_tabla();
}
function borrar_columna() {
	lineas = archivo[1].split("\n");
	var archivo_nuevo = [];
	columna_borrar = $("#select_delete_col").val();
	if (archivo[0].split(".")[1] == "arff") {
		var is_data = false;
		var posicion = 0;
		var iterador = 0;
		lineas.forEach((element) => {
			if (element.split(" ")[0] == "@attribute" && !is_data) {
				if (element.split(" ")[1] != columna_borrar) {
					archivo_nuevo.push(element);
					iterador++;
				} else {
					posicion = iterador;
				}
			} else if (element.split(" ")[0] == "@data") {
				is_data = true;
				archivo_nuevo.push(element);
			} else if (is_data) {
				var lineas_nuevas = [];
				element.split(",").forEach((element2, index) => {
					if (index != posicion) {
						lineas_nuevas.push(element2);
					}
				});
				archivo_nuevo.push(lineas_nuevas.join(","));
			} else {
				archivo_nuevo.push(element);
			}
		});
		archivo[1] = archivo_nuevo.join("\n");
	} else {
		lineas.forEach((element) => {
			var lineas_nuevas = [];
			element.split(",").forEach((element2, index) => {
				if (index != columna_borrar) {
					lineas_nuevas.push(element2);
				}
			});
			archivo_nuevo.push(lineas_nuevas.join(","));
		});
		archivo[1] = archivo_nuevo.join("\n");
	}
	cargar_tabla();
}
function format_data() {
	var contents = archivo[1];
	var lines = contents.split("\n");
	var columnas = [];
	var filas = [];
	if (archivo[0].split(".").pop() == "arff") {
		var data = false;
		for (var i = 0; i < lines.length; i++) {
			var values = lines[i].split(" ");
			if (values[0] == "@attribute") {
				columnas.push(values[1]);
			} else if (values[0] == "@data") {
				data = true;
			} else if (data) {
				var values = lines[i].split(",");
				if (values.length == columnas.length) {
					for (var j = 0; j < values.length; j++) {
						values[j] = values[j].replaceAll(/\r/g, "");
					}
					filas.push(values);
				}
			}
		}
	} else {
		var columnas_num = lines[0].split(",").length;
		for (let i = 0; i < columnas_num; i++) {
			columnas.push("Columna " + (i + 1));
		}
		for (var i = 0; i < lines.length; i++) {
			var values = lines[i].split(",");
			if (values.length == columnas_num) {
				for (var j = 0; j < values.length; j++) {
					values[j] = values[j].replaceAll(/\r/g, "");
				}
				filas.push(values);
			}
		}
	}
	return [filas, columnas];
}
function descargar_kmeans(){
    const blob = new Blob([archivo_nuevo[1]], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = "kmeans_"+$("#num_cluster").val()+"_Clusters" + '.' + archivo_nuevo[0];
    enlace.click();
    URL.revokeObjectURL(url);
}
function descargar_jerarquico(){
    const blob = new Blob([archivo_nuevo[1]], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = "jerarquico_"+$("#num_cluster").val()+"_Clusters" + '.' + archivo_nuevo[0];
    enlace.click();
    URL.revokeObjectURL(url);
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
		if (listo && elemento[elemento.length - 1] == "-1") {
			nuevo_contenido.pop();
		}
	});
	nuevo_contenido = nuevo_contenido.join("\n");
	const blob = new Blob([nuevo_contenido], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const enlace = document.createElement("a");
	enlace.href = url;
	enlace.download =
		"dbscan_" +
		$("#min_cluster").val() +
		"_min_" +
		$("#eps").val() +
		"_eps." +
		archivo_nuevo[0];
	enlace.click();
	URL.revokeObjectURL(url);
}
$(document).on("click", '[name="grafico"]', function () {
	var imageSrc = $(this).attr("src");
	if (imageSrc && imageSrc !== "#") {
		if ($("#fullscreenContainer").length === 0) {
			var fullscreenContainer = $("<div>")
				.attr("id", "fullscreenContainer")
				.css({
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.8)",
					zIndex: 2,
					display: "none",
				})
				.click(function () {
					closeFullscreen();
				});
			var fullscreenImage = $("<img>")
				.attr("src", imageSrc)
				.attr("id", "fullscreenImage")
				.css({
					position: "absolute",
					top: "50%",
					left: "50%",
					width: 0,
					height: 0,
					objectFit: "contain",
					cursor: "pointer",
				})
				.click(function () {
					closeFullscreen();
				});

			fullscreenContainer.append(fullscreenImage);
			$("body").append(fullscreenContainer);
			function openFullscreen() {
				fullscreenContainer.fadeIn(300);
				fullscreenImage.animate(
					{
						width: "70%",
						height: "70%",
						top: "15%",
						left: "15%",
					},
					300
				);
			}
			function closeFullscreen() {
				fullscreenImage.animate(
					{
						width: 0,
						height: 0,
						top: "50%",
						left: "50%",
					},
					300,
					function () {
						fullscreenContainer.remove();
					}
				);
			}
			openFullscreen();
		}
	}
});
$(document).ready(function () {
	botonera();
	const tooltipTriggerList = document.querySelectorAll(
		'[data-bs-toggle="archivo"]'
	);
	const tooltipList = [...tooltipTriggerList].map(
		(tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
	);
	Dropzone.autoDiscover = false;
	data_dropzone = new Dropzone("#dropzone", {
		url: new URL(window.location.href) + "/archivos/dropzone",
		acceptedFiles: ".arff, .csv",
		dictDefaultMessage: "Arrastra un archivo aquí o haz clic para seleccionar un archivo ARFF o CSV.",
		maxFiles: 1,
		uploadMultiple: false,
		success: function (file) {
			archivo[0] = file.name;
			var reader = new FileReader();
			reader.onload = function (e) {
				archivo[1] = e.target.result;
				cargar_tabla();
				data_dropzone.removeAllFiles();
			};
			reader.readAsText(file);
			$("#parametros").collapse("show");
			archivo_nuevo = [];
		},
	});
	
});
