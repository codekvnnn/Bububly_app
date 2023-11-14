const gameArea = document.getElementById('gameArea');
const catcher = document.getElementById('catcher');
const fallingObject = document.getElementById('fallingObject');

let gameAreaWidth = gameArea.offsetWidth;
let catcherWidth = catcher.offsetWidth;
let fallingObjectSize = fallingObject.offsetWidth;
let gameInterval;
let fallingSpeed = 2;

document.addEventListener('mousemove', (e) => {
    let gameAreaRect = gameArea.getBoundingClientRect();
    let newLeft = e.clientX - gameAreaRect.left - (catcherWidth / 2);

    if (newLeft < 0) newLeft = 0;
    else if (newLeft > gameAreaWidth - catcherWidth) newLeft = gameAreaWidth - catcherWidth;

    catcher.style.left = newLeft + 'px';
});

function startGame() {
    fallingObject.style.top = '0px';
    fallingObject.style.left = Math.random() * (gameAreaWidth - fallingObjectSize) + 'px';

    gameInterval = setInterval(() => {
        let fallingObjectTop = parseInt(fallingObject.style.top);
        fallingObject.style.top = fallingObjectTop + fallingSpeed + 'px';

        if (fallingObjectTop > gameArea.offsetHeight - fallingObjectSize - 30) {
            if (isCaught()) {
                alert('Good catch!');
                resetGame();
            } else {
                alert('You missed!');
                resetGame();
            }
        }
    }, 20);
}

function isCaught() {
    let catcherRect = catcher.getBoundingClientRect();
    let fallingObjectRect = fallingObject.getBoundingClientRect();

    return (
        fallingObjectRect.left < catcherRect.right &&
        fallingObjectRect.right > catcherRect.left &&
        fallingObjectRect.bottom > catcherRect.top
    );
}

function resetGame() {
    clearInterval(gameInterval);
    startGame();
}

startGame();


