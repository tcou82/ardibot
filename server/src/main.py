# -*- coding: utf-8 -*-

from http.server import BaseHTTPRequestHandler, HTTPServer
import ssl
import time, datetime

import os, sys, re
import json
import urllib.parse
from mimetypes import MimeTypes

SERVER_PORT = 8000
REP_INSTALL = 'D:\\developpements\\ardibot'
FIRMWARE = {'atmega328p': 'atmega328p',
            'atmega328old': 'atmega328p'}

class ServerHandler(BaseHTTPRequestHandler):
    '''
    Classe controleur
    '''
    def _set_headers(self, url,ret=200):
        self.send_response(ret)
        self.send_header('Content-type', mime.guess_type(url)[0])
        self.end_headers()

    def do_GET(self):
        '''
        Traitement des requetes GET : recup fichiers html, css, js, ico ...
        '''
        print('Reception GET '+self.path)
        if self.path == '/':
            _path = 'static/html/page.html'
        else:
            _path = 'static'+self.path
        print('path : '+_path)
        if os.path.exists(_path):
            self._set_headers(_path)
            self.wfile.write(self.get_page(_path))
        else:
            self._set_headers(_path[-4:], 404)
            self.wfile.write(self.get_page('static/html/404.html'))

    def do_HEAD(self):
        self._set_headers() 

    def do_POST(self):
        '''
        Traitement des requetes POST : invoque service rest json ...
        '''
        print('Reception POST : '+self.path)
        content_length = int(self.headers['Content-Length'])
        _datareq = self.rfile.read(content_length)
            
        self.comobj = json.loads(_datareq)
        self.comobj['cret'] = '0'
        self.comobj['lret'] = ''
        self.comobj['logerr'] = ''

        _path_nodes = self.path.split('/')
        if _path_nodes[1] in ['run', 'stop']:
            print('Traitement '+_path_nodes[1])
            self.traiter_demande(_path_nodes[1])
        elif _path_nodes[1] in ['read', 'save', 'list']:
            print('Traitement '+_path_nodes[1])
            self.traiter_stock(_path_nodes[1])
        else:    
            self.comobj['cret'] = '1'
            self.comobj['lret'] = '''Action demandée inconnue'{}'  !!!'''.format(self.path)

        _datarep = json.dumps(self.comobj)
        print('Reponse : ')
        print(_datarep)
        self._set_headers('hh.json')
        self.wfile.write(_datarep.encode('utf-8'))

    def get_page(self, path):
        with open(path, 'rb') as _file:
            _content = _file.read()
        return _content

    def traiter_stock(self, cmd):
        _path_projets = os.path.join(REP_INSTALL,'Projets')
        if not os.path.exists(_path_projets):
            os.makedirs(_path_projets)
        
        if cmd == 'save':
            _path_prj = os.path.join(_path_projets,self.comobj['projet']['name']+'.prj')
            with open(_path_prj, 'w') as _fprj:
                json.dump(self.comobj['projet'], _fprj, indent=4)
            self.comobj['lret'] = "Le projet a bien été enregistré"
        elif cmd == 'read':
            _path_prj = os.path.join(_path_projets,self.comobj['projet']['name']+'.prj')
            with open(_path_prj, 'r') as _fprj:
                self.comobj['projet'] = json.loads(_fprj.read())
            self.comobj['lret'] = "Le projet a bien été importé"
        elif cmd == 'list':
            self.comobj['projets'] = []
            for _file in os.listdir(_path_projets):
                if _file[-4:] == '.prj':
                    self.comobj['projets'].append(_file[:-4])
            self.comobj['lret'] = "La liste des projets a bien été récupérée"

    def traiter_demande(self, cmd):
        self.comobj['tmp'] = {}
        if cmd != 'stop':
            _instructions = self.comobj['projet']['instructions']
            self.generer_source(cmd, _instructions)
            self.comobj['lret'] = '''Demande téléversement réalisée avec succés'''
        else:
            self.comobj['lret'] = '''Demande interruption réalisée avec succés'''
        self.comobj['cret'] = '0'
        self.compiler_televerser(cmd)


    def generer_source(self, cmd, instructions):
        _elts = {}
        _parts = {'define': '''#include <Servo.h>\n
int REVERSE = -1;
int inters [20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
''', 'init': '', 'loop': '', 'fct': ''}
        _isblock = False
        for _sect in ['init', 'loop', 'fct']:
            for _inst in instructions[_sect]:
                print(str(_inst))
                # Setup - declaration GPIO
                if  _isblock and not _inst['block']:
                    _parts[_sect] += '\n}\n'
                    _isblock = False
                
                if _inst['tins'] == 'dp':
                    #_define += '#define {}_PIN {} \n'.format(_inst['elt1'], _inst['pin'])
                    if _inst['elt'][:3] == 'LED':
                        _parts['define'] += 'const int {}_PIN = {}; \n'.format(_inst['elt'], _inst['pin'])
                        _parts[_sect]   += '    pinMode({}_PIN, {}); \n'.format(_inst['elt'], _inst['pin_mode'])
                        _elts[_inst['elt']] = {'fmt': 'int', 'val': '    digitalWrite({0}_PIN, {2}{1}{2});\n', 'del': ''}
                    elif _inst['elt'][:6] == 'BUZZER':
                        _parts['define'] += 'const int {}_PIN = {}; \n'.format(_inst['elt'], _inst['pin'])
                        _parts[_sect]   += '    pinMode({}_PIN, {}); \n'.format(_inst['elt'], _inst['pin_mode'])
                        _elts[_inst['elt']] = {'fmt': 'int', 'val': '    digitalWrite({0}_PIN, {2}{1}{2});\n', 'del': ''}
                    elif _inst['elt'][:5] == 'SERVO':
                        _parts['define'] += 'const int {}_PIN = {}; \n'.format(_inst['elt'], _inst['pin'])
                        _parts['define'] += 'Servo {}; \n'.format(_inst['elt'])
                        _parts[_sect]   += '    {}.attach({}); \n'.format(_inst['elt'], _inst['pin'])
                        _elts[_inst['elt']] = {'fmt': 'int', 'val': '    {0}.write({2}{1}{2});\n', 'del': ''}
                    elif _inst['elt'][:5] == 'SONAR':
                        _parts['define'] += 'const int {}_PIN = {}; \n'.format(_inst['elt'], _inst['pin'])
                        _elts[_inst['elt']] = {'fmt': 'float', 'val': 'get_{0}', 'del': ''}
                    elif _inst['elt'][:5] == 'INTER':
                        _parts['define'] += 'const int {}_PIN = {}; \n'.format(_inst['elt'], _inst['pin'])
                        _parts[_sect]   += '    pinMode({}_PIN, {}); \n'.format(_inst['elt'], _inst['pin_mode'])
                        _elts[_inst['elt']] = {'fmt': 'int', 'val': 'get_{0}', 'del': ''}
                    elif _inst['elt'][:7] == 'MOTEUR_':
                        _parts['define'] += 'const int {}_PIN_A = {}; \n'.format(_inst['elt'], _inst['pin'])
                        _parts['define'] += 'const int {}_PIN_B = {}; \n'.format(_inst['elt'], int(_inst['pin'])+1)
                        _parts[_sect]   += '    pinMode({}_PIN_A, {}); \n'.format(_inst['elt'], _inst['pin_mode'])
                        _parts[_sect]   += '    pinMode({}_PIN_B, {}); \n'.format(_inst['elt'], _inst['pin_mode'])
                        _elts[_inst['elt']] = {'fmt': 'int', 'val': '    set_MOTEUR({0}_PIN_A, {0}_PIN_B, {2}{1}{2});\n', 'del': ''}
                elif _inst['tins'] == 'dv':
                    if _inst['telt1'] != 'elt':
                        if re.match('(^[0-9\.]*$)|(^LOW$)|(^HIGH$)|(^REVERSE$)', _inst['elt1']):
                            print('valeur numerique')
                            _elts[_inst['elt']] = {'fmt': '    float {0} = {1};\n', 'val': '    {0} = {2}{1}{2};\n', 'del': ''}
                            print(str(_elts[_inst['elt']]))
                        else:
                            print('valeur alpha')
                            _elts[_inst['elt']] = {'fmt': '    char * {0};\n    {0} = malloc(50);\n    strcpy({0}, {2}{1}{2});\n', 'val': '    strcpy({0}, {2}{1}{2});\n', 'del': '"'}
                            print(str(_elts[_inst['elt']]))
                        _parts['define'] += _elts[_inst['elt']]['fmt'].format(_inst['elt'], _inst['elt1'], _elts[_inst['elt']]['del'])
                    else:
                        print('Valo avec autre variable')
                        _elts[_inst['elt']] = {'fmt': _elts[_inst['elt2']]['fmt'], 'val': _elts[_inst['elt1']]['val'], 'del': _elts[_inst['elt2']]['del']}
                        _parts['define'] += _elts[_inst['elt']]['fmt'].format(_inst['elt'], _inst['elt1'], _elts[_inst['elt1']]['del'])
                        print(str(_elts[_inst['elt']]))
                elif _inst['tins'] == 'av':
                    if _inst['telt1'] != 'elt':
                        _parts[_sect] += _elts[_inst['elt']]['val'].format(_inst['elt'], _inst['elt1'], _elts[_inst['elt']]['del'])
                    else:
                        _parts[_sect] += _elts[_inst['elt']]['val'].format(_inst['elt'], self.get_elt(_inst['elt1']), '')
                elif _inst['tins'] == 'ac':
                    if _inst['telt2'] != 'elt':
                        _parts[_sect] +='    {0} = {1} {2} {3};\n'.format(_inst['elt'], self.get_elt(_inst['elt1']), _inst['ope'], _inst['elt2'])
                    else:
                        _parts[_sect] +='    {0} = {1} {2} {3};\n'.format(_inst['elt'], self.get_elt(_inst['elt1']), _inst['ope'], self.get_elt(_inst['elt2']))
                elif _inst['tins'] == 'at':
                    if _inst['telt1'] != 'elt':
                        _parts[_sect] += '    delay({}*1000);\n'.format(_inst['elt1'])
                    else:
                        _parts[_sect] += '    delay({}*1000);\n'.format(self.get_elt(_inst['elt1']))
                elif _inst['tins'] == 'ae':
                    _parts[_sect] += '    '+_inst['fct']+'();\n'
                elif _inst['tins'] == 'ci':
                    if _inst['ope'] == '=':
                        _inst['ope'] = '=='
                    if _inst['telt1'] != 'elt':
                        _parts[_sect] += '    if ({0} {1} {2}) {{\n'.format(self.get_elt(_inst['elt']), _inst['ope'], _inst['elt1'])
                    else:
                        _parts[_sect] += '    if ({0} {1} {2}) {{\n'.format(self.get_elt(_inst['elt']), _inst['ope'], self.get_elt(_inst['elt1']))
                    _isblock = True
                elif _inst['tins'] == 'ce':
                    _parts[_sect] += '    else { '
                    _isblock = True
                elif _inst['tins'] == 'cw':
                    if _inst['ope'] == '=':
                        _inst['ope'] = '=='
                    if _inst['telt1'] != 'elt':
                        _parts[_sect] += '    while ({0} {1} {2}) {{\n'.format(_inst['elt'], _inst['ope'], _inst['elt1'])
                    else:
                        _parts[_sect] += '    while ({0} {1} {2}) {{\n'.format(_inst['elt'], _inst['ope'], _inst['elt1'])
                    _isblock = True
                elif _inst['tins'] == 'fd':
                    _parts[_sect] += '\n'
                    _parts[_sect] += 'void '+_inst['fct']+' () { \n'
                elif _inst['tins'] == 'ff':
                    _parts[_sect] += '}\n'

            if _isblock:
                _parts[_sect] += '    }\n'
                _isblock = False

#}
#void loop() {
#  digitalWrite(12, HIGH); 
##  delay(1000);                     
#  digitalWrite(12, LOW);   
#  delay(1000);                      
#}
#            \n''')
        # Ecriture source genere
        _path_tmp = os.path.join(REP_INSTALL,'Arduino','tmp')
        if not os.path.exists('tmp'):
            os.makedirs('tmp')
        _path_src = os.path.join(_path_tmp,'app.ino')
        self.comobj['tmp']['path_src'] = _path_src
        with open(_path_src, 'w') as _fsrc:
            # Setup - declaration GPIO et init
            _fsrc.write(_parts['define'])
            _fsrc.write('''
void setup() { 
    Serial.begin(9600); // Default communication rate of the Bluetooth module
    Serial.println("Initialisation connexion:");
''')
            _fsrc.write(_parts['init'])
            _fsrc.write('}\n')
            _fsrc.write('void loop() {\n')
            _fsrc.write(_parts['loop'])
            _fsrc.write('}\n')
            _fsrc.write(_parts['fct'])
            _fsrc.write('''
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
''')

    def get_elt(self, elt):
        if len(elt) > 6 and elt[:6] == 'SONAR_':
            return 'get_SONAR({}_PIN)'.format(elt)
        elif len(elt) > 6 and elt[:6] == 'INTER_':
            return 'get_INTER({}_PIN)'.format(elt)
        return elt
     
    def compiler_televerser(self, cmd):
        _path_tools = os.path.join(REP_INSTALL,'Arduino','tools_tcou')
        _command = '{}\\{}.cmd {} {} {} {} {}'.format(_path_tools,
                                                cmd, 
                                                REP_INSTALL,
                                                self.comobj['projet']['device'], 
                                                FIRMWARE[self.comobj['projet']['firmware']],
                                                self.comobj['projet']['firmware'], 
                                                self.comobj['projet']['port'])
        print('Commande : \n'+_command)
        _cret = os.system(_command)
        if _cret > 0:
            if _cret == 1:
                self.comobj['lret'] = 'Erreur de compilation  - Code erreur : '+str(_cret)
            else:
                self.comobj['lret'] = 'Erreur de téléversement  - Code erreur : '+str(_cret)
            self.comobj['cret'] = '2'
            with open(os.path.join(REP_INSTALL, 'Arduino', 'tmp', 'err.log'), 'r') as _ferr:
                self.comobj['logerr'] = _ferr.read().replace('\n', '<br>')
        
if __name__ == "__main__":
    mime = MimeTypes()
    
    _server_address = ('', SERVER_PORT)
    httpd = HTTPServer(_server_address, ServerHandler)

    print('='*80)
    print('ArdiBot Server - '+datetime.datetime.today().strftime('%Y/%m/%d %H:%M:%S'))
    print('='*80)
    print('Serveur lance sur port "{}", attente requetes'.format(SERVER_PORT))
    httpd.serve_forever()
