var SIZE = 4;
var recSize = 100;
var POLE = [];
function getCor(event) {
    var el = document.getElementById('game');
    var pX = Math.trunc((event.clientX - findPosX(el))/recSize);
    var pY = Math.trunc((event.clientY - findPosY(el))/recSize);
    move(pX, pY);
    if (win()) {
        alert("You win!");
    }
}
function findNum(num) {
    for(var i = 0; i < SIZE; i++) {
        for(var j = 0; j < SIZE; j++) {
            if (POLE[i][j] === num) {
                return [i, j];
            }
        }
    }
}
function win() {
    var w = 1;
    for(var i = 0; i < SIZE; i++) {
        for(var j = 0; j < SIZE; j++) {
            if (POLE[i][j] === w) {
                w++
            } else {
                return false
            }
        }
    }
    return true;
}
function deleTe() {
    var game = document.getElementById('game');
    for(var i = 0; i < SIZE*SIZE; i++) {
        game.removeChild(document.getElementById('pole'+i));
    }
}
function swapDiv(x, y, nameDiv, numDiv) {
    var two = findNum(numDiv);
    POLE[y][x] = numDiv;
    POLE[two[0]][two[1]] = 0;
    var d1=document.getElementById(nameDiv);
    var d2=document.getElementById("pole0");
    var d11=d1.cloneNode(true);
    var d22=d2.cloneNode(true);
    d2.parentNode.insertBefore(d11,d2);
    d1.parentNode.insertBefore(d22,d1);
    d1.parentNode.removeChild(d1);
    d2.parentNode.removeChild(d2);

}
function move(x, y) {
    if (POLE[y][x] != 0) {
        if (y - 1 >= 0) {
            if (POLE[y - 1][x] === 0) {
                swapDiv(x, y - 1, 'pole' + POLE[y][x], POLE[y][x]);
            }
        }
        if (y + 1 < SIZE) {
            if (POLE[y + 1][x] === 0) {
                swapDiv(x, y + 1, 'pole' + POLE[y][x], POLE[y][x]);

            }
        }
        if (x - 1 >= 0) {
            if (POLE[y][x - 1] === 0) {
                swapDiv(x - 1, y, 'pole' + POLE[y][x], POLE[y][x]);
            }
        }
        if (x + 1 < SIZE){
            if(POLE[y][x + 1] === 0) {
                swapDiv(x + 1, y, 'pole' + POLE[y][x], POLE[y][x]);
            }
        }
    }
}
function startGame() {
    addElements();
}
function random(set) {
    var rec = -1;
    set.add(16);
    while (set.has(rec)) {
        rec = Math.floor(Math.random() * SIZE * SIZE) + 1;
    }
    return rec;
}
function addElements() {
    var a = new Set();
    a.add(-1);
    var my_div = document.getElementById("game");
    var j = 0;
    var maxRec = 0;
    for(var i = 0; i < SIZE; i++) {
        POLE[i] = [];
        while (j < SIZE && maxRec < SIZE*SIZE - 1){
            var rec = random(a);
            a.add(rec);
            POLE[i][j] = rec;
            var div = document.createElement("div");
            div.className = "point" + POLE[i][j];
            div.innerHTML = "<h1>" + POLE[i][j] + "</h1>";
            div.id = 'pole' + POLE[i][j];
            my_div.appendChild(div);
            j++;
            maxRec++;
        }
        j = 0;
    }
    div = document.createElement("div");
    div.className = "point0";
    div.id = 'pole0';
    my_div.appendChild(div);
    POLE[SIZE-1][SIZE-1] = 0;
}
function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (1) {
            curleft+=obj.offsetLeft;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.x) {
        curleft+=obj.x;
    }
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (1) {
            curtop+=obj.offsetTop;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.y) {
        curtop+=obj.y;
    }
    return curtop;
}
