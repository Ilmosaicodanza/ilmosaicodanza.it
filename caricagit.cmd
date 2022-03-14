@echo off
@chcp 65001
echo.
color 70
git add .

SET /P MSG=messaggio del commit?
git commit -m "%MSG%"
git push -u origin main || GOTO :ERRORE
color A0
ping -n 2 localhost>NUL
goto :EOF

:ERRORE
color CF
ECHO.
ECHO.
pause
