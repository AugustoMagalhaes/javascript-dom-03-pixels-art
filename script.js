const pixelBoard = document.getElementById('pixel-board');

function createPixelBoard(boardSize) {
    for (let index = 0; index < boardSize; index += 1) {
    const pixelItem = document.createElement('div');
    pixelItem.setAttribute('class', 'pixel');
    pixelBoard.appendChild(pixelItem);
    }
}

createPixelBoard(25);