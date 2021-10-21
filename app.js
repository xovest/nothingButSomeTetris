let canvas;
let ctx;
let gBArrayHeight = 20; //gameBoard
let gBArrayWidth = 12;
let startX = 4;
let startY = 0;
let score = 0;
let level = 1;
let winOrLose = "Playing...";
let coordinateArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));

let curTetromino = [[1, 0], [0, 1], [1, 1], [2, 1]];
let tetrominos = [];
let tetrominoColor = ['purple', 'cyan', 'blue', 'yellow', 'orange', 'green', 'red'];
let curTetrominoColor;

let gameBoardArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));

let stoppedShapeArray = [...Array(gBArrayHeight)].map(e => Array(gBArrayWidth).fill(0));

let DIRECTION = {
  IDLE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
};
let dir;

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

document.addEventListener('DOMContentLoaded', setupCanvas);

function createCoordArray() {
  let i = 0, j = 0;
  for (let y = 9; y <= 446; y += 23) {
    for (let x = 11; x <= 264; x += 23) {
      coordinateArray[i][j] = new Coordinates(x, y);
      ++i;
    }
    ++j;
    i = 0;
  }
}

function setupCanvas() {
  canvas = document.getElementById('my-canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 939;
  canvas.height = 956;

  ctx.scale(2, 2);

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'black';
  ctx.strokeRect(8, 8, 280, 462);

  ctx.fillStyle = 'black';
  ctx.font = '42px Arial';
  ctx.fillText("TETRIS", 300, 50);
  
  ctx.fillStyle = 'black';
  ctx.font = '21px Arial';
  ctx.fillText("SCORE", 300, 98);

  ctx.strokeRect(300, 107, 161, 24);

  ctx.fillText(score.toString(), 310, 127);

  ctx.fillText("LEVEL", 300, 157);

  ctx.strokeRect(300, 171, 161, 24);
  ctx.fillText(level.toString(), 310, 190);

  ctx.fillText("WIN / LOSE", 300, 221);
  ctx.fillText(winOrLose, 310, 261);
  ctx.strokeRect(300, 232, 161, 95);
  ctx.fillText("CONTROLS", 300, 354);
  ctx.strokeRect(300, 366, 161, 104);

  ctx.font = '19px Arial';
  ctx.fillText("A : Move Left", 310, 388);
  ctx.fillText("D : Move Right", 310, 413);
  ctx.fillText("S : Move Down", 310, 438);
  ctx.fillText("E : Rotate Right", 310, 463);

  document.addEventListener('keydown', handleKeyPress);
  createTetrominos();
  createTetromino();

  createCoordArray();
  drawTetromino();
}

function drawTetromino() {
  for (let i = 0; i < curTetromino.length; ++i) {
    let x = curTetromino[i][0] + startX;
    let y = curTetromino[i][1] + startY;
    gameBoardArray[x][y] = 1;
    let coorX = coordinateArray[x][y].x;
    let coorY = coordinateArray[x][y].y;
    ctx.fillStyle = curTetrominoColor;
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function handleKeyPress(key) {
  if (key.keyCode === 65) {
    dir = DIRECTION.LEFT;
    if (!hittingTheWall()) {
      deleteTetromino();
      --startX;
      drawTetromino();
    }
  } else if (key.keyCode === 68) {
    dir = DIRECTION.RIGHT;
    if (!hittingTheWall()) {
      deleteTetromino();
      ++startX;
      drawTetromino();
    }
  } else if (key.keyCode === 83) {
    dir = DIRECTION.DOWN;
    deleteTetromino();
    ++startY;
    drawTetromino();
  }
}

function deleteTetromino() {
  for (let i = 0; i < curTetromino.length; ++i) {
    let x = curTetromino[i][0] + startX;
    let y = curTetromino[i][1] + startY;
    gameBoardArray[x][y] = 0;
    let coorX = coordinateArray[x][y].x;
    let coorY = coordinateArray[x][y].y;
    ctx.fillStyle = 'white';
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function createTetrominos() {
  //t 
  tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
  //i
  tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);
  //j
  tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
  //o
  tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);
  //l
  tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
  //s
  tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);
  //z
  tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
}

function createTetromino() {
  let randomTetromino = Math.floor(Math.random() * tetrominos.length);
  curTetromino = tetrominos[randomTetromino];
  curTetrominoColor = tetrominoColor[randomTetromino];
}

function hittingTheWall() {
  for (let i = 0; i < curTetromino.length; ++i) {
    let newX = curTetromino[i][0] + startX;
    if (newX <= 0 && dir === DIRECTION.LEFT) {
      return true;
    } else if (newX >= 11 && dir === DIRECTION.RIGHT) {
      return true;
    }
  }
  return false;
}