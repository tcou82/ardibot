#include <Arduino.h>
#line 1 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino"
#include <Servo.h>

int inters [20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
const int MOTEUR_1_PIN_A = 4; 
const int MOTEUR_1_PIN_B = 5; 
#line 6 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino"
void setup();
#line 11 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino"
void loop();
#line 18 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino"
float get_SONAR(int npin);
#line 31 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino"
int get_INTER(int npin);
#line 46 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino"
void set_MOTEUR(int npinA, int npinB, int val);
#line 6 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino"
void setup() { 
    Serial.begin(9600); // Default communication rate of the Bluetooth module
    Serial.println("Initialisation connexion:");    pinMode(MOTEUR_1_PIN_A, OUTPUT); 
    pinMode(MOTEUR_1_PIN_B, OUTPUT); 
}
void loop() {
set_MOTEUR(MOTEUR_1_PIN_A, MOTEUR_1_PIN_B, 1);    delay(3*1000);
set_MOTEUR(MOTEUR_1_PIN_A, MOTEUR_1_PIN_B, 0);    delay(1*1000);
set_MOTEUR(MOTEUR_1_PIN_A, MOTEUR_1_PIN_B, -1);    delay(3*1000);
set_MOTEUR(MOTEUR_1_PIN_A, MOTEUR_1_PIN_B, 0);    delay(1*1000);
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

