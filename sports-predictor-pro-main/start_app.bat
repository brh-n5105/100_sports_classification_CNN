@echo off
echo ===================================================
echo      Sports Predictor Pro - Auto Installer & Launcher
echo ===================================================
echo.

echo [1/3] Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error installing Python dependencies!
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Installing Node.js dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing Node.js dependencies!
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Starting Application (Backend + Frontend)...
echo.
echo The application will open in your browser shortly.
echo Press Ctrl+C to stop the server.
echo.

call npm run dev:all
pause
