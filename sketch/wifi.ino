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
  // Mostra o endereco IP
  sendData("AT+CIFSR\r\n", 1000, DEBUG);
  // Configura para multiplas conexoes
  sendData("AT+CIPMUX=1\r\n", 1000, DEBUG);
  // Inicia o web server na porta 80
  //sendData("AT+CIPSERVER=1,80\r\n", 1000, DEBUG);
}
 
void loop()
{
  delay(300);
  webRequest("");
  //sendData("AT+CIPSTART=4,\"TCP\",\"hackathon-iot.herokuapp.com/api/sensores\",80", 2000, DEBUG);      
  //sendData("AT+CIPSEND=4,8", 2000, DEBUG);      
  //sendData("AT+CIPSEND=92", 2000, DEBUG);      
  delay(3000);
  
  //sendData("AT+CIPSTATUS", 2000, DEBUG);
  //delay(3000);
    
  // Verifica se o ESP8266 esta enviando dados
  if (esp8266.available())
  {         
    if (esp8266.find("+IPD,"))
    {
      delay(300);
      int connectionId = esp8266.read() - 48;
 
      String webpage = "<head><meta http-equiv=""refresh"" content=""3"">";
      webpage += "</head><h1><u>ESP8266 - Web Server</u></h1><h2>Porta";
      webpage += "Digital 8: ";
      int a = digitalRead(8);
      webpage += a;
      webpage += "<h2>Porta Digital 9: ";
      int b = digitalRead(9);
      webpage += b;
      webpage += "</h2>";
 
      String cipSend = "AT+CIPSEND=";
      cipSend += connectionId;
      cipSend += ",";
      cipSend += webpage.length();
      cipSend += "\r\n";
 
      //sendData(cipSend, 1000, DEBUG);
      //sendData(webpage, 1000, DEBUG);
 
      String closeCommand = "AT+CIPCLOSE=";
      closeCommand += connectionId; // append connection id
      closeCommand += "\r\n";
 
      //sendData(closeCommand, 3000, DEBUG);      
    }
  }
}

String webRequest(String url)
{
    String response = "";
    url = "www.google.com";
    //String tmpCommand = "AT+CIPSTART=4," + "\"TCP\",\"" + url + "\",80";
    String tmpSTARTCommmand = "AT+CIPSTART=0,\"TCP\",\"hackathon-iot.herokuapp.com\",80\r\n\r\n";
    String tmpGETCommand = "GET /api/sensores HTTP/1.1\r\nHost: "; 
    tmpGETCommand += "hackathon-iot.herokuapp.com";
    tmpGETCommand += ":80\r\n\r\n";
    String tmpSENDCommand = "AT+CIPSEND=0," + String(tmpGETCommand.length()) + "\r\n";
    sendData(tmpSTARTCommmand, 8000, DEBUG);
    sendData(tmpSENDCommand, 8000, DEBUG);
    sendData(tmpGETCommand, 15000, DEBUG);
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
