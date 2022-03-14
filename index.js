const CELL_SIZE = 20;

const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 10;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

let MOVE_INTERVAL = 150;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        level: 1 ,
        health: 3,
    }
}
function getStarted() {
  snake1.score = 0;
  level = 1;
  wallX = [];
  wallY = [];
}
var wallX = [];
var wallY = [];
var levelWall2 = [
  {
    x1: 8,
    x2: 22,
    y: 10,
  },
  {
    x1: 8,
    x2: 22,
    y: 5,
  },
];
var levelWall3 = [
  {
    x1: 8,
    x2: 22,
    y: 15,
  },
];
var levelWall4 = [
  {
    x1: 8,
    x2: 22,
    y: 20,
  },
];
var levelWall5 = [
  {
    x1: 8,
    x2: 22,
    y: 25,
  },
];

let snake1 = initSnake("purple");
let apples = [{
    color: "red",
    position: initPosition(),
},
{
    color: "green",
    position: initPosition(),
}]
let nyawa = {
    position: initPosition()
}
let snakeNyawa = snake1.health; 
function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.drawImage(color,x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
   
}
function drawWall(ctx, x, y, color){
    ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// level board
function drawLevel(snake) {
    let levelCanvas;
    levelCanvas = document.getElementById("levelBoard");
    let levelCtx = levelCanvas.getContext("2d");

    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "30px Arial";
    levelCtx.fillText("Level " + snake.level, 10, levelCanvas.scrollHeight / 2);
}

// nyawa board
function drawNyawa(snake) {
    let NyawaCanvas;
    NyawaCanvas = document.getElementById("nyawaBoard");
    let NyawaCtx = NyawaCanvas.getContext("2d");
    let nyawaX = 10;
    let nyawaY = 5;
    let cell = 15;
    NyawaCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    for(let i = 1; i <= snakeNyawa; i++){
        var img = document.getElementById("nyawa");
        if(i%11==0){
            nyawaY+=25;
            nyawaX = 10
        }
        NyawaCtx.drawImage(img, nyawaX, nyawaY, cell, cell);
        nyawaX+=20;
    }
}

// wall funtion
function initWall2() {
    for (let i = 0; i < levelWall2.length; i++) {
      for (let j = levelWall2[i].x1; j <= levelWall2[i].x2; j++) {
        wallX.push(j);
        wallY.push(levelWall2[i].y);
      }
    }
  }
  
  function initWall3() {
    for (let i = 0; i < levelWall3.length; i++) {
      for (let j = levelWall3[i].x1; j <= levelWall3[i].x2; j++) {
        wallX.push(j);
        wallY.push(levelWall3[i].y);
      }
    }
  }
  
  function initWall4() {
    for (let i = 0; i < levelWall4.length; i++) {
      for (let j = levelWall4[i].x1; j <= levelWall4[i].x2; j++) {
        wallX.push(j);
        wallY.push(levelWall4[i].y);
      }
    }
  }
  
  function initWall5() {
    for (let i = 0; i < levelWall5.length; i++) {
      for (let j = levelWall5[i].x1; j <= levelWall5[i].x2; j++) {
        wallX.push(j);
        wallY.push(levelWall5[i].y);
      }
    }
  }
  function createWall() {
    let wallCanvas = document.getElementById("snakeBoard");
    let ctx = wallCanvas.getContext("2d");
    for (let i = 0; i < wallX.length; i++) {
      drawWall(ctx, wallX[i], wallY[i], "#808080");
    }
  }

  function hitTheWall(snake) {
    for (let i = 0; i < wallX.length; i++) {
      if (
      snake.head.x === wallX[i] &&
        (snake.direction == 2 || snake.direction == 3)
      ) {
        if (
        snake.head.y - 1 === wallY[i] ||
        snake.head.y + 1 === wallY[i]
        ) {
          overAudio.play();
          if (snake.health === 0) {
            gameOverAudio.play();
            alert("Game Over");
            getStarted();
          } else {
            snake.health--;
          }
          stop(snake);
        }
      }
  
      if (
      snake.head.y === wallY[i] &&
        (snake.direction == 0 || snake.direction == 1)
      ) {
        if (
        snake.head.x - 1 === wallX[i] ||
        snake.head.x + 1 === wallX[i]
        ) {
          overAudio.play();
          if (snake.health === 0) {
            gameOverAudio.play();
            alert("Game Over");
            getStarted();
          } else {
            snake.health--;
          }
          stop(snake);
        }
      }
    }
  }

  // funtion level
  function nextLevel(snake) {
    level++;
    if (level == 2) {
      initWall2();
    } else if (level == 3) {
      initWall3();
    } else if (level == 4) {
      initWall4();
    } else if (level == 5) {
      initWall5();
    }
    snake.position = initPosition();
    snake.health += 3;
    stop(snake1);
    upLevel = 1;
  }
  

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } 

    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}
var level = 1;
var upLevel = 0;
var overAudio = new Audio("assets/audio/over.wav");
var levelAudio = new Audio("assets/audio/level.wav");
var gameOverAudio = new Audio("assets/audio/game-over.mp3");
function draw() {
    
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        var imgSnakeHead = document.getElementById("headSnake");
        var bodySnake = document.getElementById("bodySnake");
        
        drawCell(ctx, snake1.head.x, snake1.head.y, imgSnakeHead);
        for (let i = 1; i < snake1.body.length; i++) {

            drawCell(ctx, snake1.body[i].x, snake1.body[i].y, bodySnake);
        }


        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];

            var img = document.getElementById("apple");
            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        // menambahkan nyawa ketika score bilangan prima
        setTimeout(() => {
            
            let prima = 0;
            for(let k = 1; k <= snake1.score; k++){
                if(snake1.score%k==0){
                    prima++;
                }
            }
            if(prima == 2){
                var img = document.getElementById("nyawa");
                ctx.drawImage(img, nyawa.position.x * CELL_SIZE, nyawa.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);    
            }
        }, 2000);
        createWall();
        drawLevel(snake1);
        drawScore(snake1);

        console.log(REDRAW_INTERVAL);

        drawNyawa(snake1);

        if (upLevel == 1) {
            upLevel = 0;
            if (level <= 5) {
              alert("level up to : " + level);
            }
          }
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}


function eat(snake, apples) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;
            snake.body.push({x: snake.head.x, y: snake.head.y});
            if(snake.score%5==0){
                snake.level++;
                MOVE_INTERVAL-=35;
            }
            if (snake.score % 5 == 0 && snake.score != 0) {
              snake.move -= 20;
              levelAudio.play();
              nextLevel(snake);
            }
            

        }
    }
    
    
}
function dapatNyawa(snake, nyawa) {
    if (snake.head.x == nyawa.position.x && snake.head.y == nyawa.position.y) {
        nyawa.position = initPosition();
        snake.score++;
        snakeNyawa++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples);
    dapatNyawa(snake, nyawa);
    hitTheWall(snake);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples);
    dapatNyawa(snake, nyawa);
    hitTheWall(snake);
}

function moveDown(snake) {

    snake.head.y++;
    teleport(snake);
    eat(snake, apples);
    dapatNyawa(snake, nyawa);
    hitTheWall(snake);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples);
    dapatNyawa(snake, nyawa);
    hitTheWall(snake);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    // for (let i = 0; i < snakes.length; i++) {
    //     for (let j = 0; j < snakes.length; j++) {
    //         for (let k = 1; k < snakes[j].body.length; k++) {
    //             if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
    //                 isCollide = true;
    //             }
    //         }
    //     }
    // }
    for (let j = 0; j < snakes.length; j++) {
        for (let k = 1; k < snakes[j].body.length; k++) {
            if (snakes[j].head.x == snakes[j].body[k].x && snakes[j].head.y == snakes[j].body[k].y) {
                isCollide = true;
            }
        }
    }
    if (isCollide) {
        
        var audio = new Audio('assets/audio/game-over.mp3');
        audio.play();

        alert("Game over");
        snake1 = initSnake("purple");
        snakeNyawa--;
        snake1.level = 1
        MOVE_INTERVAL = 150
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    // Soal no 6: Check collision dengan snake3
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }

    
})

function initGame() {
    move(snake1);
  
}

initGame();