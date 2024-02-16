// tetris.js
let grid = document.getElementById('grid');
let score = 0;
let scoreElement = document.getElementById('score');

let blocks = [
  [1, 1, 1, 1], // I
  [1, 1, 1, 0, // J
   1],
  [1, 1, 1, 0, // L
   0, 0, 1],
  [1, 1, 0, 0, // S
   0, 1, 1],
  [0, 1, 1, 0, // Z
   1, 1],
  [1, 1, 1, 1, // T
   0, 1, 0],
  [1, 1, 1, 1, // O
   1, 1]
];

// More code to handle game logic, user input, and updating the game state would go here.
// tetris.js
let currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
let currentPos = {x: 5, y: 0};

function clearGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  for(let y = 0; y < 20; y++) {
    for(let x = 0; x < 10; x++) {
      if(gridArray[y][x]) {
        let div = document.createElement('div');
        div.style.left = x * 30 + 'px';
        div.style.top = y * 30 + 'px';
        div.className = 'block';
        grid.appendChild(div);
      }
    }
  }
}

function drawBlock() {
  clearGrid();
  for(let y = 0; y < 4; y++) {
    for(let x = 0; x < 4; x++) {
      if(currentBlock[y * 4 + x]) {
        let div = document.createElement('div');
        div.style.left = (currentPos.x + x) * 30 + 'px';
        div.style.top = (currentPos.y + y) * 30 + 'px';
        div.className = 'block';
        grid.appendChild(div);
      }
    }
  }
}

function clearRows() {
  for(let y = 0; y < 20; y++) {
    if(gridArray[y].every(value => value === 1)) {
      for(let i = y; i > 0; i--) {
        gridArray[i] = gridArray[i - 1].slice();
      }
      gridArray[0] = Array(10).fill(0);
      score += 10; // Increment the score
    }
  }
}

function gameLoop() {
  if(!collision(0, 1)) {
    moveBlock(0, 1);
  } else {
    for(let y = 0; y < 4; y++) {
      for(let x = 0; x < 4; x++) {
        if(currentBlock[y * 4 + x]) {
          gridArray[currentPos.y + y][currentPos.x + x] = 1;
        }
      }
    }
    clearRows();
    scoreElement.innerText = "Score: " + score; // Update the score display
    newBlock();
    drawBlock();
  }
  setTimeout(gameLoop, 1000);
}

function moveBlock(dx, dy) {
  currentPos.x += dx;
  currentPos.y += dy;
  drawBlock();
}

function rotateBlock() {
  let newBlock = [];
  for(let y = 0; y < 4; y++) {
    for(let x = 0; x < 4; x++) {
      newBlock[y * 4 + x] = currentBlock[(3 - x) * 4 + y];
    }
  }
  currentBlock = newBlock;
  drawBlock();
}

// More code to handle game logic, user input, and updating the game state would go here.

// tetris.js
let gridArray = Array(20).fill().map(() => Array(10).fill(0));

function collision(dx, dy) {
  for(let y = 0; y < 4; y++) {
    for(let x = 0; x < 4; x++) {
      if(currentBlock[y * 4 + x]) {
        let newX = currentPos.x + x + dx;
        let newY = currentPos.y + y + dy;
        if(newX < 0 || newX >= 10 || newY >= 20 || gridArray[newY][newX]) {
          return true;
        }
      }
    }
  }
  return false;
}

function newBlock() {
  currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  currentPos = {x: 5, y: 0};
  if (collision(0, 0)) {
    // Game over
    gridArray = Array(20).fill().map(() => Array(10).fill(0));
    alert("Game over");
  }
}

newBlock();
gameLoop();

window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowLeft' && !collision(-1, 0)) {
    moveBlock(-1, 0);
  } else if(e.key === 'ArrowRight' && !collision(1, 0)) {
    moveBlock(1, 0);
  } else if(e.key === 'ArrowDown' && !collision(0, 1)) {
    moveBlock(0, 1);
  } else if(e.key === 'ArrowUp') {
    rotateBlock();
  }
});
