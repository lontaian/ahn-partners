@echo off
setlocal
chcp 65001 >nul
title Ahn's Newsletter Sync
cd /d "%~dp0"

echo ===============================================
echo Ahn's Newsletter Sync
echo ===============================================
echo.
echo Runs with Windows Node/NPM. WSL is not used.
echo It checks Netlify newsletter/contact forms and syncs Spread.
echo This window stays open after completion.
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Windows Node.js was not found.
  echo Install Node.js or check PATH.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Windows npm was not found.
  echo Install Node.js/npm or check PATH.
  echo.
  pause
  exit /b 1
)

call npm run newsletter:run
set STATUS=%ERRORLEVEL%
echo.
if "%STATUS%"=="0" (
  echo [OK] Newsletter sync complete.
) else (
  echo [ERROR] Newsletter sync failed.
  echo Spread/Relate login may be expired, or Windows Chrome/Edge may not be found.
  echo If needed, set CHROME_PATH to chrome.exe or msedge.exe.
)
echo.
pause
exit /b %STATUS%
