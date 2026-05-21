//Check and display temperature 
#include <Wire.h>
#include "rgb_lcd.h"
#include <Ethernet.h>
#include <stdlib.h>
 
const int pinTemp = A0;  
rgb_lcd lcd;

// Assigning initial color that'll be seen once the Galileo boots
int colorR = 255;
int colorG = 255;
int colorB = 0;
const int b=3975; 
float resistance;
float temperature;
String tempLimit = "";
float tempLimitFloat = 0;

long previousMillis = 0;
unsigned long currentMillis = 0;
long interval = 5000; // INTERVALO DE LECTURA CADA 30 SEGUNDOS

String data;

EthernetClient client;                
EthernetClient client2;                

void setup()
{
    pinMode(6, OUTPUT);
    pinMode(7, OUTPUT);
    Serial.begin(115200);
    while (!Serial) {
        ; // wait for serial port to connect. Needed for native USB port only
    }

    lcd.begin(16, 2);
    lcd.setRGB(colorR, colorG, colorB);
    delay(2000);
    
    data = "";
}

void loop()
{
    tempLimit = "";
    Serial.println("connecting...");
    if (client2.connect("soa.hol.es", 80)) {
      Serial.println("connected");
      client2.println("GET http://soa.hol.es/temperatura.dat HTTP/1.1");
      client2.println("Host: soa.hol.es");
      client2.println("Connection: close");
      client2.println();
    } else {
      Serial.println("connection failed");
    }

    if (client2.available()) {
        char c;
        while((c = client2.read()) != '|');
        while((c = client2.read()) != '|') {
          tempLimit += c;
        }
        
        Serial.print(tempLimit);

        char floatbuf[32]; // make this at least big enough for the whole string
        tempLimit.toCharArray(floatbuf, sizeof(floatbuf));
        tempLimitFloat = atof(floatbuf);
    }

    if (!client2.connected()) {
        Serial.println();
        Serial.println("disconnecting.");
        client2.stop();
      
        while (true);
    }

    if (client2.connected()) { 
        client2.stop();  // DISCONNECT FROM THE SERVER
    }
    
    lcd.clear();
	  int val = analogRead(pinTemp);                              
    resistance=(float)(1023-val)*10000/val;  
    //calculate the temperature    
    temperature=1/(log(resistance/10000)/b+1/298.15)-273.15;     
                
    if (temperature < tempLimitFloat) {    
        digitalWrite(6, LOW);
        colorR = 0;
        colorG = 0;
        colorB = 255;
        lcd.setRGB(colorR, colorG, colorB);
        //display temperature and 
        lcd.print("Hace frio: ");
        lcd.print(temperature);
    }
    else {
        colorR = 255;
        colorG = 0;
        colorB = 0;
        lcd.setRGB(colorR, colorG, colorB);
        //display temperature
        lcd.print("Hace calor: ");
        lcd.print(temperature);
        digitalWrite(6, HIGH);
        sleep(1);
        digitalWrite(6, LOW);
        sleep(1);
    }

    //TRANSFORMAMOS LA TEMERATURA DE FLOAT A STRING
    String strEntero = String((int)temperature);
    String strDecimal = String((int)((temperature-(int)temperature)*100));
    data = "temp1=" + strEntero + "." + strDecimal;

    currentMillis = millis();
    if(currentMillis - previousMillis > interval) { // LEE SOLO UNA VEZ EN CADA INTERVALO
        previousMillis = currentMillis;
        if (client.connect("soa.hol.es",80)) { // REPLACE WITH YOUR SERVER ADDRESS
            client.println("POST /add.php HTTP/1.1"); 
		        client.println("Host: soa.hol.es"); // SERVER ADDRESS HERE TOO
		        client.println("Content-Type: application/x-www-form-urlencoded"); 
		        client.print("Content-Length: "); 
		        client.println(data.length()); 
		        client.println(); 
		        client.print(data); 
        } 

	      if (client.connected()) { 
		        client.stop();	// DISCONNECT FROM THE SERVER
	      }

        
        
        
    }
}
