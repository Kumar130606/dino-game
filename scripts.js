let board; 
let context; 
 
// Dino 
let dino = { 
  x: 50, 
  y: 180, // Place Dino at the bottom 
  width: 20, 
  height: 20, 
  color: '#666', 
}; 
 
let obstacles = []; 
let gravity = 0.8; 
let isJumping = false; 
let jumpVelocity; 
 
let spawnChance = 0.02; 
let score = 0; 
 
// Initialize the board and context 
window.onload = function () { 
  board = document.getElementById('board'); 
  context = board.getContext('2d'); 
  board.width = 600; 
  board.height = 200; 
 
  document.addEventListener('keydown', jump); 
 
  // Request first frame 
  requestAnimationFrame(animate); 
}; 
 
 
 
// Animation loop 
function animate() { 
  update(); 
  requestAnimationFrame(animate); 
} 
 
function update() { 
  context.clearRect(0, 0, board.width, board.height); 
 
  spawnChance += 0.001; 
 
  if (Math.random() < spawnChance) { 
    spawnObstacle(); 
  } 
 
  // Handle jumping with gravity 
  if (isJumping) { 
    dino.y -= jumpVelocity; 
    jumpVelocity -= gravity; 
    if (dino.y > 180) { 
      isJumping = false; 
      dino.y = 180; 
      jumpVelocity = 0; 
    } 
  } 
 
  // Move and draw obstacles 
  obstacles.forEach(function (obs) { 
    obs.x -= 5; 
    context.fillStyle = obs.color; 
    context.globalAlpha = 0.4; // Reduce opacity further 
    context.fillRect(obs.x, obs.y, obs.size, obs.size); 
    context.globalAlpha = 1; // Reset opacity 
  }); 
 
  // Collision detection 
  obstacles.forEach(function (obs) { 
    if ( 
      obs.x < dino.x + dino.width && 
      obs.x + obs.size > dino.x && 
      obs.y < dino.y + dino.height && 
      obs.y + obs.size > dino.y 
    ) { 
      gameOver(); 
    } 
  }); 
 
  // Draw dino 
  context.fillStyle = dino.color; 
  context.fillRect(dino.x, dino.y, dino.width, dino.height); 
 
  // Draw score 
  context.fillStyle = '#000'; 
  context.font = '20px Arial'; 
  context.fillText('Score: ' + score, 50, 50); 
 
  score++; // Increment score 
} 
 
function spawnObstacle() { 
  let obsSize = 15; // Square size 
  let obsSpacingMultiplier = 4; // Adjust this multiplier for initial spacing 
  let obsSpacing = dino.width * obsSpacingMultiplier; 
 
  // Increase the spacing multiplier over time to make obstacles spawn farther apart 
  obsSpacingMultiplier += 0.001; 
 
  let obs = { 
    x: board.width + Math.floor(Math.random() * obsSpacing), 
    y: board.height - obsSize, 
    size: obsSize, 
    color: '#333', 
  }; 
 
  obstacles.push(obs); 
} 
 
function jump() { 
  if (!isJumping) { 
    isJumping = true; 
    jumpVelocity = 10; 
  } 
} 
 
function gameOver() { 
  alert('Game Over! Your score: ' + score); 
  // Optionally reset the game state 
  obstacles = []; 
  score = 0; 
}
