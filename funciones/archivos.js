$(document).ready(function(){
    $("#arff").on("show.bs.collapse", function(e){
        $("#csv").collapse("hide");
    });
    $("#csv").on("show.bs.collapse", function(e){
        $("#arff").collapse("hide");
    });
});