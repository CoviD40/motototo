const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let dx = 20;
let dy = 0;
let score = 0;
let gameInterval;
let isGameRunning = false;

// Старт игры
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// Генерация еды
function generateFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
}

// Отрисовка игры
function draw() {
    // Очистка холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Отрисовка змейки
    ctx.fillStyle = '#2ecc71';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 20, 20);
        ctx.strokeRect(segment.x, segment.y, 20, 20);
    });
    
    // Отрисовка еды
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Обновление игры
function update() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Проверка на столкновение с границами
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }
    
    // Проверка на столкновение с собой
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    // Проверка на съедение еды
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

// Управление
document.addEventListener('keydown', e => {
    if (!isGameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (dy !== 20) { dx = 0; dy = -20; }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (dy !== -20) { dx = 0; dy = 20; }
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (dx !== 20) { dx = -20; dy = 0; }
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (dx !== -20) { dx = 20; dy = 0; }
            break;
    }
});

// Завершение игры
function gameOver() {
    clearInterval(gameInterval);
    isGameRunning = false;
    alert(`Игра окончена! Ваш счёт: ${score}`);
}

// Старт игры
function startGame() {
    if (isGameRunning) return;
    resetGame();
    isGameRunning = true;
    generateFood();
    gameInterval = setInterval(() => {
        update();
        draw();
    }, 100);
}

// Сброс игры
function resetGame() {
    clearInterval(gameInterval);
    snake = [{x: 200, y: 200}];
    dx = 20;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    isGameRunning = false;
}

// Первая отрисовка
draw();
