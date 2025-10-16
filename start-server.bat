@echo off
echo ================================================
echo   COA_Tools Backend Server - Setup and Start
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [1/3] Checking Node.js version...
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [2/3] Installing dependencies...
    echo This may take a minute...
    echo.
    call npm install
    echo.
    echo Dependencies installed successfully!
    echo.
) else (
    echo [2/3] Dependencies already installed
    echo.
)

echo [3/3] Starting server...
echo.
echo ================================================
echo   Server will start on http://localhost:3000
echo   Press Ctrl+C to stop the server
echo ================================================
echo.

node server.js

pause
