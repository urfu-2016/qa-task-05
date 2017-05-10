function random(x) {
    return Math.floor(Math.random() * x);
}
function checkPermutation(permutation) {
    e = 0;
    sum = 0;
    for (i = 0; i < permutation.length; i++) {
        if (permutation[i] === 0)
            e = i / 4 + 1;
        else {
            for (j = i + 1; j < permutation.length; j++)
                if (permutation[j] !== 0 && permutation[j] < permutation[i])
                    sum++;
        }
    }
    return (sum + e) % 2 === 0;
}
function shuffle(arr) {
    for (i = 0; i < 17; i++) {
        x = random(16);
        y = random(16);
        t = arr[x];
        arr[x] = arr[y];
        arr[y] = t;
    }
}

function generateSinglePermutatioin() {
    result = new Array(16);
    for (i = 0; i < 16; i++)
        result[i] = i;
    shuffle(result);
    return result;
}

function generateNumbers(genPermutation) {
    permutation = genPermutation();
    while (!checkPermutation(permutation)) 
        permutation = genPermutation();
    return permutation;
}
function toPixels(value) {
    return value + 'px'; 
}
function fromPixels(value) {
    return parseInt(value.substring(0, value.length - 2));
}

function coordinatesInside(x, y) {
    return 0 <= x && x < 4 && 0 <= y && y < 4;
}
function isCorrectLocation(item, x, y) { //not tested
    return item.XCoordinate == x && item.YCoordinate == y;
}
function swapItems(x1, y1, x2, y2) {
    var list = document.body.getElementsByClassName('block');
    var item1 = null;
    var item2 = null;
    for (var i = 0; i < list.length; i++) {
        if (isCorrectLocation(list[i], x1, y1))
            item1 = list[i];
        if (isCorrectLocation(list[i], x2, y2))
            item2 = list[i];
    }
    var textTMP = item1.textContent;
    var colorTMP = item1.style.backgroundColor;
    var empTMP = item1.EmptyCell;
    item1.EmptyCell = item2.EmptyCell;
    item1.textContent = item2.textContent;
    item1.style.backgroundColor = item2.style.backgroundColor;
    item2.EmptyCell = empTMP;
    item2.textContent = textTMP;
    item2.style.backgroundColor = colorTMP;

}
function isNearItem(item, x, y) {
    return (Math.abs(item.XCoordinate - x) == 1 && Math.abs(item.YCoordinate - y) == 0) ||
            (Math.abs(item.XCoordinate - x) == 0 && Math.abs(item.YCoordinate - y) == 1);
}
function getNearEmpty(x, y) {
    var list = document.body.getElementsByClassName('block');
    var result = {x: -1, y: -1};
    for (var i = 0; i < list.length; i++) {
        if (!(x == list[i].XCoordinate &&
                y == list[i].YCoordinate) &&
                isNearItem(list[i], x, y) &&
                list[i].EmptyCell) {
            result.x = list[i].XCoordinate;
            result.y = list[i].YCoordinate;
            break;
        }
    }
    return result;
}

function checkGameWin(blocks) {
    if (blocks.length != 16)
        throw Error("list size is bad");
    for (i = 0; i < 15; i++) {
        if (blocks[i].textContent != (i + 1))
            return false;
    }
    return blocks[15].EmptyCell;
}

function winAlert() {
    alert("Win");
    location.reload();
}

function makeMove(x, y, store) {
    blocks = store.getElementsByClassName('block');
    if (checkGameWin(blocks)) 
        return;
    var emptyNear = getNearEmpty(x, y);
    if (emptyNear.x != -1)
        swapItems(x, y, emptyNear.x, emptyNear.y);
    if (checkGameWin(blocks))
        winAlert();
}
function createItem(par, size, x, y, color, text, isEmpty) {
    var div = document.createElement('div');
    div.setAttribute("class", "block");
    var width = size;
    var height = size;
    div.XCoordinate = x;
    div.YCoordinate = y;
    div.EmptyCell = isEmpty;
    div.textContent = text;
    div.style.backgroundColor = color;
    div.style.position = 'fixed';
    div.style.left = toPixels(x * size);
    div.style.top = toPixels(y * size);
    div.style.width = toPixels(width);
    div.style.height = toPixels(height);
    div.style.textAlign = 'center';
    par.appendChild(div);
}
function createField(permutation, store) {
    var cnt = 0;
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (permutation[cnt] === 0)
                createItem(store, 100, j, i, 'aqua', '', true);
            else
                createItem(store, 100, j, i, 'lawngreen', permutation[cnt], false);
            cnt++;
        }
    return store;
}
function go15() {
    permutation = generateNumbers(generateSinglePermutatioin);
    createField(permutation, document.body);
}
function makeMouseMove(event){
    var x = event.target.XCoordinate;
    var y = event.target.YCoordinate;
    makeMove(x, y, document.body);
}

document.body.onload = go15();
document.body.onclick = makeMouseMove;