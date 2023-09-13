function printer() {
  const datos = archivo[1].split("\n");
  console.log(format_data());
}
function format_data() {
  var contents = archivo[1];
  var lines = contents.split("\n");
  var colums_removed = false;
  var columnas = [];
  var filas = {};
  if (archivo[0].split(".").pop() == "arff") {
    var data = false;
    for (var i = 0, j = 0; i < lines.length; i++) {
      var values = lines[i].split(" ");
      if (values[0] == "@attribute") {
        columnas.push(values[1]);
      } else if (values[0] == "@data") {
        data = true;
        columnas.forEach((columna) => {
          filas[columna] = [];
        });
      } else if (data) {
        var values = lines[i].split(",");
        if (values.length == columnas.length) {
          values.forEach((value, index) => {
            const columnName = columnas[index];
            filas[columnName].push(value);
          });
        }
      }
    }
  } else {
    var columnas_num = lines[0].split(",").length;
    for (let i = 0; i < columnas_num; i++) {
      filas["Columna " + (i+1)] = [];
    }
    for (var i = 0; i < lines.length; i++) {
      var values = lines[i].split(",");
      if (values.length == columnas_num) {
        values.forEach((value, index) => {
          const columnName = "Columna " + (index+1);
          filas[columnName].push(value);
        });
      }
    }
  }
  return [filas];
}
