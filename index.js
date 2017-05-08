// Логику пятнашек нужно описать в этом файле
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

function hideModal() {
  var modal = document.getElementById('win-modal');
  modal.style.display = 'none';
}

function printWin() {
  var modal = document.getElementById('win-modal');
  modal.style.display = "block";
}

function checkWin(board) {
  var counter = 0;
  var winnerPositions = [];
  for (var i=1;i<16;i++) {
    winnerPositions.push(i);
  }
  winnerPositions.push(0);
  for (var i=0;i<4;i++) {
    for (var j=0;j<4;j++) {
      if (board[i][j] !== winnerPositions[counter]) {
        return false;
      } else {
        counter++;
      }
    }
  }
  return true;
}

function canMoveCell(x, y) {
  if (board[x + 1] && board[x + 1][y] === 0) {
    board[x + 1][y] = board[x][y];
    board[x][y] = 0;
    return { type: 'bottom' , x: x + 1, y: y}
  }
  if (board[x - 1] && board[x - 1][y] === 0) {
    board[x - 1][y] = board[x][y];
    board[x][y] = 0;
    return { type: 'top' , x: x - 1, y: y}
  }
  if (board[y + 1] && board[x][y + 1] === 0) {
    board[x][y + 1] = board[x][y];
    board[x][y] = 0;
    return { type: 'right' , x: x, y: y + 1}
  }
  if (board[y - 1] && board[x][y - 1] === 0) {
    board[x][y - 1] = board[x][y];
    board[x][y] = 0;
    return { type: 'left' , x: x, y: y - 1}
  }
}

function clickOnBoard(event) {
  var cellNode = event.target.closest('.cell');
  var cell = cellNode.className.match(/ (.+)/)[1].split('-');
  var move = canMoveCell(parseInt(cell[0]), parseInt(cell[1]))
  var sign = 1;

  if (move) {
    switch(move.type) {
      case 'left':
        sign = -1;
        break;
      case 'right':
        move.type = 'left';
        break;
      case 'top':
        sign = -1;
        break;
      case 'bottom':
        move.type = 'top';
        break;
    }
    if (Number.isNaN(parseInt(cellNode.style[move.type]))) {
      cellNode.style[move.type] = '0px';
    }
    cellNode.style[move.type] = parseInt(cellNode.style[move.type]) + (sign * 100) + 'px';
    cellNode.className = 'cell ' + (move.x) + '-' + (move.y);
    if (checkWin(board)) {
      printWin();
    }
  } else {
    cellNode.style.transform = 'rotate(360deg)';
    setTimeout(function() {
      cellNode.style.transform = '';
    }, 300);
  }
}

function printBoard(board, needMargin) {
  var boardDiv = document.getElementsByClassName('board')[0];
  boardDiv.innerHTML = '';
  for (var i = 1; i <= 4; i++) {
    for (var j = 1; j <= 4; j++) {
      if (board[i - 1][j - 1] !== 0) {
        var cell = document.createElement('div');
        cell.onclick = clickOnBoard;
        var indClass = (i - 1) + '-' + (j - 1);
        cell.className = 'cell ' + indClass;
        if (needMargin && i === 1 && j === 2) {
          cell.style.marginLeft = '100px';
        }
        cell.innerHTML = '<div class="text-cell">' + board[i - 1][j - 1] + '</div>';
        boardDiv.appendChild(cell);
      }
    }
  }
}

var board = [];

function startGame() {
  hideModal();
  var randoms = [];
  for (var i = 1; i < 16; i++) {
    randoms.push(i);
  }
  shuffle(randoms);
  randoms.unshift(0);
  board = []
  for (var i=1;i<=4;i++) {
    board[i - 1] = []
    for (var j=1;j<=4;j++) {
      board[i - 1][j - 1] = randoms[4 * (i - 1) + (j - 1)];
    }
  }
  printBoard(board, true);
}

startGame();

var reloadButton = document.getElementById('reload-game');

reloadButton.onclick = function () {
  hideModal();
  startGame();
};

