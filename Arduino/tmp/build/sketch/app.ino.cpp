#include <Arduino.h>
#line 1 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
#include <Servo.h>

int REVERSE = -1;
int inters [20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
const int SONAR_1_PIN = 6; 
const int LED_1_PIN = 10; 
    float tempo = 9;

#line 9 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
void setup();
#line 14 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
void loop();
#line 25 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
float get_SONAR(int npin);
#line 38 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
int get_INTER(int npin);
#line 53 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
void set_MOTEUR(int npinA, int npinB, int val);
#line 9 "D:\\developpements\\ardibot\\Arduino\\tmp\\app.ino"
void setup() { 
    Serial.begin(9600); // Default communication rate of the Bluetooth module
    Serial.println("Initialisation connexion:");
    pinMode(LED_1_PIN, OUTPUT); 
}
void loop() {
    tempo = get_SONAR(SONAR_1_PIN) / 50;
    if (tempo < 2) {
    digitalWrite(LED_1_PIN, LOW);
    delay(tempo*1000);
    digitalWrite(LED_1_PIN, HIGH);

}
    delay(tempo*1000);
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

