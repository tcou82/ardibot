# 1 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino"
# 2 "D:\\developpements\\raspibot\\Arduino\\tmp\\app.ino" 2

int inters [20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
const int MOTEUR_1_PIN_A = 4;
const int MOTEUR_1_PIN_B = 5;
void setup() {
    Serial.begin(9600); // Default communication rate of the Bluetooth module
    Serial.println("Initialisation connexion:"); pinMode(MOTEUR_1_PIN_A, 0x1);
    pinMode(MOTEUR_1_PIN_B, 0x1);
}
void loop() {
set_MOTEUR(MOTEUR_1_PIN_A, MOTEUR_1_PIN_B, 1); delay(3*1000);
set_MOTEUR(MOTEUR_1_PIN_A, MOTEUR_1_PIN_B, 0); delay(1*1000);
set_MOTEUR(MOTEUR_1_PIN_A, MOTEUR_1_PIN_B, -1); delay(3*1000);
set_MOTEUR(MOTEUR_1_PIN_A, MOTEUR_1_PIN_B, 0); delay(1*1000);
}

float get_SONAR(int npin) {
    pinMode(npin, 0x1);
    digitalWrite(npin, 0x0);
    delayMicroseconds(2);
    digitalWrite(npin, 0x1);
    delayMicroseconds(10);
    digitalWrite(npin, 0x0);
    pinMode(npin, 0x0);
    float distance = pulseIn(npin, 0x1) / 58.00;
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
        digitalWrite(npinA, 0x1);
        digitalWrite(npinB, 0x0);
    } else if ( val == 0 ) {
        digitalWrite(npinA, 0x0);
        digitalWrite(npinB, 0x0);
    } else if ( val == -1) {
        digitalWrite(npinA, 0x0);
        digitalWrite(npinB, 0x1);
    }
}
