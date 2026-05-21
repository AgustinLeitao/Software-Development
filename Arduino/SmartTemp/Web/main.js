/*jslint node:true,vars:true,bitwise:true,unparam:true */

/*jshint unused:true */

/*
The Local Temperature Node.js sample application distributed within Intel® XDK IoT Edition under the IoT with Node.js Projects project creation option showcases how to read analog data from a Grover Starter Kit Plus – IoT Intel® Edition Temperature Sensor, start a web server and communicate wirelessly using WebSockets.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/iot-local-temperature-nodejs-and-html5-samples
*/

var B = 3975;
var mraa = require("mraa");

var myAnalogPin = new mraa.Aio(0);

var tempLimite = 25;
var ledEncendido = false;

console.log("Iniciando Smart Temp App...");
//var a = myAnalogPin.read();

// Obtiene la informacion del sensor de temperatura en Celsius
function getTempActual() {
    var a = myAnalogPin.read();
    //console.log("Analog Pin (A0) Output: " + a);
    var resistance = (1023 - a) * 10000 / a;
    var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert temperature via datasheet ;
    
    return Math.round(celsius_temperature * 100) / 100;
}

// Obtiene la temperatura limite de una variable del servidor
function getTempLimite() { 
    return tempLimite;
}

var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Lanzamos un proceso hijo, que quede sensando constantemente la temperatura y mostrandola en el LCD.
var child_process = require('child_process');
var sensor = child_process.fork(__dirname + '/sensor.js');

app.get('/', function(req, res) {
    // Lanzamos la pagina de inicio de la pagina web.
    res.sendFile(path.join(__dirname + '/web', 'index.html'));
});

// Permitimos a la aplicacion que use todos los archivos de la carpeta web.
app.use(express.static(__dirname + '/web'));
app.use('/web', express.static(__dirname + '/web'));

io.on('connection', function (socket) {
    console.log('Abriendo un Socket');
    console.log('Usuario conectado');

    // Obtiene el estado de temperatura actual y temperatura limite. 
    socket.on('medirTemperaturas', function () {
        var tempActual = getTempActual();
        var tempLimite = getTempLimite();
        socket.emit('medirTemperaturas', { tempActual: tempActual, tempLimite: tempLimite });
    });

    // Obtiene el estado de temperatura actual y temperatura limite y emite el resultado en Broadcast, 
    // para que todas las Apps actualicen cuando haya un cambio.
    socket.on('medirTemperaturasApp', function () {
        var tempActual = getTempActual();
        var tempLimite = getTempLimite();
        io.sockets.emit('medirTemperaturasApp', { tempActual: tempActual, tempLimite: tempLimite });
    });
    
    // Seteamos la temperatura limite
    socket.on('setTempLimite', function (data) {
        tempLimite = data.tempLimite;
        sensor.send(data);
    });
    
    // Seteamos el estado del led.
    socket.on('setLedState', function (data) {
        ledEncendido = data.encendido;
        sensor.send(data);
    });
    
    // Obtiene el estado del Led, si esta titilando o no.
    socket.on('getLedState', function(){
        socket.emit('getLedState', { encendido: ledEncendido });
    });
    
    // Obtiene el estado del led y emite el resultado en Broadcast, para que todas las Apps actualicen cuando haya un cambio.
    socket.on('getLedStateApp', function(){
        io.sockets.emit('getLedStateApp', { encendido: ledEncendido });
    });
    
    //Mostramos un mensaje por consola cuando un usuario se desconecta
    socket.on('disconnect', function () {
        console.log('Usuario desconectado');
    });
    
    sensor.on('message', function(data) {
        if (data.on != undefined)
            ledEncendido = data.on;
        else {
            console.log(data.tempActual);
            io.sockets.emit('notificacion', data);
        }
    });
});
    
http.listen(5000, function(){
        console.log("Web server activo y escuchando en puerto 5000");
    });
