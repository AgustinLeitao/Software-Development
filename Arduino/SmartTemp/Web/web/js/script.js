var socket = io();

function setearFondo(id){
    $('#video-bg').fadeOut('slow');
    $('#video-bg').vide('/media/'+id, {
        'loop': 'true', 'muted': 'true', 'position': '0% 0%'
        }).fadeIn("slow");
}

function setTempMax(temp){
   socket.emit('setTempLimite', { tempLimite: temp });
} 

socket.on('medirTemperaturas', function(data) {
	
	$('#temperaturaActual').html(data.tempActual+"&#8451;").fadeIn("slow");
	$("#temperaturaMaxima").html(data.tempLimite+"&#8451;").fadeIn("slow");
	
	if(parseFloat(data.tempActual) < parseFloat(data.tempLimite))
		setearFondo("winter");
	else
		setearFondo("fire");
});

var auto_refresh = setInterval(function() {
	socket.emit("medirTemperaturas");
}, 10000); // refrescamos cada 10 segundos

$( document ).ready(function() {
	
	socket.emit("medirTemperaturas");
	
	$(document).on("click", "#submit_btn", function (e){
		e.preventDefault();
		setTempMax($("#tempMax").val());
	});

	$(".content").fadeIn(1000);
});