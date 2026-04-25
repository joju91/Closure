@echo off
REM Enkel launcher som kör Fix-Notepad.ps1 utan att behöva justera ExecutionPolicy.
REM Dubbelklicka denna fil. UAC-prompten kommer från PowerShell-scriptet.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Fix-Notepad.ps1"
