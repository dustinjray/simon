const GAME_BUTTONS = document.querySelectorAll(".game-button");
const PLAY_BUTTON = document.querySelector(".play-button");
const MESSAGE = document.querySelector(".message");
const CURRENT_SCORE = document.querySelector(".current-score");
const HIGH_SCORE = document.querySelector(".high-score");

let buttonsDisabled = false;
let isGameOver = false;
let currentPattern = [];
let currentIndex = 0;
let currentScore = 0;
let highScore = 0;


for (let button of GAME_BUTTONS) {
    button.addEventListener("click", () => {
        if (!buttonsDisabled && !isGameOver) {
            lightButton(button);
            sleep(350)
                .then(() => {
                    checkAnswer(button);
                })
        }
    });
}

PLAY_BUTTON.addEventListener("click", () => {
    isGameOver = false;
    MESSAGE.classList.remove("red-text");
    currentPattern = [];
    currentScore = 0;
    nextRound();
});

function lightButton(button) {
    button.classList.toggle("active");
    let audio;
    switch (button) {
        case GAME_BUTTONS[0]:
            audio = new Audio("assets/e5.mp3"); //green
            audio.play();
            break;
        case GAME_BUTTONS[1]:
            audio = new Audio("assets/cSharp.mp3"); //red
            audio.play();
            break;
        case GAME_BUTTONS[2]:
            audio = new Audio("assets/a4.mp3"); //yellow
            audio.play();
            break;
        case GAME_BUTTONS[3]:
            audio = new Audio("assets/e4.mp3"); //blue
            audio.play();
            break;
    }
    sleep(350)
        .then(() => {
            button.classList.toggle("active");
        });
}

function nextRound() {
    currentIndex = 0;
    buttonsDisabled = true;
    addToPattern();
    showWatch();
    sleep(500)
        .then(() => {
            playPattern()
                .then(() => {
                    showRepeat();
                });
        });
    buttonsDisabled = false;
}

function showWatch() {
    MESSAGE.classList.remove("green-text");
    MESSAGE.classList.toggle("yellow-text");
    MESSAGE.innerText = "Watch. . .";
}

function showRepeat() {
    MESSAGE.classList.toggle("yellow-text");
    MESSAGE.classList.toggle("green-text");
    MESSAGE.innerText = "Repeat";
}

function showGameOver() {
    MESSAGE.classList.remove("green-text");
    MESSAGE.classList.toggle("red-text");
    MESSAGE.innerText = "GAME OVER";
}

function gameOver() {
    isGameOver = true;
    showGameOver();
    compareHighScore();
    currentScore = 0;
    CURRENT_SCORE.innerText = 0;
}

function compareHighScore() {
    highScore = Math.max(currentScore, highScore);
    HIGH_SCORE.innerText = highScore;
}

function checkAnswer(buttonPressed) {
    if (buttonPressed === GAME_BUTTONS[currentPattern[currentIndex]]) {
        currentIndex++;
        if (currentIndex === currentPattern.length) {
            currentScore++;
            CURRENT_SCORE.innerText = currentScore;
            nextRound();
        }
    } else {
        gameOver();
    }
}

async function playPattern() {
    for (let index of currentPattern) {
        await lightButton(GAME_BUTTONS[index]);
        await sleep(700);
    }
}

function addToPattern() {
    currentPattern.push(Math.floor(Math.random() * 4));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}