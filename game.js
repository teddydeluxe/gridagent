// ============================================
// GRIDAGENT - Anomaly Collection Game
// ============================================

// Game constants
const CELL_SIZE = 20;
const BOARD_WIDTH = 28;
const BOARD_HEIGHT = 31;
const CANVAS_WIDTH = BOARD_WIDTH * CELL_SIZE;
const CANVAS_HEIGHT = BOARD_HEIGHT * CELL_SIZE;

// Game colors
const COLORS = {
    WALL: '#FF00FF',           // Hot magenta neon
    DOT: '#39FF14',            // Neon green
    POWER_PELLET: '#FFFF00',   // Electric yellow
    AGENT: '#00A896',          // Petrol green GridAgent chip
    AGENT_DARK: '#2D2D2D',     // Dark chip center
    // Anomaly colors (from the graphic)
    ANOMALY_CENTER: '#F5B041', // Golden yellow center
    ANOMALY_RING: '#E67E22',   // Orange ring
    ANOMALY_OUTER: '#FF5733',  // Red-orange outer pixels
    ANOMALY_DARK: '#2D2D2D',   // Dark center
    BACKGROUND: '#000000'      // Pure black
};

// Game board layout (28x31) - Circuit Board Design
// 0 = empty path, 1 = wall, 2 = dot, 3 = power pellet, 4 = anomaly spawn
const BOARD_LAYOUT = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
    [1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1],
    [1,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,1],
    [1,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,2,1],
    [1,2,2,2,2,2,1,1,2,2,2,2,2,0,0,2,2,2,2,2,1,1,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,1,2,2,2,2,0,0,2,2,2,2,1,1,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,2,1,1,2,1],
    [1,2,1,1,2,2,2,2,2,2,2,2,1,4,4,1,2,2,2,2,2,2,2,2,1,1,2,1],
    [1,2,1,1,2,1,1,2,1,1,1,2,1,4,4,1,2,1,1,1,2,1,1,2,1,1,2,1],
    [1,2,2,2,2,1,1,2,1,4,4,4,4,4,4,4,4,4,4,1,2,1,1,2,2,2,2,1],
    [1,2,1,1,2,1,1,2,1,4,4,4,4,4,4,4,4,4,4,1,2,1,1,2,1,1,2,1],
    [1,2,1,1,2,2,2,2,2,2,2,2,1,4,4,1,2,2,2,2,2,2,2,2,1,1,2,1],
    [1,2,1,1,2,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,2,1,1,2,1],
    [1,2,2,2,2,2,2,1,1,2,2,2,2,0,0,2,2,2,2,1,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1],
    [1,2,2,2,2,2,1,1,2,2,2,2,2,0,0,2,2,2,2,2,1,1,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,2,1],
    [1,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,1],
    [1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,2,1],
    [1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// GridAgent class - The player character
class GridAgent {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = 14 * CELL_SIZE;
        this.y = 1 * CELL_SIZE;  // Start at top center
        this.direction = 1;  // Start moving down
        this.nextDirection = 1;
        this.speed = 3;
        this.animPhase = 0;
    }

    update(board) {
        this.animPhase += 0.15;

        if (this.canMoveInDirection(this.nextDirection, board)) {
            this.direction = this.nextDirection;
        }

        if (this.canMoveInDirection(this.direction, board)) {
            switch (this.direction) {
                case 0: this.x += this.speed; break;
                case 1: this.y += this.speed; break;
                case 2: this.x -= this.speed; break;
                case 3: this.y -= this.speed; break;
            }
        }

        if (this.x < -CELL_SIZE) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = -CELL_SIZE;
    }

    canMoveInDirection(direction, board) {
        let testX = this.x;
        let testY = this.y;

        switch (direction) {
            case 0: testX += this.speed; break;
            case 1: testY += this.speed; break;
            case 2: testX -= this.speed; break;
            case 3: testY -= this.speed; break;
        }

        const padding = 2;
        const points = [
            { x: testX + padding, y: testY + padding },
            { x: testX + CELL_SIZE - padding, y: testY + padding },
            { x: testX + padding, y: testY + CELL_SIZE - padding },
            { x: testX + CELL_SIZE - padding, y: testY + CELL_SIZE - padding }
        ];

        for (const point of points) {
            const gridX = Math.floor(point.x / CELL_SIZE);
            const gridY = Math.floor(point.y / CELL_SIZE);

            if (gridX < 0 || gridX >= BOARD_WIDTH || gridY < 0 || gridY >= BOARD_HEIGHT) {
                continue;
            }

            if (board[gridY][gridX] === 1) {
                return false;
            }
        }

        return true;
    }

    draw(ctx) {
        const size = CELL_SIZE;
        const x = this.x;
        const y = this.y;
        
        ctx.save();
        
        const chipColor = COLORS.AGENT;
        
        ctx.fillStyle = chipColor;
        ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
        
        const innerSize = size * 0.45;
        const innerOffset = (size - innerSize) / 2;
        ctx.fillStyle = COLORS.AGENT_DARK;
        ctx.fillRect(x + innerOffset, y + innerOffset, innerSize, innerSize);
        
        ctx.fillStyle = chipColor;
        const pinSize = 2;
        const numPins = 3;
        
        for (let i = 0; i < numPins; i++) {
            const px = x + size * 0.25 + i * (size * 0.25);
            ctx.fillRect(px, y - 1, pinSize, 3);
            ctx.fillRect(px, y + size - 2, pinSize, 3);
        }
        
        for (let i = 0; i < numPins; i++) {
            const py = y + size * 0.25 + i * (size * 0.25);
            ctx.fillRect(x - 1, py, 3, pinSize);
            ctx.fillRect(x + size - 2, py, 3, pinSize);
        }
        
        const cornerLen = 4;
        const cornerWidth = 2;
        
        ctx.fillRect(x - 2, y + 2, cornerWidth, cornerLen);
        ctx.fillRect(x + 2, y - 2, cornerLen, cornerWidth);
        ctx.fillRect(x + size, y + 2, cornerWidth, cornerLen);
        ctx.fillRect(x + size - cornerLen - 2, y - 2, cornerLen, cornerWidth);
        ctx.fillRect(x - 2, y + size - cornerLen - 2, cornerWidth, cornerLen);
        ctx.fillRect(x + 2, y + size, cornerLen, cornerWidth);
        ctx.fillRect(x + size, y + size - cornerLen - 2, cornerWidth, cornerLen);
        ctx.fillRect(x + size - cornerLen - 2, y + size, cornerLen, cornerWidth);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(this.animPhase * 2) * 0.3})`;
        const dotSize = 2;
        let dotX = x + size / 2 - dotSize / 2;
        let dotY = y + size / 2 - dotSize / 2;
        
        switch (this.direction) {
            case 0: dotX = x + size - 5; break;
            case 1: dotY = y + size - 5; break;
            case 2: dotX = x + 3; break;
            case 3: dotY = y + 3; break;
        }
        
        ctx.beginPath();
        ctx.arc(dotX + dotSize/2, dotY + dotSize/2, dotSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    getGridPosition() {
        return {
            x: Math.floor((this.x + CELL_SIZE / 2) / CELL_SIZE),
            y: Math.floor((this.y + CELL_SIZE / 2) / CELL_SIZE)
        };
    }
}

// Anomaly class - Collectible entities that roam the maze
class Anomaly {
    constructor(x, y, type) {
        this.startX = x * CELL_SIZE;
        this.startY = y * CELL_SIZE;
        this.x = this.startX;
        this.y = this.startY;
        this.type = type; // 'alpha', 'beta', 'gamma', 'delta'
        this.direction = Math.floor(Math.random() * 4);
        this.speed = 1.5;
        this.collected = false;
        this.inSpawn = true;
        this.releaseTimer = 0;
        this.animPhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.1 + Math.random() * 0.05;
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.direction = Math.floor(Math.random() * 4);
        this.collected = false;
        this.inSpawn = true;
        this.releaseTimer = 0;
    }

    update(board) {
        this.animPhase += this.pulseSpeed;
        
        if (this.collected) return;

        // Release from spawn area
        if (this.inSpawn) {
            this.releaseTimer++;
            const releaseTime = { 'alpha': 0, 'beta': 90, 'gamma': 180, 'delta': 270, 'epsilon': 360, 'zeta': 450 };
            if (this.releaseTimer >= releaseTime[this.type]) {
                this.inSpawn = false;
                this.x = 13 * CELL_SIZE;
                this.y = 13 * CELL_SIZE;  // Exit point above spawn area
            }
            return;
        }

        // Random wandering AI
        this.chooseDirection(board);

        switch (this.direction) {
            case 0: this.x += this.speed; break;
            case 1: this.y += this.speed; break;
            case 2: this.x -= this.speed; break;
            case 3: this.y -= this.speed; break;
        }

        if (this.x < -CELL_SIZE) this.x = CANVAS_WIDTH;
        if (this.x > CANVAS_WIDTH) this.x = -CELL_SIZE;
    }

    chooseDirection(board) {
        const gridX = Math.floor((this.x + CELL_SIZE / 2) / CELL_SIZE);
        const gridY = Math.floor((this.y + CELL_SIZE / 2) / CELL_SIZE);

        const centerX = gridX * CELL_SIZE + CELL_SIZE / 2;
        const centerY = gridY * CELL_SIZE + CELL_SIZE / 2;
        const atCenter = Math.abs(this.x + CELL_SIZE / 2 - centerX) < this.speed &&
                        Math.abs(this.y + CELL_SIZE / 2 - centerY) < this.speed;

        if (!atCenter) return;

        this.x = gridX * CELL_SIZE;
        this.y = gridY * CELL_SIZE;

        // Random direction change
        if (Math.random() < 0.3) {
            const directions = [0, 1, 2, 3];
            const validDirs = directions.filter(dir => {
                let nextX = gridX;
                let nextY = gridY;
                switch (dir) {
                    case 0: nextX++; break;
                    case 1: nextY++; break;
                    case 2: nextX--; break;
                    case 3: nextY--; break;
                }
                if (nextX < 0 || nextX >= BOARD_WIDTH || nextY < 0 || nextY >= BOARD_HEIGHT) return true;
                return board[nextY][nextX] !== 1;
            });

            if (validDirs.length > 0) {
                this.direction = validDirs[Math.floor(Math.random() * validDirs.length)];
            }
        }

        // Check if current direction is blocked
        let nextX = gridX;
        let nextY = gridY;
        switch (this.direction) {
            case 0: nextX++; break;
            case 1: nextY++; break;
            case 2: nextX--; break;
            case 3: nextY--; break;
        }

        if (nextX >= 0 && nextX < BOARD_WIDTH && nextY >= 0 && nextY < BOARD_HEIGHT) {
            if (board[nextY][nextX] === 1) {
                // Turn around or find new direction
                const directions = [0, 1, 2, 3];
                const validDirs = directions.filter(dir => {
                    let nx = gridX;
                    let ny = gridY;
                    switch (dir) {
                        case 0: nx++; break;
                        case 1: ny++; break;
                        case 2: nx--; break;
                        case 3: ny--; break;
                    }
                    if (nx < 0 || nx >= BOARD_WIDTH || ny < 0 || ny >= BOARD_HEIGHT) return true;
                    return board[ny][nx] !== 1;
                });
                if (validDirs.length > 0) {
                    this.direction = validDirs[Math.floor(Math.random() * validDirs.length)];
                }
            }
        }
    }

    draw(ctx) {
        if (this.collected) return;

        const size = CELL_SIZE;
        const x = this.x;
        const y = this.y;
        const pulse = Math.sin(this.animPhase) * 0.15 + 1;
        const pixelSize = 2;
        
        ctx.save();
        
        // Draw the anomaly pixel art pattern
        // Outer red/coral pixels in a grid pattern
        ctx.fillStyle = COLORS.ANOMALY_OUTER;
        
        // Top row pixels
        for (let i = 0; i < 7; i++) {
            if (i === 0 || i === 6) continue; // Skip corners for now
            ctx.fillRect(x + 3 + i * 2, y, pixelSize, pixelSize);
        }
        
        // Second row
        ctx.fillRect(x + 3, y + 2, pixelSize, pixelSize);
        ctx.fillRect(x + 7, y + 2, pixelSize, pixelSize);
        ctx.fillRect(x + 11, y + 2, pixelSize, pixelSize);
        ctx.fillRect(x + 15, y + 2, pixelSize, pixelSize);
        
        // Left column pixels
        ctx.fillRect(x, y + 5, pixelSize, pixelSize);
        ctx.fillRect(x, y + 9, pixelSize, pixelSize);
        ctx.fillRect(x, y + 13, pixelSize, pixelSize);
        
        // Right column pixels
        ctx.fillRect(x + size - 2, y + 5, pixelSize, pixelSize);
        ctx.fillRect(x + size - 2, y + 9, pixelSize, pixelSize);
        ctx.fillRect(x + size - 2, y + 13, pixelSize, pixelSize);
        
        // Bottom row pixels
        for (let i = 0; i < 7; i++) {
            if (i === 0 || i === 6) continue;
            ctx.fillRect(x + 3 + i * 2, y + size - 2, pixelSize, pixelSize);
        }
        
        // Second to bottom row
        ctx.fillRect(x + 3, y + size - 4, pixelSize, pixelSize);
        ctx.fillRect(x + 7, y + size - 4, pixelSize, pixelSize);
        ctx.fillRect(x + 11, y + size - 4, pixelSize, pixelSize);
        ctx.fillRect(x + 15, y + size - 4, pixelSize, pixelSize);
        
        // L-shaped corners in red
        // Top-left L
        ctx.fillRect(x + 2, y + 4, pixelSize, 3);
        ctx.fillRect(x + 4, y + 2, 3, pixelSize);
        
        // Top-right L
        ctx.fillRect(x + size - 4, y + 4, pixelSize, 3);
        ctx.fillRect(x + size - 7, y + 2, 3, pixelSize);
        
        // Bottom-left L
        ctx.fillRect(x + 2, y + size - 7, pixelSize, 3);
        ctx.fillRect(x + 4, y + size - 4, 3, pixelSize);
        
        // Bottom-right L
        ctx.fillRect(x + size - 4, y + size - 7, pixelSize, 3);
        ctx.fillRect(x + size - 7, y + size - 4, 3, pixelSize);
        
        // Orange middle ring/cross
        ctx.fillStyle = COLORS.ANOMALY_RING;
        // Horizontal bar
        ctx.fillRect(x + 4, y + 8, 4, 4);
        ctx.fillRect(x + size - 8, y + 8, 4, 4);
        // Vertical bar  
        ctx.fillRect(x + 8, y + 4, 4, 4);
        ctx.fillRect(x + 8, y + size - 8, 4, 4);
        
        // Golden yellow center square
        ctx.fillStyle = COLORS.ANOMALY_CENTER;
        const centerSize = 8;
        const centerOffset = (size - centerSize) / 2;
        ctx.fillRect(x + centerOffset, y + centerOffset, centerSize, centerSize);
        
        // Dark inner square (the core)
        ctx.fillStyle = COLORS.ANOMALY_DARK;
        const coreSize = 4;
        const coreOffset = (size - coreSize) / 2;
        ctx.fillRect(x + coreOffset, y + coreOffset, coreSize, coreSize);
        
        // Pulsing glow effect
        const glowAlpha = 0.3 + Math.sin(this.animPhase * 2) * 0.2;
        ctx.fillStyle = `rgba(245, 176, 65, ${glowAlpha})`;
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size/2 + 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Main Game class
class GridAgentGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameRunning = false;
        this.gameOver = false;
        this.anomaliesCollected = 0;

        this.board = JSON.parse(JSON.stringify(BOARD_LAYOUT));
        this.agent = new GridAgent();

        // Create anomalies (collectibles) - spawn in the central core
        this.anomalies = [
            new Anomaly(12, 15, 'alpha'),
            new Anomaly(15, 15, 'beta'),
            new Anomaly(12, 16, 'gamma'),
            new Anomaly(15, 16, 'delta'),
            new Anomaly(13, 15, 'epsilon'),
            new Anomaly(14, 16, 'zeta')
        ];

        this.dotCount = this.countDots();
        this.setupControls();
        this.updateDisplay();
        this.startGame();
    }

    countDots() {
        let count = 0;
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (this.board[y][x] === 2 || this.board[y][x] === 3) {
                    count++;
                }
            }
        }
        return count;
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;

            switch (e.key) {
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.agent.nextDirection = 0;
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    this.agent.nextDirection = 1;
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    this.agent.nextDirection = 2;
                    e.preventDefault();
                    break;
                case 'ArrowUp':
                case 'w':
                case 'W':
                    this.agent.nextDirection = 3;
                    e.preventDefault();
                    break;
            }
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.resetGame();
        });

        // Mobile controls
        const setupMobileBtn = (btnId, direction) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    if (!this.gameOver) this.agent.nextDirection = direction;
                });
                btn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    if (!this.gameOver) this.agent.nextDirection = direction;
                });
            }
        };

        setupMobileBtn('btn-up', 3);
        setupMobileBtn('btn-down', 1);
        setupMobileBtn('btn-left', 2);
        setupMobileBtn('btn-right', 0);
    }

    startGame() {
        this.gameRunning = true;
        this.gameLoop();
    }

    resetGame() {
        this.score = 0;
        this.lives = 3;
        this.gameOver = false;
        this.anomaliesCollected = 0;
        this.board = JSON.parse(JSON.stringify(BOARD_LAYOUT));
        this.dotCount = this.countDots();
        this.agent.reset();
        this.anomalies.forEach(a => a.reset());
        document.getElementById('game-over').classList.add('hidden');
        this.updateDisplay();
        
        if (!this.gameRunning) {
            this.startGame();
        }
    }

    gameLoop() {
        if (!this.gameRunning) return;

        this.update();
        this.draw();

        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        if (this.gameOver) return;

        this.agent.update(this.board);
        this.anomalies.forEach(anomaly => anomaly.update(this.board));

        this.checkDotCollection();
        this.checkAnomalyCollection();

        // Check win - collect all dots AND all anomalies
        const allAnomaliesCollected = this.anomalies.every(a => a.collected);
        if (this.dotCount <= 0 && allAnomaliesCollected) {
            this.level++;
            this.board = JSON.parse(JSON.stringify(BOARD_LAYOUT));
            this.dotCount = this.countDots();
            this.anomaliesCollected = 0;
            this.agent.reset();
            this.anomalies.forEach(a => a.reset());
            this.updateDisplay();
        }
    }

    checkDotCollection() {
        const pos = this.agent.getGridPosition();

        if (pos.x >= 0 && pos.x < BOARD_WIDTH && pos.y >= 0 && pos.y < BOARD_HEIGHT) {
            const cell = this.board[pos.y][pos.x];

            if (cell === 2) {
                this.board[pos.y][pos.x] = 0;
                this.score += 10;
                this.dotCount--;
                this.updateDisplay();
            } else if (cell === 3) {
                this.board[pos.y][pos.x] = 0;
                this.score += 50;
                this.dotCount--;
                this.updateDisplay();
            }
        }
    }

    checkAnomalyCollection() {
        const agentCenterX = this.agent.x + CELL_SIZE / 2;
        const agentCenterY = this.agent.y + CELL_SIZE / 2;

        for (const anomaly of this.anomalies) {
            if (anomaly.collected || anomaly.inSpawn) continue;

            const anomalyCenterX = anomaly.x + CELL_SIZE / 2;
            const anomalyCenterY = anomaly.y + CELL_SIZE / 2;

            const dist = Math.sqrt(
                Math.pow(agentCenterX - anomalyCenterX, 2) +
                Math.pow(agentCenterY - anomalyCenterY, 2)
            );

            if (dist < CELL_SIZE - 2) {
                // Collect the anomaly!
                anomaly.collected = true;
                this.anomaliesCollected++;
                this.score += 500; // Big bonus for collecting anomalies
                this.updateDisplay();

                // Check if all anomalies collected
                const allCollected = this.anomalies.every(a => a.collected);
                if (allCollected && this.dotCount <= 0) {
                    // Level complete handled in update
                }
            }
        }
    }

    draw() {
        this.ctx.fillStyle = COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw board
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                const cell = this.board[y][x];
                const px = x * CELL_SIZE;
                const py = y * CELL_SIZE;

                if (cell === 1) {
                    this.ctx.fillStyle = COLORS.WALL;
                    this.ctx.fillRect(px + 2, py + 2, CELL_SIZE - 4, CELL_SIZE - 4);
                } else if (cell === 2) {
                    this.ctx.fillStyle = COLORS.DOT;
                    this.ctx.beginPath();
                    this.ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, 2, 0, Math.PI * 2);
                    this.ctx.fill();
                } else if (cell === 3) {
                    const pulse = Math.sin(Date.now() / 200) * 2 + 6;
                    this.ctx.fillStyle = COLORS.POWER_PELLET;
                    this.ctx.beginPath();
                    this.ctx.arc(px + CELL_SIZE / 2, py + CELL_SIZE / 2, pulse, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        }

        // Draw anomalies
        this.anomalies.forEach(anomaly => anomaly.draw(this.ctx));

        // Draw GridAgent
        this.agent.draw(this.ctx);
    }

    updateDisplay() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('lives').textContent = `Anomalies: ${this.anomaliesCollected}/6`;
        document.getElementById('level').textContent = `Level: ${this.level}`;
    }
}

// Start the game when page loads
window.onload = () => {
    new GridAgentGame();
};