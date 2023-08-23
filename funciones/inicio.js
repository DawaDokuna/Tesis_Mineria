// $(document).ready(function() {
//     $.ajax({
//         url: document.location.origin + ':8000/saludo',  
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
$("#main").load("/dashboard/inicio.html");