let oneClick = true;
const activeItems = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
};

let game = document.getElementById('game');
let items = document.getElementsByClassName('gameItem');
let newGame = document.getElementById('newGame');
let winMes = document.getElementById('winMes');

function add(item, num) {

    let span = document.createElement('span');

    if (!item.textContent) {
        span.innerHTML = oneClick ? 'X' : 'O';
        item.append(span);
    }

    oneClick = !oneClick;

    for (let key in activeItems) {
        if (num === +key) {
            activeItems[key] = item.firstElementChild.textContent;
        }
    }

    checkWin()
}


function checkWin() {

    let winArr = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winArr.length; i++) {
        let winLine = winArr[i];
        if (Object.values(activeItems)[winLine[0]] !== null &&
            Object.values(activeItems)[winLine[1]] !== null &&
            Object.values(activeItems)[winLine[2]] !== null &&
            Object.values(activeItems)[winLine[0]] === Object.values(activeItems)[winLine[1]] &&
            Object.values(activeItems)[winLine[1]] === Object.values(activeItems)[winLine[2]] ||
            !checkDeadHeat(activeItems)) {

            newGame.removeAttribute('disabled');

            winMes.style.top = '0px';
            game.style.pointerEvents = 'none';
        }
    }
}

newGame.addEventListener('click', () => {

    for (let i = 0; i < items.length; i++) {
        if (items[i].firstElementChild) {
            items[i].firstElementChild.remove();
        }
    }

    for (let key in activeItems) {
        activeItems[key] = null;
    }

    oneClick = true;
    game.style.pointerEvents = 'auto';

    setTimeout(() => {
        winMes.style.top = '-110px';
    }, 500);
})

function checkDeadHeat(obj) {

    for (let key in obj) {
        let val = obj[key];

        if (val === null) {
            return true;
        }
    }
    return false;
}
