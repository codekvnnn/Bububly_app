// this would be in the JS portion on the HTML file. 


const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
let gameAreaWidth = gameArea.offsetWidth;
let basketSpeed = 20;
let interval;
let objects = [];
let score = 0;

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            moveBasket(-basketSpeed);
            break;
        case 'ArrowRight':
            moveBasket(basketSpeed);
            break;
    }
});

function moveBasket(direction) {
    let currentLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));
    if (currentLeft + direction >= 0 && currentLeft + direction <= gameAreaWidth - basket.offsetWidth) {
        basket.style.left = (currentLeft + direction) + 'px';
    }
}

function dropObjects() {
    const objDiv = document.createElement('div');
    objDiv.className = 'falling-object';
    objDiv.style.left = Math.floor(Math.random() * (gameAreaWidth - 30)) + 'px';
    gameArea.appendChild(objDiv);
    objects.push(objDiv);
}

function updateObjects() {
    for (let obj of objects) {
        let objTop = parseInt(window.getComputedStyle(obj).getPropertyValue('top'));
        if (objTop >= gameArea.offsetHeight - basket.offsetHeight - 30) {
            if (isCaught(obj)) {
                score++;
                console.log('Score:', score);
            }
            obj.remove();
        } else {
            obj.style.top = (objTop + 5) + 'px';
        }
    }
}

function isCaught(obj) {
    let objLeft = parseInt(window.getComputedStyle(obj).getPropertyValue('left'));
    let basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));
    return objLeft >= basketLeft && objLeft <= basketLeft + basket.offsetWidth;
}

interval = setInterval(() => {
    updateObjects();
}, 50);

setInterval(() => {
    dropObjects();
}, 1000);
