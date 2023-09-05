var link = "/dashboard/inicio.html"

var url = new URL(window.location.href);
var params = new URLSearchParams(url.search);
var kMeansValue = params.get("algoritmo");
if (kMeansValue == "archivo") {
    link= "/vistas/como_crear.html";
}
else if (kMeansValue == "kmeans") {
    link= "/vistas/kmeans.html";
}else if (kMeansValue == "jerarquico") {
    link= "/vistas/jerarquico.html";
}else if (kMeansValue == "dbscan") {
    link= "/vistas/dbscan.html";
}
else if (kMeansValue == "davies"){
    link ="/vistas/davies.html";
}
else if (kMeansValue == "calinski"){
    link ="/vistas/calinski.html";
}
else if (kMeansValue == "silh"){
    link ="/vistas/silh.html";
}


$("#main").load(link);

// $(document).ready(function() {
//     $.ajax({
//         url: document.location.origin + ':8000/jerarquico',  
//         type: 'GET',
//         dataType: 'json',
//         success: function(response) {
//             console.log(response.message);
//         },
//         error: function(error) {
//             console.log(error);
//         }
//     });
// });

