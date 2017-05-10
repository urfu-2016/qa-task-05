'use strict';

var tileCount = 15;

function createTileElement(number) {
    var div = document.createElement('div');
    div.className = number ? "tile" : "tile-hidden";
    div.innerText = number || '';

    return div;
}

function shuffle(array) {
    var j, temp;
    for (var i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        temp = array[i - 1];
        array[i - 1] = array[j];
        array[j] = temp;
    }
}


function createGame() {
    var game = document.getElementById('game');
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].forEach(function(number) {
        var tile = createTileElement(number);
        game.appendChild(tile);
    });
    game.appendChild(createTileElement());
}

createGame();