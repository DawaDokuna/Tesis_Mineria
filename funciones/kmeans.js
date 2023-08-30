$(document).ready(function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="archivo"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  Dropzone.autoDiscover = false;
  $("#dropzone").dropzone({
    url: "/archivos/dropzone",
    acceptedFiles: ".arff, .csv",
    dictDefaultMessage:
      "Arrastra un archivo aquí o haz clic para seleccionar un archivo ARFF o CSV.",
    maxFiles: 1,
    uploadMultiple: false,
    success: function (file) {
      var reader = new FileReader();
      reader.filename = file.name;

      reader.onload = function (e) {
        var contents = e.target.result;
        var lines = contents.split("\n");
        var colums_removed = false;
        var columnas = [];
        var filas = [];
        var tabla = '<table class="table" id="kmeans_table">';
        if (e.target.filename.split(".").pop() == "arff") {
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
              }else{
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
            }else{
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
        let table = new DataTable("#kmeans_table");
      };

      reader.readAsText(file);

      // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de éxito o actualizar la página.
    },
  });
});
