@echo off
setlocal
chcp 65001 >nul
title Ahn's Newsletter Sync

echo ===============================================
echo Ahn's Newsletter Sync
echo ===============================================
echo.
echo Netlify 신청 확인 후 Spread Newsletter Subscribers 동기화를 실행합니다.
echo 완료 후 이 창은 자동으로 닫히지 않습니다.
echo.

wsl.exe bash -lc "cd /mnt/c/dev/active/ahn-partners && if [ -s ~/.nvm/nvm.sh ]; then . ~/.nvm/nvm.sh; fi; npm run newsletter:run; status=\$?; echo; if [ \$status -eq 0 ]; then echo '[OK] Newsletter sync complete.'; else echo '[ERROR] Newsletter sync failed. Check login/session and run again.'; fi; echo; read -r -p 'Press Enter to close this window...' _; exit \$status"

endlocal
