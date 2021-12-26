const pixelBoard = document.getElementById('pixel-board');
let reloadTimes = 1;

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

function randInt() {
  return Math.floor(Math.random() * 256);
}

window.onload = function () {
  const firstColorPalette = document.getElementsByClassName('color')[0];
  firstColorPalette.className += ' ' + 'selected';
  const inputBoardSize = document.getElementById('board-size');
  inputBoardSize.value = '';
  for (let index = 1; index < colorsList.length; index += 1) {
    const colorItem = colorsList[index];
    colorItem.style.backgroundColor = `rgb(${randInt()}, ${randInt()}, ${randInt()})`;
  }  
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
  const colorSelectedElement =
    document.getElementsByClassName('color selected')[0];
  const actualSelectedColor = window
    .getComputedStyle(colorSelectedElement, null)
    .getPropertyValue('background-color');
  coloredPixel.style.backgroundColor = actualSelectedColor;
}

for (const pixel of pixelsList) {
  pixel.addEventListener('click', changePixelColor);
}

const clearButton = document.getElementById('clear-board');

function clearBoard() {
  for (const pixel of pixelsList) {
    pixel.style.backgroundColor = '#ffffff';
  }
}

clearButton.addEventListener('click', clearBoard);

const changeBoardSizeBtn = document.getElementById('generate-board');

function destroyPixelBoard() {
  for (let index = pixelsList.length - 1; index >= 0; index -= 1) {
    const pixelSquare = pixelsList[index];
    pixelBoard.removeChild(pixelSquare);
  }
}

function resizeBoard() {
  const inputBoardSize = document.getElementById('board-size');
  if (inputBoardSize.value > 50) {
    alert('Embora o valor seja maior que 50, o quadro se limitará a 50 x 50.');
  }
  const newSize = inputBoardSize.value > 50 ? 50 : inputBoardSize.value;
  console.log('ns: ', newSize);
  try {
    if (newSize === '') {
      throw 'Board inválido!';
    } else if (isNaN(newSize) === true) {
      throw 'Digite um valor númerico.';
    } else if (newSize < 0) {
      throw 'Digite um número positivo.';
    } else if (newSize < 5) {
      throw 'Insira um valor maior que 5.';
    } else if (newSize != parseInt(newSize)) {
      throw 'Digite apenas números inteiros.';
    }
  } catch (err) {
    alert(err);
    inputBoardSize.value = '';
    destroyPixelBoard();
    const pixelBoardWidth = '210px';
    pixelBoard.style.width = pixelBoardWidth;
    createPixelBoard(25);
    for (const pixel of pixelsList) {
      pixel.addEventListener('click', changePixelColor);
    }
    return;
  }
  destroyPixelBoard();
  createPixelBoard(newSize * newSize);
  const newPixelBoardWidth = newSize * 40 + newSize * 2 + 'px'; // (newSize * 2) pq cada lateral do pixel tem 1px de largura.
  pixelBoard.style.width = newPixelBoardWidth;
  inputBoardSize.value = '';
  for (const pixel of pixelsList) {
    pixel.addEventListener('click', changePixelColor);
  }
}

changeBoardSizeBtn.addEventListener('click', resizeBoard);
const inputBoardSize = document.getElementById('board-size');
inputBoardSize.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    resizeBoard();
  }
});
