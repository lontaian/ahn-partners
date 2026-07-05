@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "C:\dev\active\ahn-partners"
if not exist exports mkdir exports

echo ===============================================>> exports\newsletter-scheduled.log
echo [%DATE% %TIME%] Ahn's Newsletter scheduled sync start>> exports\newsletter-scheduled.log

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Windows Node.js not found>> exports\newsletter-scheduled.log
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Windows npm not found>> exports\newsletter-scheduled.log
  exit /b 1
)

call npm run newsletter:run >> exports\newsletter-scheduled.log 2>&1
set "STATUS=!ERRORLEVEL!"
echo [%DATE% %TIME%] Ahn's Newsletter scheduled sync exit=!STATUS!>> exports\newsletter-scheduled.log
exit /b !STATUS!
