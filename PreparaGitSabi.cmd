@REM @Author: Faber
@REM @Date:   2022-03-13 15:36:13
@REM @Last Modified by:   Faber
@REM Modified time: 2022-03-14 00:15:35
@REM configura git per usare repository in altra cartella
@REM
@REM
@echo off
@chcp 65001


:: credenziali GIT
set REMOTE=git remote add origin https://github.com/Ilmosaicodanza/ilmosaicodanza.it.git
set nome=ilmosaico
set username=ilmosaicodanza
set password=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
SET caricagit=caricagit.cmd
:: ==========================
:: non toccare da qui in poi
:: =========================

if %COMPUTERNAME%==ARCADIA COLOR CF && figlet COMPUTER SBAGLIATO && ping localhost>NUL && GOTO :EOF

setlocal ENABLEEXTENSIONS
set BASEPATH=%~dp0
pushd "%BASEPATH%"
for %%* in (.) do set LOCALPATH=%%~n*
set GITBASE=%userprofile%\documents\gitDropbox
set GITDOCS=%GITBASE%\%LOCALPATH%.git

if not exist "%GITBASE%" echo creo "%GITBASE%" && mkdir "%GITBASE%"

if not exist %caricagit% call :CREACARICAGIT

If exist .git echo file .git esiste && GOTO :GITESISTE

:PREPARAGIT
echo git init --separate-git-dir=%GITDOCS%
git init --separate-git-dir=%GITDOCS%
echo git config user.name "%nome%"
git config user.name "%nome%"
echo git config user.password "%password%"
git config user.password "%password%"
git config credential.username "%username%"
%REMOTE%
git branch -M main
git add .
set MSG=ERRORE DURANTE caricaGit.cmd
%caricagit% || GOTO :ERRORE


:GITESISTE
if exist .gitignore goto :FINE

echo creo *.php in .gitignore
echo ^*.php>.gitignore
echo creo *.cmd in .gitignore
echo ^*.cmd>>.gitignore

:FINE
color A0
figlet GIT OK
ping localhost>NUL
GOTO :EOF

:ERRORE
color cf
ECHO.
ECHO %MSG%
pause

:CREACARICAGIT
>%CARICAGIT% (
echo @echo off
echo @chcp 65001
echo echo.
echo color 70
echo git add .
echo.
echo SET /P MSG=messaggio del commit?
echo git commit -m "%%MSG%%"
echo git push -u origin main ^|^| GOTO :ERRORE
echo color A0
echo ping -n 2 localhost^>NUL
echo goto :EOF
echo.
echo :ERRORE
echo color CF
echo ECHO.
echo ECHO.
echo pause
)
GOTO :EOF