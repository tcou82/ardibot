set arduino_path=%1\Arduino
set arduino_type=%2
set arduino_cpu=%3
set arduino_firmware=%4
set arduino_port=%5


%arduino_path%\hardware\tools\avr/bin/avrdude -C%arduino_path%\hardware\tools\avr/etc/avrdude.conf -v -p%arduino_cpu% -carduino -P%arduino_port% -b57600 -D -Uflash:w:%arduino_path%\tools_tcou\stop.hex:i 

