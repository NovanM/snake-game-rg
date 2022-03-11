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
        nyawa: 3, 
        level: 1 
    }
}
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
let snakeNyawa = 3; 
function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.drawImage(color,x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
   
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

        drawLevel(snake1);
        drawScore(snake1);
        drawNyawa(snake1);

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
}

function moveRight(snake) {
    snake.head.x++;

    teleport(snake);
    eat(snake, apples);
    dapatNyawa(snake, nyawa);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples);
    dapatNyawa(snake, nyawa);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples);
    dapatNyawa(snake, nyawa);
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