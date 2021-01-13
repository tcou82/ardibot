#include <Arduino.h>
#line 1 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
#include <Servo.h>

int REVERSE = -1;
int inters [20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
const int LED_4_PIN = 2; 
const int LED_2_PIN = 3; 

#line 8 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
void setup();
#line 14 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
void loop();
#line 18 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
float get_SONAR(int npin);
#line 31 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
int get_INTER(int npin);
#line 46 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
void set_MOTEUR(int npinA, int npinB, int val);
#line 8 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
void setup() { 
    Serial.begin(9600); // Default communication rate of the Bluetooth module
    Serial.println("Initialisation connexion:");
    pinMode(LED_4_PIN, OUTPUT); 
    pinMode(LED_2_PIN, OUTPUT); 
}
void loop() {
    digitalWrite(LED_2_PIN, LOW);
}

float get_SONAR(int npin) {
    pinMode(npin, OUTPUT); 
    digitalWrite(npin, LOW); 
    delayMicroseconds(2); 
    digitalWrite(npin, HIGH); 
    delayMicroseconds(10);
    digitalWrite(npin, LOW); 
    pinMode(npin, INPUT); 
    float distance = pulseIn(npin, HIGH) / 58.00;
    Serial.print("  distance    ");
    Serial.println(distance);
    return distance;
}
int get_INTER(int npin) {
    int val1 = digitalRead(npin); 
    Serial.print("val1  ");
    Serial.print(val1);
    delay(20);
    int val2 = digitalRead(npin);
    Serial.print("  val2  ");
    Serial.print(val2);
    if ( val1 == val2 ) {
        inters[npin] = val1;
    }
    Serial.print("  retenu    ");
    Serial.println(inters[npin]);
    return inters[npin];
}
void set_MOTEUR(int npinA, int npinB, int val) {
    if ( val == 1) {
        digitalWrite(npinA, HIGH); 
        digitalWrite(npinB, LOW);
    } else if ( val == 0 ) {
        digitalWrite(npinA, LOW); 
        digitalWrite(npinB, LOW); 
    } else if ( val == -1) {         
        digitalWrite(npinA, LOW); 
        digitalWrite(npinB, HIGH); 
    }
}

