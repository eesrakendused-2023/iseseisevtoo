// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
// Get the timer element
const timerElement = document.getElementById('timer');
const startOverBtn = document.getElementById('startOverBtn');

// Define the maze structure
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


// Define the size of each cell in the maze
const cellSize = 20;

// Define the player's initial position
let playerX = 0;
let playerY = 1;

// Define the starting position
const startX = playerX;
const startY = playerY;

// Define the ending position
const endX = 29;
const endY = 18;

// Define the player's movement speed
const playerSpeed = 1;

let timerInterval; // Store the timer interval
let timerValue = 0; // Initialize the timer value
let timerStarted = false; // Track if the timer has started

// Update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timerValue / 60).toString().padStart(2, '0');
  const seconds = (timerValue % 60).toString().padStart(2, '0');
  timerElement.textContent = minutes + ':' + seconds;
}

// Start the timer
function startTimer() {
  if (!timerStarted) {
    timerInterval = setInterval(() => {
      timerValue++;
      updateTimerDisplay();
    }, 1000); // Update the timer value every 1000 milliseconds (1 second)
    timerStarted = true;
  }
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  timerStarted = false;
}

// Event listener for keydown event (starts timer)
window.addEventListener('keydown', function(event) {
    if (!timerStarted) {
      startTimer();
    }
  });

// Load the timer when the page loads
window.addEventListener('load', function() {
  // Set focus on the window to capture keydown events
  window.focus();
});

 //Function to toggle message visibility
 function toggleVisiblity(id) {
  if (document.getElementById(id).style.visibility == "visible") {
    document.getElementById(id).style.visibility = "hidden";
  } else {
    document.getElementById(id).style.visibility = "visible";
  }
}
//Function to display victory message
function victoryMessage() {
  document.getElementById("time").textContent = "Your time: " + timerValue + " seconds";
  document.getElementById("message-container").style.visibility = "visible";
}

// Function to check if the player has reached the end
function checkEndReached() {
  if (playerX === endX && playerY === endY) {
    stopTimer(); // Stop the timer
    victoryMessage() //Display victory message
  }
}

// Function to render the maze
function renderMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      const cell = maze[row][col];
      const x = col * cellSize;
      const y = row * cellSize;

      if (cell === 1) {
        // Draw walls as black rectangles
        context.fillStyle = 'black';
        context.fillRect(x, y, cellSize, cellSize);
      }
    }
  }
}

// Function to render the player
function renderPlayer() {
    const x = playerX * cellSize;
    const y = playerY * cellSize;
  
    // Draw the smiley face
    const radius = cellSize / 2;
    const centerX = x + radius;
    const centerY = y + radius;
    const eyeRadius = radius * 0.15;
  
    // Draw the face
    context.fillStyle = 'yellow';
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fill();
  
    // Draw the eyes
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(centerX - radius * 0.35, centerY - radius * 0.25, eyeRadius, 0, 2 * Math.PI);
    context.arc(centerX + radius * 0.35, centerY - radius * 0.25, eyeRadius, 0, 2 * Math.PI);
    context.fill();
  
    // Draw the smile
    context.lineWidth = radius * 0.1;
    context.beginPath();
    context.arc(centerX, centerY, radius * 0.6, Math.PI * 0.2, Math.PI * 0.8);
    context.stroke();
  }

// Function to handle arrow key presses
const mazeWidth = maze[0].length;
const mazeHeight = maze.length;

function handleKeyPress(event) {
    event.preventDefault(); // Disable scrolling
    const key = event.key;
  
    // Calculate the next position based on the key pressed
    let nextPlayerX = playerX;
    let nextPlayerY = playerY;
  
    if (key === 'ArrowUp') {
      nextPlayerY = playerY - 1;
    } else if (key === 'ArrowDown') {
      nextPlayerY = playerY + 1;
    } else if (key === 'ArrowLeft') {
      nextPlayerX = playerX - 1;
    } else if (key === 'ArrowRight') {
      nextPlayerX = playerX + 1;
    }
  
    // Check if the next position is within the canvas boundaries
    if (
        nextPlayerX > 0 &&
        nextPlayerX < mazeWidth &&
        nextPlayerY > 0 &&
        nextPlayerY < mazeHeight
    ) {
        // Check if the next position is a valid move (not a wall)
        const nextCell = maze[nextPlayerY][nextPlayerX];
        if (nextCell !== 1) {
        // Update the player's position
        playerX = nextPlayerX;
        playerY = nextPlayerY;
        }
    }
    // Check if the player has reached the end
    checkEndReached();
  
    // Set focus on the window to capture keydown events
    window.focus();
}
  

// Add event listener to handle key presses
window.addEventListener('keydown', handleKeyPress, false);

// Create a game loop to continuously update and render the game
function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Render the maze
  renderMaze();

  // Render the player
  renderPlayer();

  // Check if the player has reached the end
  checkEndReached();

  // Call the game loop recursively
  requestAnimationFrame(gameLoop);
}

// Start the game loop 
gameLoop();

// Add an event listener to the "Start Over" button
startOverBtn.addEventListener('click', startOver);

//Function to start over (button)
function startOver() {
  // Reset player position
  playerX = startX;
  playerY = startY;

  // Reset timer
  stopTimer();
  timerValue = 0;
  updateTimerDisplay();

  // Hide the victory message
  document.getElementById("message-container").style.visibility = "hidden";

  // Start the game loop
  gameLoop()
}

