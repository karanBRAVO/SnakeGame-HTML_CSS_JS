const startGameImg = document.getElementById("startGameImg");
const topLayer = document.getElementById("topLayer");

startGameImg.addEventListener('click', (e) => {
    if (topLayer.style.display == "flex") {
        topLayer.style.display = "none";
    }
    else {
        topLayer.style.display = "flex"
    }
})

const gameWindow = document.getElementById("gameWindow");

let boxWidth = 25;
let boxHeight = 25;
let boxCount_x = Math.trunc(gameWindow.clientWidth / boxWidth);
let boxCount_y = Math.trunc(gameWindow.clientHeight / boxHeight);
let boxDict = {};

function drawGrid() {
    for (let y = 0; y < boxCount_y; y++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList = `display-flex flexDirec-row`;
        for (let x = 0; x < boxCount_x; x++) {
            let colDiv = document.createElement("div");
            colDiv.style.border = `1px solid red`;
            colDiv.style.width = `${boxWidth}px`;
            colDiv.style.height = `${boxHeight}px`;
            colDiv.style.background = `#C9F4AA`;
            colDiv.id = `row${y + 1}_col${x + 1}`;
            rowDiv.appendChild(colDiv);
        }
        gameWindow.appendChild(rowDiv);
    }
}
drawGrid();

function createDict() {
    for (let y = 0; y < boxCount_y; y++) {
        for (let x = 0; x < boxCount_x; x++) {
            boxDict[`row${y + 1}_col${x + 1}`] = document.getElementById(`row${y + 1}_col${x + 1}`);
        }
    }
}
createDict();

function getFood_randomPos() {
    let food_y = Math.trunc(Math.random() * boxCount_y + 1);
    if (food_y > boxCount_y) {
        food_y--;
    }
    let food_x = Math.trunc(Math.random() * boxCount_x + 1);
    if (food_x > boxCount_x) {
        food_x--;
    }
    boxDict[`row${food_y}_col${food_x}`].style.background = `purple`;
}
getFood_randomPos();

// Todo
let snake_x = 5;
let snake_y = 5;
let snakeLen = 1;

function createSnake(y, x) {
    boxDict[`row${y}_col${x}`].style.background = `green`;
}
createSnake(snake_y, snake_x);

async function moveSnake(key) {
    if (key == 'r') {
        snake_x++;
    }
    else if (key == 'l') {
        snake_x--;
    }
    else if (key == 'u') {
        snake_y--;
    }
    else if (key == 'd') {
        snake_y++;
    }
    boxDict[`row${snake_y}_col${snake_x}`].style.background = `green`;
    await sleep(100);
    moveSnake(key);
}

document.addEventListener('keydown', (e) => {
    let keyName = e.key;

    if (keyName == "ArrowRight") {
        moveSnake('r');
    }
    else if (keyName == "ArrowLeft") {
        moveSnake('l');
    }
    else if (keyName == "ArrowUp") {
        moveSnake('u');
    }
    else if (keyName == "ArrowDown") {
        moveSnake('d');
    }
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}