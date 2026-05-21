var socket = io.connect('http://localhost:5000', {'forceNew':true});

socket.on('mensaje', function (data) {
	console.log(data);
	mostrarMensaje(data);
})

function mostrarMensaje (data) {
	var html = `<div>
					<strong>${data.id}</strong>: 
					<em>${data.texto}</em>
				</div>` ;
	document.getElementById('mensajes').innerHTML = html;
}

function enviarMensaje (event) {
	var payload = {
		usuario:document.getElementById('userName').value,
		mensaje:document.getElementById('mensaje').value
	}

	socket.emit("enviarMensaje", payload);

	return false;
}