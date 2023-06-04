document.getElementById("start-button").addEventListener("click", function() {
let main = document.querySelector(".main");

let playfield = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


var gameSpeed = 400;

let activeTetro = {
  x: 0,
  y: 0,
  shape: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
  ],
};

let score = 0;

function updateScore() {
  const scoreElement = document.getElementById("score");
  score += 100;
  scoreElement.textContent = `Score: ${score}`;
}

function draw() {
  let mainInnerHTML = "";
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      let cellClass = "";
      if (playfield[y][x] === 1) {
        cellClass = "movingCell";
      } else if (playfield[y][x] === 2) {
        cellClass = "fixedCell";
      }
      mainInnerHTML += `<div class="cell ${cellClass}"></div>`;
    }
  }
  main.innerHTML = mainInnerHTML;
   mainInnerHTML += `<div class="score">Score: ${score}</div>`;
}

//Figuurid
function generateRandomTetro() {
  const tetrominoShapes = [
    [[1, 1], [0, 1]], 
    [[0, 0], [0, 1]], 
    [[0, 1], [0, 1], [0, 1]], 
    [[1, 1], [1, 1]], 
    [[1, 1, 1, 0]], 
    [[0, 1], [1, 1], [1, 0]], 
    [[0, 1], [0, 1], [1, 1]],
    [[1, 1, 1], [0, 1, 0], [0, 1, 0]],
    [[1, 1, 1], [0, 0, 1]], 
  ];

  const randomShapeIndex = Math.floor(Math.random() * tetrominoShapes.length);
  const randomShape = tetrominoShapes[randomShapeIndex];

  activeTetro.shape = randomShape;
  activeTetro.x = Math.floor((playfield[0].length - randomShape[0].length) / 2);
  activeTetro.y = 0;

  addActiveTetro();
}

function addActiveTetro() {
  const shape = activeTetro.shape;
  const startX = activeTetro.x;
  const startY = activeTetro.y;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === 1) {
        playfield[startY + y][startX + x] = 1;
      }
    }
  }
}

function canTetroMoveDown() {
  const fieldLength = playfield.length;
  for (let y = 0; y < fieldLength; y++) {
    const rowLength = playfield[y].length;
    for (let x = 0; x < rowLength; x++) {
      if (playfield[y][x] === 1 && (y === fieldLength - 1 || playfield[y + 1][x] === 2)) {
        return false;
      }
    }
  }

  return true;
}

function moveTetroDown() {
  if (canTetroMoveDown()) {
    const fieldLength = playfield.length;
    for (let y = fieldLength - 1; y >= 0; y--) {
      const row = playfield[y];
      const rowLength = row.length;
      for (let x = 0; x < rowLength; x++) {
        if (row[x] === 1) {
          playfield[y + 1][x] = 1;
          row[x] = 0;
        }
      }
    }
  } else {
    fixTetro();
  }
}

function canTetroMoveLeft() {
  for (let y = 0; y < playfield.length; y++) {
    const row = playfield[y];
    const rowLength = row.length;
    for (let x = 0; x < rowLength; x++) {
      if (row[x] === 1 && (x === 0 || row[x - 1] === 2)) {
        return false;
      }
    }
  }

  return true;
}

function moveTetroLeft() {
  if (canTetroMoveLeft()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      const row = playfield[y];
      const rowLength = row.length;
      for (let x = 0; x < rowLength; x++) {
        if (row[x] === 1) {
          row[x - 1] = 1;
          row[x] = 0;
        }
      }
    }
  }
}

function canTetroMoveRight() {
  for (let y = 0; y < playfield.length; y++) {
    const row = playfield[y];
    const rowLength = row.length;
    for (let x = 0; x < rowLength; x++) {
      if (row[x] === 1 && (x === rowLength - 1 || row[x + 1] === 2)) {
        return false;
      }
    }
  }

  return true;
}

function moveTetroRight() {
  if (canTetroMoveRight()) {
    for (let y = playfield.length - 1; y >= 0; y--) {
      const row = playfield[y];
      const rowLength = row.length;
      for (let x = rowLength - 1; x >= 0; x--) {
        if (row[x] === 1) {
          row[x + 1] = 1;
          row[x] = 0;
        }
      }
    }
  }
}

function removeFullLines() {
  for (let y = playfield.length - 1; y >= 0; y--) {
    let isFullLine = true;
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] !== 2) {
        isFullLine = false;
        break;
      }
    }
    if (isFullLine) {
      playfield.splice(y, 1);
      playfield.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }
}

function fixTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 2;
      }
    }
  }

  removeFullLines();
  updateScore();
  generateRandomTetro();
  draw();
}

draw();

document.onkeydown = function (e) {
  const keyCode = e.keyCode;
  if (keyCode === 37) {
    moveTetroLeft();
  } else if (keyCode === 39) {
    moveTetroRight();
  } else if (keyCode === 40) {
    moveTetroDown();
  }

  const highestRow = 0; 

  if (!canTetroMoveDown() && isTetroInRow(highestRow)) {
    gameOver();
    return;
  }

  draw();
};

addActiveTetro();
draw();

function isTetroInRow(row) {
  for (let x = 0; x < playfield[row].length; x++) {
    if (playfield[row][x] === 1) {
      return true;
    }
  }
  return false;
}

function gameOver() {
  alert("Game over");
  resetPage();
}

function resetPage() {
  location.reload(); 
}

function startGame() {
  moveTetroDown();
  draw();
  gameSpeed += 5; // Increase game speed by 5ms on each game loop

  if (gameSpeed >= 1000) {
     gameSpeed = 1000; // Set a maximum speed of 1000ms
  }

  setTimeout(startGame, gameSpeed);
}

setTimeout(startGame, gameSpeed);

});

//  ITVDN. (2020). Tetris. https://drive.google.com/drive/folders/1Dmv4L6QcKygFb8ntpMux1xmGENDlj76W