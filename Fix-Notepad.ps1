# Fix-Notepad.ps1
# Rensar korrupta sessionsfiler som får Windows Notepad att frysa.
# Kör genom att högerklicka -> "Kör med PowerShell", eller:
#   powershell -ExecutionPolicy Bypass -File .\Fix-Notepad.ps1

[CmdletBinding()]
param()

# --- Self-elevate ---
$current = [Security.Principal.WindowsPrincipal]::new([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $current.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Begär administratörsrättigheter..." -ForegroundColor Yellow
    Start-Process -FilePath 'powershell.exe' `
        -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File',"`"$PSCommandPath`"" `
        -Verb RunAs
    exit
}

$ErrorActionPreference = 'Continue'
Write-Host "=== Notepad Session Cleaner ===" -ForegroundColor Cyan

# 1. Stoppa alla Notepad-processer
Write-Host "`n[1/4] Stoppar Notepad-processer..." -ForegroundColor Yellow
$procs = Get-Process -Name 'notepad','Notepad','WindowsNotepad' -ErrorAction SilentlyContinue
if ($procs) {
    $procs | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    Write-Host "  Stoppade $($procs.Count) process(er)." -ForegroundColor Green
} else {
    Write-Host "  Inga Notepad-processer kördes." -ForegroundColor DarkGray
}

# 2. Bygg lista över sessionssökvägar och radera
Write-Host "`n[2/4] Tar bort sessionsfiler/mappar..." -ForegroundColor Yellow

$paths = @()
$paths += Get-ChildItem -Path "$env:LOCALAPPDATA\Packages" -Filter 'Microsoft.WindowsNotepad_*' -Directory -ErrorAction SilentlyContinue |
    ForEach-Object { Join-Path $_.FullName 'LocalState' }
$paths += "$env:APPDATA\Notepad"
$paths += "$env:LOCALAPPDATA\Microsoft\Windows\Notepad"

function Remove-PathSafe {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        Write-Host "  Saknas:    $Path" -ForegroundColor DarkGray
        return $true
    }
    Write-Host "  Tar bort:  $Path" -ForegroundColor Gray
    # Nolla read-only/system-attribut som kan blockera radering
    Get-ChildItem -LiteralPath $Path -Recurse -Force -ErrorAction SilentlyContinue |
        ForEach-Object {
            try { $_.Attributes = 'Normal' } catch { }
        }
    try {
        Remove-Item -LiteralPath $Path -Recurse -Force -ErrorAction Stop
        Write-Host "    OK" -ForegroundColor Green
        return $true
    } catch {
        Write-Warning "    Misslyckades: $($_.Exception.Message)"
        return $false
    }
}

foreach ($p in $paths) { [void](Remove-PathSafe -Path $p) }

# 3. Rensa registry
Write-Host "`n[3/4] Rensar registry..." -ForegroundColor Yellow
$regPaths = @(
    'HKCU:\Software\Microsoft\Notepad',
    'HKCU:\Software\Microsoft\Windows\CurrentVersion\Applets\Notepad'
)
foreach ($r in $regPaths) {
    if (Test-Path $r) {
        try {
            Remove-Item -Path $r -Recurse -Force -ErrorAction Stop
            Write-Host "  Borttagen: $r" -ForegroundColor Green
        } catch {
            Write-Warning "  Misslyckades: $r - $($_.Exception.Message)"
        }
    } else {
        Write-Host "  Saknas:    $r" -ForegroundColor DarkGray
    }
}

# 4. Verifiera
Write-Host "`n[4/4] Verifierar..." -ForegroundColor Yellow
$remaining = $paths | Where-Object { Test-Path -LiteralPath $_ }
if ($remaining) {
    Write-Host "  Följande sökvägar finns kvar:" -ForegroundColor Red
    $remaining | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
    Write-Host "`nKlart med varningar. Starta om datorn och kör scriptet igen om problemet kvarstår." -ForegroundColor Yellow
    $exitCode = 1
} else {
    Write-Host "  Alla sessionssökvägar rensade." -ForegroundColor Green
    Write-Host "`nKlart! Notepad ska nu starta normalt." -ForegroundColor Cyan
    $exitCode = 0
}

Write-Host "`nTryck Enter för att stänga..." -ForegroundColor DarkGray
[void](Read-Host)
exit $exitCode
