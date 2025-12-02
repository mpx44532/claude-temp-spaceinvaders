# Space Invaders Game

A classic Space Invaders arcade game built with HTML5, CSS3, and vanilla JavaScript.

## Features

- Classic arcade gameplay with modern HTML5 canvas rendering
- 5 rows of colorful alien invaders (55 enemies total)
- Smooth player controls with arrow keys
- Progressive difficulty - enemies speed up as you destroy them
- Score tracking and lives system
- Retro arcade-style UI with neon green theme
- Level progression with increasing challenge
- Game over screen with restart functionality

## Installation

### Option 1: Direct Browser Opening (Simplest)

1. Extract the `space-invaders.zip` file to a folder on your laptop
2. Simply double-click `index.html` to open it in your default browser
3. Click "Start Game" and enjoy!

Note: Some browsers may block certain features when opening files directly. If you experience issues, use Option 2 or 3.

### Option 2: Using the Launch Script

**For Windows:**
1. Extract the zip file
2. Double-click `launch.bat`
3. Your browser will automatically open the game

**For Mac/Linux:**
1. Extract the zip file
2. Open Terminal in the game folder
3. Run: `./launch.sh`
4. Your browser will automatically open the game

### Option 3: Manual Server Launch

If you have Python installed (comes pre-installed on Mac/Linux):

1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to the game folder:
   ```bash
   cd path/to/space-invaders
   ```
3. Start a local server:

   **Python 3:**
   ```bash
   python3 -m http.server 8000
   ```

   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

4. Open your browser and go to: `http://localhost:8000`

Alternative with Node.js (if installed):
```bash
npx http-server -p 8000
```

## How to Play

### Controls
- **← Left Arrow** - Move spaceship left
- **→ Right Arrow** - Move spaceship right
- **Spacebar** - Shoot bullets

### Objective
- Destroy all alien invaders before they reach the bottom
- Avoid enemy fire
- Each destroyed enemy = 10 points
- Complete a level = 100 bonus points
- You have 3 lives

### Game Mechanics
- You can have up to 5 bullets on screen at once
- Enemies move side-to-side and descend when hitting screen edges
- Enemies randomly shoot back at you
- Game difficulty increases as you destroy enemies
- New wave of enemies appears when you clear a level

## System Requirements

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No internet connection required
- Works on Windows, Mac, and Linux

## Files Included

- `index.html` - Main game page
- `game.js` - Game logic and mechanics
- `styles.css` - Visual styling
- `README.md` - This file
- `launch.bat` - Windows launch script
- `launch.sh` - Mac/Linux launch script

## Troubleshooting

**Game won't start:**
- Make sure JavaScript is enabled in your browser
- Try using a local server (Option 2 or 3)

**Controls not working:**
- Click on the game canvas first to focus it
- Make sure the game is started (click "Start Game")

**Performance issues:**
- Close other browser tabs
- Try a different browser (Chrome recommended)

## Credits

Created with vanilla JavaScript - no frameworks or libraries required!

Enjoy the game! 🚀👾
