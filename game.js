// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Game state
let gameRunning = false;
let score = 0;
let lives = 3;
let gameLoop;

// Player
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 30,
    speed: 5,
    dx: 0
};

// Bullets
let playerBullets = [];
let enemyBullets = [];
const bulletSpeed = 7;
const enemyBulletSpeed = 3;

// Enemies
let enemies = [];
const enemyRows = 5;
const enemyCols = 11;
const enemyWidth = 40;
const enemyHeight = 30;
const enemyPadding = 10;
const enemyOffsetTop = 50;
const enemyOffsetLeft = 50;
let enemySpeed = 1;
let enemyDirection = 1;
let enemyDropDistance = 20;

// Controls
let keys = {};

// Initialize game
function init() {
    createEnemies();
    score = 0;
    lives = 3;
    player.x = canvas.width / 2 - 25;
    playerBullets = [];
    enemyBullets = [];
    enemySpeed = 1;
    updateScore();
    updateLives();
}

// Create enemy formation
function createEnemies() {
    enemies = [];
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            enemies.push({
                x: enemyOffsetLeft + col * (enemyWidth + enemyPadding),
                y: enemyOffsetTop + row * (enemyHeight + enemyPadding),
                width: enemyWidth,
                height: enemyHeight,
                alive: true,
                type: row
            });
        }
    }
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.closePath();
    ctx.fill();

    // Draw cockpit
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(player.x + player.width / 2 - 5, player.y + 10, 10, 10);
}

// Draw enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        if (enemy.alive) {
            // Different colors for different rows
            const colors = ['#00ff00', '#ffffff', '#ff0000', '#808080', '#0000ff'];
            ctx.fillStyle = colors[enemy.type];

            // Draw enemy body
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

            // Draw eyes
            ctx.fillStyle = '#fff';
            ctx.fillRect(enemy.x + 8, enemy.y + 8, 8, 8);
            ctx.fillRect(enemy.x + 24, enemy.y + 8, 8, 8);

            // Draw antennae
            ctx.strokeStyle = colors[enemy.type];
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(enemy.x + 10, enemy.y);
            ctx.lineTo(enemy.x + 5, enemy.y - 8);
            ctx.moveTo(enemy.x + 30, enemy.y);
            ctx.lineTo(enemy.x + 35, enemy.y - 8);
            ctx.stroke();
        }
    });
}

// Draw bullets
function drawBullets() {
    // Draw player bullets as violet snowballs
    playerBullets.forEach(bullet => {
        // Outer glow
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(138, 43, 226, 0.3)';
        ctx.fill();

        // Middle layer
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 112, 219, 0.7)';
        ctx.fill();

        // Core - violet
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#9370DB';
        ctx.fill();

        // Highlight for snowball effect
        ctx.beginPath();
        ctx.arc(bullet.x - 1, bullet.y - 1, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(230, 230, 250, 0.8)';
        ctx.fill();
    });

    // Draw enemy bullets as red circles
    enemyBullets.forEach(bullet => {
        // Outer glow
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
    });
}

// Update player position
function updatePlayer() {
    player.x += player.dx;

    // Boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Update bullets
function updateBullets() {
    // Update player bullets
    playerBullets = playerBullets.filter(bullet => {
        bullet.y -= bulletSpeed;
        return bullet.y > 0;
    });

    // Update enemy bullets
    enemyBullets = enemyBullets.filter(bullet => {
        bullet.y += enemyBulletSpeed;
        return bullet.y < canvas.height;
    });
}

// Update enemies
function updateEnemies() {
    let hitEdge = false;

    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemy.x += enemySpeed * enemyDirection;

            if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
                hitEdge = true;
            }
        }
    });

    if (hitEdge) {
        enemyDirection *= -1;
        enemies.forEach(enemy => {
            if (enemy.alive) {
                enemy.y += enemyDropDistance;
            }
        });
    }

    // Random enemy shooting
    if (Math.random() < 0.01 && enemies.some(e => e.alive)) {
        const aliveEnemies = enemies.filter(e => e.alive);
        const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        enemyBullets.push({
            x: shooter.x + shooter.width / 2,
            y: shooter.y + shooter.height
        });
    }
}

// Collision detection
function checkCollisions() {
    const bulletRadius = 4;

    // Player bullets hit enemies
    playerBullets.forEach((bullet, bulletIndex) => {
        enemies.forEach(enemy => {
            if (enemy.alive &&
                bullet.x + bulletRadius > enemy.x &&
                bullet.x - bulletRadius < enemy.x + enemy.width &&
                bullet.y + bulletRadius > enemy.y &&
                bullet.y - bulletRadius < enemy.y + enemy.height) {

                enemy.alive = false;
                playerBullets.splice(bulletIndex, 1);
                score += 10;
                updateScore();

                // Increase difficulty
                if (enemies.filter(e => e.alive).length % 10 === 0) {
                    enemySpeed += 0.2;
                }
            }
        });
    });

    // Enemy bullets hit player
    enemyBullets.forEach((bullet, bulletIndex) => {
        if (bullet.x + bulletRadius > player.x &&
            bullet.x - bulletRadius < player.x + player.width &&
            bullet.y + bulletRadius > player.y &&
            bullet.y - bulletRadius < player.y + player.height) {

            enemyBullets.splice(bulletIndex, 1);
            lives--;
            updateLives();

            if (lives <= 0) {
                gameOver();
            }
        }
    });

    // Enemy reaches bottom
    enemies.forEach(enemy => {
        if (enemy.alive && enemy.y + enemy.height >= player.y) {
            gameOver();
        }
    });

    // Check if all enemies destroyed
    if (enemies.every(e => !e.alive)) {
        nextLevel();
    }
}

// Shoot player bullet
function shoot() {
    if (playerBullets.length < 5) {
        playerBullets.push({
            x: player.x + player.width / 2,
            y: player.y
        });
    }
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Update lives display
function updateLives() {
    document.getElementById('lives').textContent = lives;
}

// Game over
function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(gameLoop);
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'inline-block';
}

// Next level
function nextLevel() {
    createEnemies();
    enemySpeed += 0.5;
    score += 100;
    updateScore();
}

// Clear canvas
function clear() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Main game loop
function update() {
    if (!gameRunning) return;

    clear();
    drawPlayer();
    drawEnemies();
    drawBullets();

    updatePlayer();
    updateBullets();
    updateEnemies();
    checkCollisions();

    gameLoop = requestAnimationFrame(update);
}

// Start game
function startGame() {
    if (gameRunning) return;

    init();
    gameRunning = true;
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('startBtn').style.display = 'none';
    update();
}

// Restart game
function restartGame() {
    document.getElementById('restartBtn').style.display = 'none';
    startGame();
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    if (e.key === 'ArrowLeft' || e.key === 'Left') {
        keys.left = true;
        player.dx = -player.speed;
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        keys.right = true;
        player.dx = player.speed;
    } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        shoot();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
        keys.left = false;
        if (!keys.right) player.dx = 0;
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
        keys.right = false;
        if (!keys.left) player.dx = 0;
    }
});

// Initial draw
clear();
drawPlayer();
