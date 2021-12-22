const pixelBoard = document.getElementById('pixel-board');

function createPixelBoard(boardSize) {
    for (let index = 0; index < boardSize; index += 1) {
    const pixelItem = document.createElement('div');
    pixelItem.setAttribute('class', 'pixel');
    pixelBoard.appendChild(pixelItem);
    }
}

createPixelBoard(25);

const pixelsList = document.getElementsByClassName('pixel');
const colorsList = document.getElementsByClassName('color');

window.onload = function () {
    const firstColorPalette = document.getElementsByClassName('color')[0];
    firstColorPalette.className += ' ' + 'selected';
};

function paletteClickColor(event) {
    const selectedElement = event.target;    
    for (const element of colorsList) {
        element.className = 'color';
    }
    selectedElement.className = 'color selected';
}

for (const colorsListItem of colorsList) {
    colorsListItem.addEventListener('click', paletteClickColor);
}

function changePixelColor(event) {
    const coloredPixel = event.target;
    const colorSelectedElement = document.getElementsByClassName('color selected')[0]; 
    const actualSelectedColor = window.getComputedStyle(colorSelectedElement, null).getPropertyValue('background-color');
    coloredPixel.style.backgroundColor = actualSelectedColor;
}

for (const pixel of pixelsList) {
    pixel.addEventListener('click', changePixelColor);
}
