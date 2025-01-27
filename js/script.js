/* // DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const gameArea = document.getElementById('game-area');
const cat = document.getElementById('cat');

// Game State
let lives = 3;
let score = 0;
let gameInterval;
let donuts = [];
let balls = [];

// Classes
class Donut {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'donut';
    this.x = Math.random() * (gameArea.offsetWidth - 30);
    this.y = 0;
    gameArea.appendChild(this.element);
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  move() {
    this.y += 2;
    if (this.y > gameArea.offsetHeight) {
      this.remove();
    } else {
      this.updatePosition();
    }
  }

  remove() {
    gameArea.removeChild(this.element);
    donuts = donuts.filter(d => d !== this);
  }
}

class Ball {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'ball';
    this.x = Math.random() * (gameArea.offsetWidth - 30);
    this.y = 0;
    gameArea.appendChild(this.element);
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  move() {
    this.y += 4;
    if (this.y > gameArea.offsetHeight) {
      this.remove();
    } else {
      this.updatePosition();
    }
  }

  remove() {
    gameArea.removeChild(this.element);
    balls = balls.filter(b => b !== this);
  }
}

// Functions
function showScreen(screen) {
  startScreen.classList.add('hidden');
  gameScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  screen.classList.remove('hidden');
}

function startGame() {
  lives = 3;
  score = 0;
  updateStats();
  showScreen(gameScreen);

  // Clear previous entities
  donuts.forEach(donut => donut.remove());
  balls.forEach(ball => ball.remove());

  donuts = [];
  balls = [];

  // Start game loop
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 50);
}

function gameOver() {
  clearInterval(gameInterval);
  document.getElementById('final-score').textContent = score;
  showScreen(gameOverScreen);
}

function updateStats() {
  document.getElementById('lives').textContent = lives;
  document.getElementById('score').textContent = score;
}

function checkCollision(entity) {
  const catRect = cat.getBoundingClientRect();
  const entityRect = entity.element.getBoundingClientRect();

  return !(
    catRect.right < entityRect.left ||
    catRect.left > entityRect.right ||
    catRect.bottom < entityRect.top ||
    catRect.top > entityRect.bottom
  );
}

function gameLoop() {
  // Move donuts
  donuts.forEach(donut => {
    donut.move();
    if (checkCollision(donut)) {
      score++;
      updateStats();
      donut.remove();
      if (score === 5 || score === 10) {
        spawnBall();
      }
    }
  });

  // Move balls
  balls.forEach(ball => {
    ball.move();
    if (checkCollision(ball)) {
      lives--;
      updateStats();
      ball.remove();
      if (lives === 0) {
        gameOver();
      }
    }
  });

  // Spawn new donuts
  if (Math.random() < 0.02) {
    donuts.push(new Donut());
  }
}

function spawnBall() {
  const newBall = new Ball();
  balls.push(newBall);
}

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
 */

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const gameArea = document.getElementById('game-area');
const cat = document.getElementById('cat');

function startGame(){
    startButton.addEventListener("click",() =>{
        startScreen.style.display="none";
        gameScreen.style.display="flex";
    });
}

startGame()

