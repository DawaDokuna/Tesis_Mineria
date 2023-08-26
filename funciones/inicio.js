var link = "/dashboard/inicio.html"

var url = new URL(window.location.href);
var params = new URLSearchParams(url.search);
var kMeansValue = params.get("kmeans");
if (kMeansValue != null) {
    link= "/vistas/kmeans.html";
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

