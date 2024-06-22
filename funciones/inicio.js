const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, (req, res) => {
    
}).listen(443);


var url = new URL(window.location.href);
var params = new URLSearchParams(url.search);
var kMeansValue = params.get("algoritmo");
var liks = {
    archivo: "vistas/como_crear.html",
    kmeans: "vistas/kmeans.html",
    jerarquico: "vistas/jerarquico.html",
    dbscan: "vistas/dbscan.html",
    davies: "vistas/davies.html",
    calinski: "vistas/calinski.html",
    silh: "vistas/silh.html",
    mineria: "vistas/mineria.html",
    archivo: "vistas/archivos.html",
};
var link = liks[kMeansValue] ?? "./dashboard/inicio.html";
$("#main").load(link);