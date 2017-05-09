'use strict';

var emptySpacePosition;
// массив с текущей последовательностью клеток, чтобы потом проверять победу
var spacesCurrPositions = [];

// здесь будут изначальные координаты клеток после их генерации
var coordinates = {};

// при загрузке страницы сразу генерируем игру
setOnRandomPositions();

var simpleGame = document.getElementsByClassName('simple-game')[0];
simpleGame.onclick = function() {
    setOnSimplePositions();
}


function setOnclick() {
    var clickedSpaces = document.getElementsByClassName('space');
    for (var i = 0; i < clickedSpaces.length; i++) {
        clickedSpaces[i].onclick = function() {
            move(this);
        }
    }
}

function setOnPositions() {
    emptySpacePosition = 15;
    coordinates = {};

    var i = 0;
    var puzzleBox = document.getElementsByClassName('puzzle-box')[0];
    spacesCurrPositions.forEach(function(spaceNum) {
        // присваиваем координаты
        coordinates[spaceNum] = {};
        coordinates[spaceNum].y = Math.floor(i / 4); 
        coordinates[spaceNum].x = i % 4; 
        var space = document.createElement('div');
        space.classList.add('space', 'space' + spaceNum);
        space.innerHTML = '' + spaceNum;
        puzzleBox.appendChild(space);
        i++;
    });

    // за пустое поле отвечать будет 16
    spacesCurrPositions.push(16);
    coordinates[16] = {};
    coordinates[16].y = 4;
    coordinates[16].x = 4;

    setOnclick();
}

function setOnRandomPositions() {
    spacesCurrPositions = [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14];

    // отсеять варианты, когда победа недостижима
    while (!isPossibleToWin(spacesCurrPositions)) {
        spacesCurrPositions.sort(function(a, b) {
            return Math.random() - 0.5;
        })
    }

    setOnPositions();
}

function removeChildren(elem) {
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
}

// простая позиция для проверки победы
function setOnSimplePositions() {
    var oldSpaces = document.getElementsByClassName('space');
    var puzzleBox = document.getElementsByClassName('puzzle-box')[0];
    removeChildren(puzzleBox);
    var simplePositions = [1, 2 ,3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 13, 14, 11];
    spacesCurrPositions = simplePositions;

    setOnPositions();
}

function move(space) {
    var spaceNum = parseInt(space.innerHTML);
    var spacePosition = spacesCurrPositions.indexOf(spaceNum);

    function transit() {
        var fromX = coordinates[spaceNum].x;
        var fromY = coordinates[spaceNum].y;
        var toX = emptySpacePosition % 4;
        var toY = Math.floor(emptySpacePosition / 4);
        var axisX = (toX - fromX)*100 + '%';
        var axisY = (toY - fromY)*100 + '%';
        space.style.cssText = 'transform: translate(' + axisX + ', ' + axisY + ')';
        spacesCurrPositions.swapElements(spacePosition, emptySpacePosition);
        emptySpacePosition = spacePosition;
    }

    switch (emptySpacePosition) {
        case (spacePosition - 4):
            transit();
            break;
        case (spacePosition + 1):
            transit();
            break;
        case (spacePosition + 4):
            transit();
            break;
        case (spacePosition - 1):
            transit();
            break;
    }

    isVictoriousPosition(spacesCurrPositions);
}

Array.prototype.swapElements = function (indexA, indexB) {
    var temp = this[indexA];
    this[indexA] = this[indexB];
    this[indexB] = temp;
    return this;
}

function isVictoriousPosition(mas) {
    var result = true;
    for (var i = 0; i < 16; i++) {
        if (mas[i] !== i + 1) {
            result = false;
            break;
        }
    }
    if (result === true) {
        var victoryScreen = document.getElementsByClassName('victory-screen')[0];
        victoryScreen.style.cssText = 'display: block';
    }
}

function isPossibleToWin(positions) {
    var sum = 0;
    for (var i = 0; i < positions.length; i++) {
        for (var j = i + 1; j < positions.length; j++) {
            if (positions[i] > positions[j]) {
                sum++;
            }
        }
    }

    return sum % 2 === 0 ? true : false;
}