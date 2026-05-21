// Proceso que se ejecuta concurrentemente con el servidor y el sensor de temperatura,
// se encarga de hacer titilar el led y devolver su estado a los procesos padres.

var mraaLed = require("mraa");
var myDigitalPin = new mraaLed.Gpio(5);
myDigitalPin.dir(mraaLed.DIR_OUT);

var encendido = true;
var alerta = false;
var ledOn = true;

setInterval(function() {
    if (alerta) {
        if (encendido) {
            ledOn ? myDigitalPin.write(0) : myDigitalPin.write(1);
            ledOn = !ledOn;
        }
        else {
            myDigitalPin.write(0);
        }
    }
    else {
        myDigitalPin.write(0);
    }
    
    process.send({ on: alerta && encendido});
}, 1000);

// Se recibe un mensaje del padre, en este caso, el sensor de temperatura.
process.on('message', function(data) {
    if(data.alerta != undefined) { 
        // Si la temperatura limite fue sobrepasada, se recibe la alerta y se setea en una variable.
        alerta = data.alerta;
    }
    else {
        // Si llego la orden de encendido o apagado del led desde la app, se guarda esta en otra variable.
        encendido = data.encendido;
    }
});