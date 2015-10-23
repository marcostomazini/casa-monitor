// Programa: Web Server com modulo ESP8266
// Alteracoes e adaptacoes: FILIPEFLOP
// http://blog.filipeflop.com/wireless/esp8266-arduino-tutorial.html
// positivo -> 
 
#include <SoftwareSerial.h>
 
//RX pino 2, TX pino 3
SoftwareSerial esp8266(2,3);
 
#define DEBUG true
 
void setup()
{
  Serial.begin(9600);
  esp8266.begin(19200);
 
  sendData("AT+RST\r\n", 2000, DEBUG); // rst
  // Conecta a rede wireless
  sendData("AT+CWJAP=\"www.marcostomazini.me/ap2\",\"tomazini\"\r\n", 2000, DEBUG);
  delay(3000);
  sendData("AT+CWMODE=1\r\n", 1000, DEBUG);
  //sendData("AT+CIPMODE=0\r\n", 1000, DEBUG);
  // Mostra o endereco IP
  sendData("AT+CIFSR\r\n", 1000, DEBUG);
  // Configura para multiplas conexoes
  sendData("AT+CIPMUX=1\r\n", 1000, DEBUG);
  // Inicia o web server na porta 80
  //sendData("AT+CIPSERVER=1,80\r\n", 1000, DEBUG);
  //sendData("AT+CIPSTO=15000\r\n", 1000, DEBUG);
}
 
void loop()
{
  Serial.println("estou no loop");  
  webRequest("");   
}

String webRequest(String url)
{
    Serial.println("webresponse");
    String response = "";
    url = "mauricio.arquitetaweb.com";
    //String tmpCommand = "AT+CIPSTART=4," + "\"TCP\",\"" + url + "\",80";
    String tmpSTARTCommmand = "AT+CIPSTART=0,\"TCP\",\"mauricio.arquitetaweb.com\",80\r\n\r\n";
    String tmpGETCommand = "GET /api/porta/aberta HTTP/1.1\r\nHost: "; 
    tmpGETCommand += "mauricio.arquitetaweb.com";
    tmpGETCommand += ":80\r\n\r\n";
    String tmpSENDCommand = "AT+CIPSEND=0," + String(tmpGETCommand.length() + 10) + "\r\n";

    Serial.println(String(tmpGETCommand.length()));
    
    sendData(tmpSTARTCommmand, 8000, DEBUG);
    sendData(tmpSENDCommand, 8000, DEBUG);
    sendData(tmpGETCommand, 15000, DEBUG);
    //sendData("AT+CIPCLOSE\r\n", 2000, DEBUG); // rst    
}
 
String sendData(String command, const int timeout, boolean debug)
{
  // Envio dos comandos AT para o modulo
  String response = "";
  esp8266.print(command);
  long int time = millis();
  while ( (time + timeout) > millis())
  {
    while (esp8266.available())
    {
      // The esp has data so display its output to the serial window
      char c = esp8266.read(); // read the next character.
      response += c;
    }
  }
  if (debug)
  {
    Serial.print(response);
  }
  return response;
}
