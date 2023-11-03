var url = new URL(window.location.href);
var params = new URLSearchParams(url.search);
var kMeansValue = params.get("algoritmo");
var liks = {
    "archivo": "vistas/como_crear.html",
    "kmeans": "vistas/kmeans.html",
    "jerarquico": "/vistas/jerarquico.html",
    "dbscan": "vistas/dbscan.html",
    "davies": "vistas/davies.html",
    "calinski": "vistas/calinski.html",
    "silh": "vistas/silh.html"
}
var link = liks[kMeansValue]??"dashboard/inicio.html";
$("#main").load(link);