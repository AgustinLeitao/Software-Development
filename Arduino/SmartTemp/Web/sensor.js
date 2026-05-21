// Proceso que se ejecuta concurrentemente con el servidor y queda sensando la temperatura y actualizandola en el LCD.

var B = 3975;
var mraaTemp = require("mraa");
var lcd = require('./lcd');

var myAnalogPin = new mraaTemp.Aio(0);

var display = new lcd.LCD(0);

var ledOn = false;
var tempLimite = 25;
var flag = true;
var cont = 0;

// Lanzamos un proceso hijo, que quede actualizando constantemente el estado del led, si debe titilar o no.
var child_process = require('child_process');
var led = child_process.fork(__dirname + '/led.js');

setInterval(function() {
        
    var tempActual = getTempActual();
    
    display.setCursor(0, 0);
    
    if (tempActual < tempLimite) {
        display.setColor(0, 0, 255);
        display.write('ESTABLE:');

        led.send({ alerta: false });
        flag = true;
        cont = 0;
    }
    else {
        display.setColor(255, 0, 0);
        display.write('ALERTA:');
        
        if (flag) {
            process.send({ tempActual: tempActual });
            flag = false;
        }
        
        if (cont > 20) {
            process.send({ tempActual: tempActual });
            cont = 0;
        }
        
        cont++;
        
        led.send({ alerta: true });
    }

    display.setCursor(1,0);
    display.write(tempActual.toString());
    
}, 3000);

// Obtiene la informacion del sensor de temperatura en Celsius
function getTempActual() {
    var a = myAnalogPin.read();
    //console.log("Analog Pin (A0) Output: " + a);
    var resistance = (1023 - a) * 10000 / a;
    var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert temperature via datasheet ;
    
    return Math.round(celsius_temperature * 100) / 100;
}

// Se recibe un mensaje del proceso padre, en este caso, el servidor.
process.on('message', function(data) {
    if (data.tempLimite != undefined) {
        // Si lo que llego es la temperatura limite, se setea en una variable.
        tempLimite = parseFloat(data.tempLimite);
    }
    else {
        // Si lo que llego es el estado del led. Se envia un mensaje al hijo.
        led.send(data);
    }
});

// Se obtiene el estado del led, del hijo.
led.on('message', function(data) { 
    process.send(data);
});