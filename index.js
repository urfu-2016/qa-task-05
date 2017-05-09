'use strict';

var SIZE_FIELD = 4;
var CURRENT_COMBINATION = [];
var WINNER_COMBINATION = [];


function createGame() {
    document.getElementById('start-game-button').onclick = function () {
        clear();
        createGame();
    };
    WINNER_COMBINATION = getWinnerCombination();
    CURRENT_COMBINATION = shuffle(WINNER_COMBINATION.slice());
    fillGameField();
}

function clear() {
    document.getElementById('game-field').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

function fillGameField() {
    var field = document.getElementById('game-field');
    CURRENT_COMBINATION.forEach(function (elem, index) {
        field.appendChild(createChip(elem, index));
    });
}

function render() {
    clear();
    fillGameField()
}

function createChip(number, index) {
    var chip = document.createElement('div');
    chip.innerHTML = number + '';
    chip.className = number ? 'chip' : 'chip zero';
    if (number) {
        chip.onclick = cellClick.bind(this, index);
    }

    return chip;
}

function isEmpty(index) {
    return (index >= 0) &&
        (index < SIZE_FIELD*SIZE_FIELD) &&
        (CURRENT_COMBINATION[index] === 0);
}

function swap(indexFrom, indexTo) {
    var temp = CURRENT_COMBINATION[indexFrom];
    CURRENT_COMBINATION[indexFrom] = CURRENT_COMBINATION[indexTo];
    CURRENT_COMBINATION[indexTo] = temp;
}

function cellClick(index) {
    if (isEmpty(index + 1)) {
        swap(index, index + 1);
        render();
    }

    if (isEmpty(index - 1)) {
        swap(index, index - 1);
        render();
    }

    if (isEmpty(index + 4)) {
        swap(index, index + 4);
        render();
    }

    if (isEmpty(index - 4)) {
        swap(index, index - 4);
        render();
    }

    if (isWin()) {
        document.getElementById('result').innerHTML = 'Вы выиграли!';
    }
}

function isWin() {
    return JSON.stringify(WINNER_COMBINATION) === JSON.stringify(CURRENT_COMBINATION);
}

function getWinnerCombination() {
    var combination = [];
    for (var i = 1; i < SIZE_FIELD*SIZE_FIELD; i++) {
        combination.push(i);
    }
    combination.push(0);

    return combination;
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

createGame();