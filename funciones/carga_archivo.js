var archivo = [];
var data_dropzone;
$(document).ready(function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="archivo"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  Dropzone.autoDiscover = false;
  data_dropzone = new Dropzone("#dropzone", {
    url: "/archivos/dropzone",
    acceptedFiles: ".arff, .csv",
    dictDefaultMessage:
      "Arrastra un archivo aquí o haz clic para seleccionar un archivo ARFF o CSV.",
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
    },
  });
});
function cargar_tabla() {
  var contents = archivo[1];
  var lines = contents.split("\n");
  var colums_removed = false;
  var columnas = [];
  var filas = [];
  var tabla = '<table class="table" id="file_table">';
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

  document.getElementById("result").innerHTML = tabla;
  var botones = $("<div/>", {
    class: "d-grid gap-2 d-md-flex justify-content-md-end mt-3",
  });
  var boton = $("<button/>", {
    class: "btn btn-primary me-md-2",
    type: "button",
    onclick: "kmeans()",
    text: "Continuar",
  });
  botones.append(boton);
  $("#botones_table").append(botones);
  $("#btn_opciones").attr("hidden", false);
  let table = new DataTable("#file_table");
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
}
