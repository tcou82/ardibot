set arduino_path=D:\developpements\raspibot\Arduino
set arduino_type=nano
set arduino_firmware=atmega328old


%arduino_path%\hardware\tools\avr/bin/avrdude -C%arduino_path%\hardware\tools\avr/etc/avrdude.conf -v -patmega328p -carduino -PCOM3 -b57600 -D -Uflash:w:%arduino_path%\tools_tcou\stop.hex:i 

