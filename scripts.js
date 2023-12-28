let board, context;
let obsSize = 15,
  minObstacleSpacing = 700,
  maxObstacleSpacing = 2000,
  obstacleSpeed = 0.5,
  lastObstacleSpawnTime = 0;

let dino = { x: 50, y: 180, width: 20, height: 20, color: '#666' };
let obstacles = [];
let gravity = 0.8, isJumping = false, jumpVelocity;
let spawnChance = 0.02, score = 0;

window.onload = function () {
  board = document.getElementById('board');
  context = board.getContext('2d');
  board.width = 600;
  board.height = 200;

  document.addEventListener('keydown', jump);

  requestAnimationFrame(animate);
};

function animate() {
  update();
  requestAnimationFrame(animate);
}

function update() {
  context.clearRect(0, 0, board.width, board.height);

  spawnChance += 0.001;
  if (Math.random() < spawnChance) spawnObstacle();

  handleJump();

  moveAndDrawObstacles();

  detectCollisions();

  drawDino();
  drawScore();
  score++;
}

function spawnObstacle() {
  let currentTime = Date.now();
  let elapsedTime = currentTime - lastObstacleSpawnTime;

  if (elapsedTime > minObstacleSpacing) {
    lastObstacleSpawnTime = currentTime;

    let obsSpacing = Math.floor(Math.random() * (maxObstacleSpacing - minObstacleSpacing + 20) + minObstacleSpacing);

    obstacles.push({ x: board.width, y: board.height - obsSize, size: obsSize, color: '#333' });
  }

  obstacleSpeed += 0.001;

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacleSpeed;
  }
}

function handleJump() {
  if (isJumping) {
    dino.y -= jumpVelocity;
    jumpVelocity -= gravity;

    if (dino.y > 180) {
      isJumping = false;
      dino.y = 180;
      jumpVelocity = 0;
    }
  }
}

function moveAndDrawObstacles() {
  obstacles.forEach((obs) => {
    obs.x -= 5;
    context.fillStyle = obs.color;
    context.globalAlpha = 0.4;
    context.fillRect(obs.x, obs.y, obs.size, obs.size);
    context.globalAlpha = 1;
  });
}

function detectCollisions() {
  obstacles.forEach((obs) => {
    if (obs.x < dino.x + dino.width &&
      obs.x + obs.size > dino.x &&
      obs.y < dino.y + dino.height &&
      obs.y + obs.size > dino.y) {
      gameOver();
    }
  });
}

function drawDino() {
  context.fillStyle = dino.color;
  context.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawScore() {
  context.fillStyle = '#000';
  context.font = '20px Arial';
  context.fillText('Score: ' + score, 50, 50);
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    jumpVelocity = 10;
  }
}

function gameOver() {
  alert('Game Over! Your score: ' + score);
  obstacles = [];
  score = 0;
}
