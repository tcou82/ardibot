echo off
set ardibot_path=%cd%
cd /d %ardibot_path%/server
start "" http://localhost:8000
%ardibot_path%\python39\python.exe src\main.py
