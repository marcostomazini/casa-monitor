const int switchPin = 9;     //     // Reed switch to digital pin 2

int buzzer = 0;
int buzzerAnterior = 0;

void setup() {
  pinMode(switchPin, INPUT);        // switchPin is an input
  pinMode(8, OUTPUT);
  digitalWrite(switchPin, HIGH);    // Activate internal pullup resistor
  Serial.begin(9600);
}

void loop() {  
  buzzer = digitalRead(switchPin);
  Serial.println(buzzer);  // Display current value

  if (buzzer != buzzerAnterior)
  {
    digitalWrite(8, HIGH);
  } else if (buzzer == buzzerAnterior)
  {
    digitalWrite(8, LOW);
  }

  buzzerAnterior = digitalRead(switchPin);
  delay(200);
}
