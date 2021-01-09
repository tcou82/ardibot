#echo off

set arduino_path=D:\developpements\raspibot\Arduino
set arduino_type=nano
set arduino_firmware=atmega328old


%arduino_path%\arduino-builder -compile -logger=machine -hardware %arduino_path%\hardware -tools %arduino_path%\tools-builder -tools %arduino_path%\hardware\tools\avr -built-in-libraries %arduino_path%\libraries -libraries C:\Users\tcou8\Documents\Arduino\libraries -fqbn=arduino:avr:%arduino_type%:cpu=%arduino_firmware%  -ide-version=10813 -build-path %arduino_path%\tmp\build  -build-cache %arduino_path%\tmp\cache -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.avr-gcc.path=%arduino_path%\hardware\tools\avr -prefs=runtime.tools.avr-gcc-7.3.0-atmel3.6.1-arduino7.path=%arduino_path%\hardware\tools\avr -prefs=runtime.tools.avrdude.path=%arduino_path%\hardware\tools\avr -prefs=runtime.tools.avrdude-6.3.0-arduino17.path=%arduino_path%\hardware\tools\avr -prefs=runtime.tools.arduinoOTA.path=%arduino_path%\hardware\tools\avr -prefs=runtime.tools.arduinoOTA-1.3.0.path=%arduino_path%\hardware\tools\avr  %arduino_path%\tmp\app.ino > %arduino_path%\tmp\std.log 2> %arduino_path%\tmp\err.log

if %ERRORLEVEL% GEQ 1 exit 1

%arduino_path%\hardware\tools\avr/bin/avrdude -C%arduino_path%\hardware\tools\avr/etc/avrdude.conf -v -patmega328p -carduino -PCOM3 -b57600 -D -Uflash:w:%arduino_path%\tmp\build/app.ino.hex:i  > %arduino_path%\tmp\std.log 2> %arduino_path%\tmp\err.log

if %ERRORLEVEL% GEQ 1 exit 2

exit 0


