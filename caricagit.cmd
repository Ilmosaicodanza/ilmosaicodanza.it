@echo off
@chcp 65001
echo.
color 70

pushd "%~dp0"

git add .
SET /P MSG=messaggio del commit?
git commit -m "%MSG%"
rem git push -u origin main || GOTO :ERRORE
git push https://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@github.com/Ilmosaicodanza/ilmosaicodanza.it.git || GOTO :ERRORE
color A0
popd
ping -n 2 localhost>NUL
goto :EOF

:ERRORE
color CF
ECHO.
ECHO.
pause

popd