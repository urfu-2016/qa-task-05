var tiles = prepareTiles();
var directions = {up: -4, left: -1, down: 4, right: 1};
var gameField = document.getElementById('game');

function prepareTiles() {
    var tiles = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    tiles.unshift(0);

    return tiles;
}

function createTiles() {
    for (var i = 0; i < 16; i++) {
        var tile = document.createElement('div');
        tile.className = 'tile';
        tile.onclick = onTileClick.bind(this, tile);
        gameField.appendChild(tile);
    }
}

function shuffle(array) {
    return array.sort(function() { return Math.random() - 0.5; });
}

function swap(array, a, b) {
    var t = array[a]; 
    array[a] = array[b]; 
    array[b] = t; 
}

function isCompleted(game) {
    return !game.some(function(value, i) { 
        return value > 0 && value - 1 !== i; 
    });
}

function tryMove(direction) {
    var hole = tiles.indexOf(0);
    var index = hole - direction;
    
    if (!tiles[index]) 
        return false;
    
    if (direction === directions.left || direction === directions.right)
        if (Math.floor(hole/4) !== Math.floor(index/4)) 
            return false;
    
    swap(tiles, index, hole);
    
    return true; 
}

function render() {
    for (var i = 0; i < 16; i++) { 
        var tile = gameField.childNodes[i];
        tile.textContent = tiles[i] === 0 ? '' : tiles[i];
    } 
}

function getDirectionByClick(tile) {
    var index = tiles.indexOf(tile);
    return Object.keys(directions).filter(function (direction) {
        return tiles[index + directions[direction]] === 0;
    })[0];
    
}

function onTileClick(tileDiv) {
    var tileIndex = parseInt(tileDiv.textContent);
    var direction = getDirectionByClick(tileIndex);
    
    var canMove = tryMove(directions[direction]);

    if (canMove) {
        render(); 
        
        if (isCompleted(tiles)) {
            var winMessageDiv = document.getElementById('win-message');
            winMessageDiv.style.visibility = 'visible';
        }
    }
}

function startGame() {
    gameField.innerHTML = '';
    createTiles();
    tiles = prepareTiles();
    render();
}

window.onload = startGame;