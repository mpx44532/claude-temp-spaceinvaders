#!/bin/bash

echo "========================================"
echo "   Space Invaders Game Launcher"
echo "========================================"
echo ""
echo "Starting local web server..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Using Python 3 to start server..."
    echo ""
    echo "Server running at: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "Opening browser..."
    echo ""

    # Open browser based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open http://localhost:8000
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open http://localhost:8000 2>/dev/null || echo "Please open http://localhost:8000 in your browser"
    fi

    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Using Python to start server..."
    echo ""
    echo "Server running at: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "Opening browser..."
    echo ""

    # Open browser based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open http://localhost:8000
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open http://localhost:8000 2>/dev/null || echo "Please open http://localhost:8000 in your browser"
    fi

    python -m SimpleHTTPServer 8000
else
    echo "Python is not installed!"
    echo ""
    echo "Please either:"
    echo "1. Install Python from https://www.python.org/downloads/"
    echo "2. Or simply open index.html directly in your browser"
    echo ""
fi
