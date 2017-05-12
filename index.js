// Логику пятнашек нужно описать в этом файле
'use strict';

let mainField = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
];

let FIELD_SIZE = 4;
let VICTORY_SEQUENCE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

function isGameOver(field) {
    for (let i = 0; i < VICTORY_SEQUENCE.length; i++) {
        if (VICTORY_SEQUENCE[i] !== field[Math.floor(i / FIELD_SIZE)][i % FIELD_SIZE]) {
            return false;
        }
    }

    return true;
}

function trySwap(elementId, field) {
    if (!field) {
        field = mainField;
    }
    let elem = document.getElementById(elementId);
    console.log(elementId);
    if (elem.textContent === "") {
        return;
    }
    let value =  parseInt(elem.textContent);
    let empty = findEmptyElement(field);
    let neighbors = getNeighbors(empty, field);
    let id = parseInt(elementId);
    let elementPosition = {x:Math.floor(id / FIELD_SIZE), y:id % FIELD_SIZE};
    neighbors = neighbors.filter(function (position) {
        return position.x === elementPosition.x && position.y === elementPosition.y;
    });
    if (neighbors.length === 1) {
        swap(elementPosition, empty, field);
        elem.textContent = "";
        document.getElementById((empty.x * 4 + empty.y).toString()).textContent = value.toString();
    }
    if (isGameOver(field)) {
        window.alert("VICTORY");
    }
}

function swap(elem1, elem2, field) {
    let elem = field[elem1.x][elem1.y];
    field[elem1.x][elem1.y] = field[elem2.x][elem2.y];
    field[elem2.x][elem2.y] = elem;
}

function findEmptyElement(field) {
    for (let x = 0; x < FIELD_SIZE; x++) {
        for (let y = 0; y < FIELD_SIZE; y++) {
            if (field[x][y] === 0) {
                return {x:x, y:y};
            }
        }
    }
}

function getNeighbors(point) {
    let points = [
        {x:point.x - 1, y:point.y},
        {x:point.x + 1, y:point.y},
        {x:point.x, y:point.y - 1},
        {x:point.x, y:point.y + 1},
    ];

    return points.filter(function(p) {
        return p.x >= 0 && p.x < FIELD_SIZE && p.y >= 0 && p.y < FIELD_SIZE;
    });
}

function shuffle(field) {
    let emptyElement = findEmptyElement(field);
    for (let i = 0; i < 200; i++) {
        let neighbors = getNeighbors(emptyElement);
        let rnd = Math.floor(Math.random() * neighbors.length);
        swap(emptyElement, neighbors[rnd], field);
        emptyElement = neighbors[rnd];
    }
}

function draw(field) {
    for (let i = 0; i < Math.pow(FIELD_SIZE, 2); i++) {
        let id = i.toString();
        let elem = document.getElementById(id);
        let value = field[Math.floor(i / FIELD_SIZE)][i % FIELD_SIZE].toString();
        if (value === "0") {
            value = "";
        }
        elem.textContent = value;
    }
}

function main() {
    shuffle(mainField);
    draw(mainField);
}

main();
