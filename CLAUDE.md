# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A classic Space Invaders arcade game built with vanilla JavaScript, HTML5 Canvas, and CSS3. No frameworks or build tools required - this is a pure client-side web application.

## Running the Game

### Development
Open `index.html` directly in a browser, or use a local server for better compatibility:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000
```

Then navigate to `http://localhost:8000`

### Launch Scripts
- **Windows**: Double-click `launch.bat`
- **Mac/Linux**: Run `./launch.sh`

## Architecture

### File Structure
- `index.html` - Single-page application entry point with canvas element and UI controls
- `game.js` - All game logic and rendering (vanilla JavaScript, ~355 lines)
- `styles.css` - Retro arcade styling with neon green theme

### Game Loop Architecture

The game uses `requestAnimationFrame` for the main game loop (game.js:302):

1. **Clear canvas** - Fills background with black
2. **Draw phase** - Renders player, enemies, bullets (in that order)
3. **Update phase** - Updates positions for player, bullets, enemies
4. **Collision detection** - Checks bullet hits, player damage, game over conditions

### Core Game Objects

All game state is managed through global objects and arrays in `game.js`:

- `player` (object) - x, y, width, height, speed, dx properties
- `enemies` (array) - Grid of enemy objects with x, y, width, height, alive, type
- `playerBullets` (array) - Active player projectiles
- `enemyBullets` (array) - Active enemy projectiles

### Enemy Formation System

Enemies are created in a 5x11 grid (55 total) with different colors per row (game.js:59-73):
- Row 0 (top): Green
- Row 1: White
- Row 2: Red
- Row 3: Gray
- Row 4 (bottom): Blue

Movement pattern:
- Horizontal sweep across screen
- Drop down when hitting edge (game.js:170-177)
- Direction reversal on edge hit

### Difficulty Scaling

Progressive difficulty is implemented through:
- `enemySpeed` increases by 0.2 for every 10 enemies destroyed (game.js:207-209)
- `enemySpeed` increases by 0.5 on level completion (game.js:277)
- Random enemy shooting probability is constant at 1% per frame (game.js:180)

### Collision Detection

Axis-aligned bounding box (AABB) collision (game.js:191-242):
- Player bullets vs enemies
- Enemy bullets vs player
- Enemy position vs player baseline (instant game over)

### Canvas Rendering

Fixed canvas size: 800x600 pixels (game.js:4-5)

Drawing techniques:
- Player: Custom triangle path with cyan cockpit detail (game.js:76-88)
- Enemies: Rectangles with white eyes and antenna strokes (game.js:91-117)
- Bullets: Simple rectangles - green for player, red for enemies (game.js:120-130)

## Game Constants

Key tunable parameters in `game.js`:
- `bulletSpeed = 7` (player projectile speed)
- `enemyBulletSpeed = 3` (enemy projectile speed)
- `player.speed = 5` (horizontal movement speed)
- `enemyDropDistance = 20` (pixels enemies drop when changing direction)
- Maximum 5 player bullets on screen (game.js:246)

## State Management

Game state is controlled by:
- `gameRunning` boolean flag
- `score` and `lives` tracked globally
- DOM updates via `updateScore()` and `updateLives()` (game.js:255-262)
- Game over handled by `gameOver()` showing overlay and stopping animation loop (game.js:265-272)
- Level progression handled by `nextLevel()` (game.js:274-280)

## Input Handling

Keyboard events (game.js:327-350):
- Arrow Left/Right: Sets `player.dx` to move
- Spacebar: Calls `shoot()` function
- Keys tracked in `keys` object to handle simultaneous releases

## No Build Process

This is a static web application with no build, transpilation, or bundling. All code runs directly in the browser. To modify:

1. Edit the relevant file (`game.js`, `styles.css`, or `index.html`)
2. Refresh browser to see changes
3. Use browser DevTools for debugging

## Distribution

Pre-packaged archives are included:
- `space-invaders-game.zip` - Standard zip archive
- `space-invaders-game.tar.gz` - Tarball archive

These contain all necessary files for distribution.
