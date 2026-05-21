/*
* Para iniciar el servidor: >node server/server.js
* Problema: se necesita reinicar el servidor ante cualquier cambio
* Solucion: se usa una dependencia llamada nodemon que reinicia 
*			automaticamente el server, para iniciar el server:
*			>npm start
*			star es un script ubicado en package.json
*
*/

//Datos por default del server
var temperaturaMaxima = 30;
var temperaturaActual = 0;
var estadoLED = false;

//Framework node, instalr via >nmp i express -S
var express = require('express'); 

var app =  express();

// Libreria node, viene por defecto en node
// Creamos el servidor con Http y le pasamos la app express
var server = require('http').Server(app);

// hay que instalar la libreria socket.io via >npm i socket.io -S
// maneja los sockets en el servidor
var io = require('socket.io')(server);

//Indicamos donde estan los archivos estaticos que el cliente puede usar
app.use(express.static('public'));

app.get('/', function(req, res){
	res.status(200).send('Hola mundo 2');
})

setInterval(function() {
	temperaturaActual = Math.floor((Math.random() * 10) + 20);
	console.log('Nueva temperatura actual: ' + temperaturaActual);
	if(temperaturaActual > temperaturaMaxima)
			io.sockets.emit('notificacion');
}, 1000);


//Servidor escucha conecciones de clientes
io.on('connection', function(socket){
	console.log('nuevo usuario conectado');
	//al socket que se conecto le envio un mensaje de bienvenida
	//socket.emit('mensaje', {'id':1, 'texto':'Bienvenido.'})

	//Cuando nos envien un mensaje mostrarlo por consola
	/*socket.on('enviarMensaje', function (data) {
		console.log(`${data.usuario}: ${data.mensaje}`);
	});*/
	
	socket.on('medirTemperaturasApp', function(){
		console.log('temperaturas enviadas: Actual: ' + temperaturaActual + ', Limite: ' + temperaturaMaxima);
		io.sockets.emit('medirTemperaturasApp', {'tempLimite' : temperaturaMaxima, 'tempActual' : temperaturaActual});		
	})
	
	socket.on('setTempLimite', function(data){		
		temperaturaMaxima = data.tempLimite;
		console.log('Nueva temperatura establecida: ' + temperaturaMaxima);	
	})
	
	socket.on('getLedStateApp', function(){		
		console.log('Enviado estado LED: ' + estadoLED);
		socket.emit('getLedStateApp', {'encendido': estadoLED});	
	})
	
	socket.on('setLedState', function(data){		
		estadoLED = data.encendido;
		console.log('Nueva estado de Led establecido: ' + estadoLED);
		io.sockets.emit('getLedStateApp', {'encendido': estadoLED});	
	})
		
})
io.on('disconnect', function(){
    console.log('Usuario desconectado');
  });



//Establezco el puerto por donde se va a escuchar las peticiones
server.listen('5000', function(){
	console.log("servidor corriendo.");
});