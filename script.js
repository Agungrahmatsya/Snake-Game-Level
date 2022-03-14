const CELL_SIZE = 20;
const CANVAS_SIZE = 500;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
var MOVE_INTERVAL = 150;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
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
        score: 0
        
    }
}
let snake = initSnake("black");


let apple1 = {
    color: "red",
    position: initPosition(),
}

let apple2 = {
    color: "red",
    position: initPosition(),
}

// menambahkan gambar kepala ular
function drawCell(ctx, x, y) {
    let img = document.getElementById('snake-head');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// menambahkan gambar badan ular
function drawCellBody(ctx, x, y) {
    let img = document.getElementById('snake-body');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawApple(ctx, x, y) {
	let img = document.getElementById('apple');
	ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore() {
    let scoreCanvas;
    scoreCanvas = document.getElementById("score1Board");
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "24px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText("SCORE", scoreCanvas.scrollWidth /4, scoreCanvas.scrollHeight / 3.5);
    scoreCtx.font = "28px Arial";
    scoreCtx.fillText(score2, scoreCanvas.scrollWidth /2.2, scoreCanvas.scrollHeight / 1.5);
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        drawCell(ctx, snake.head.x, snake.head.y, snake.color);
        for (let i = 1; i < snake.body.length; i++) {
            drawCellBody(ctx, snake.body[i].x, snake.body[i].y, snake.color);
        }
        drawApple(ctx, apple1.position.x, apple1.position.y, apple1.color);
        drawApple(ctx, apple2.position.x, apple2.position.y, apple2.color);

        checkLevel(snake, ctx);

        drawScore(snake);
        drawSpeed(snake);

        drawLifeBar(ctx,lifebar.head.x, lifebar.head.y);

        for (let i = 1; i < lifebar.body.length ; i++){
            drawLifeBar(ctx, lifebar.body[i].x + i, lifebar.body[i].y)
        }

        if(isPrime(score2) == true){
            
            drawLifeIcon(ctx, lifeIcon.position.x, lifeIcon.position.y);
           
        }

        setTimeout
    }, REDRAW_INTERVAL);
}

function teleport() {
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

function eat(snake, apple) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        score2++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        lifeIcon.position = initPosition();
        var audio = new Audio ('assets/eat.wav');
        audio.play();
    }
    if(snake.head.x == lifeIcon.position.x && snake.head.y == lifeIcon.position.y){
        lifeIcon.position = blankPosition();
        lifebar.body.push({x: lifebar.head.x , y: lifebar.head.y});
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2)
}

function move() {
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
    setTimeout(function() {
        move(snake);
    }, MOVE_INTERVAL[currentLevel]);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake, DIRECTION.DOWN);
    }

})

function initGame() {
    move(snake);
}

initGame();
