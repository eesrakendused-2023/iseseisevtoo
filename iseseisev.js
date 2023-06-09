var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// Algne positsioon ja suurus
var playerX = canvas.width / 2;
var playerY = canvas.height - 30;
var playerWidth = 75;
var playerHeight = 15;
var playerSpeed = 15; 

// Algne palli asukoht ja kiirus
var ballX = canvas.width / 2;
var ballY = canvas.height - 40;
var ballRadius = 10;
var ballSpeedX = 1; 
var ballSpeedY = -1; 

// palli kiiruse muutmise aeg
var elapsedTime = 0;
var speedAdjustmentInterval = 5000; 
var score = 0;

// suvaline värv palli jaoks
var ballColor = getRandomColor();
var colorChangeInterval = 1000; 
var colorChangeTimer = colorChangeInterval;

var gameStarted = false;

// mängija liigutamine
function movePlayer(event) {
  if (event.keyCode === 37) {
    // vasak
    playerX -= playerSpeed;
  } else if (event.keyCode === 39) {
    // parem
    playerX += playerSpeed;
  }
}

// mängu lõpus reset
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height - 40;
  ballSpeedX = 1; 
  ballSpeedY = -1; 
  elapsedTime = 0; 
  playerSpeed = 15;  
  playerX = canvas.width / 2 - playerWidth / 2; 

}

function updateGame() {
  
  context.clearRect(0, 0, canvas.width, canvas.height);

  // mängija
  context.beginPath();
  context.rect(playerX, playerY, playerWidth, playerHeight);
  context.fillStyle = "#000000";
  context.fill();
  context.closePath();

  // pall
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  context.fillStyle = ballColor;
  context.fill();
  context.closePath();

  // palli kiirus
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // bounce seintelt
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // palli ja mängija vaheline
  if (
    ballY + ballRadius > playerY &&
    ballY + ballRadius < playerY + playerHeight &&
    ballX > playerX &&
    ballX < playerX + playerWidth
  ) {
    ballSpeedY = -ballSpeedY;
    score += 1; 
  }

  // fail
  if (ballY + ballRadius > canvas.height) {
    alert("Game Over! Your score: " + score);
    resetBall();
    score = 0; 
    gameStarted = false; 
    document.getElementById("startButton").style.display = "block"; 
  }

  //kiiruse muutsime %
  elapsedTime += 10; 
  if (elapsedTime >= speedAdjustmentInterval) {
    ballSpeedX *= 1.1; 
    ballSpeedY *= 1.1;
    elapsedTime = 0; 
  }

  // värvi muutmise taimer
  colorChangeTimer -= 10;
  if (colorChangeTimer <= 0) {
    ballColor = getRandomColor();
    colorChangeTimer = colorChangeInterval; 
  }

  context.font = "16px Arial";
  context.fillStyle = "#000000";
  context.fillText("Score: " + score, 8, 20);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener("keydown", function (event) {
  if (gameStarted) {
    movePlayer(event);
  }
});

document.getElementById("startButton").addEventListener("click", function () {
  gameStarted = true;
  this.style.display = "none"; 
});

setInterval(function () {
  if (gameStarted) {
    updateGame();
  }
}, 10);
