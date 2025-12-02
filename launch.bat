@echo off
echo ========================================
echo   Space Invaders Game Launcher
echo ========================================
echo.
echo Starting local web server...
echo.

REM Check if Python 3 is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python to start server...
    echo.
    echo Server running at: http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo Opening browser...
    echo.
    start http://localhost:8000
    python -m http.server 8000
) else (
    echo Python is not installed!
    echo.
    echo Please either:
    echo 1. Install Python from https://www.python.org/downloads/
    echo 2. Or simply open index.html directly in your browser
    echo.
    pause
)
