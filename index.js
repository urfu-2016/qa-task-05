// Логику пятнашек нужно описать в этом файле
var pole = [[3 ,1],
            [2 ,0]];
function getCor(event) {
            var el = document.getElementById('game');
            var pX = Math.round((event.clientX - findPosX(el))/110 - 0.5);
            var pY = Math.round((event.clientY - findPosY(el))/105 - 0.5);
            if (pX === 2) {
                pX = 1;
            }
            if (pY ===2) {
                pY = 1;
            }
            move(pX, pY);
            if (win()) {
                alert("WIN");
            }
        }
        function findNum(num) {
            for(var i = 0; i < pole.length; i++) {
                for(var j = 0; j < pole.length; j++) {
                    if (pole[i][j] === num) {
                        return [i, j];
                    }
                }
            }
        }
        function deleTe() {
            var game = document.getElementById('game');
            for(var i = 0; i < 4; i++) {
                game.removeChild(document.getElementById('pole'+i));
            }
        }
        function swapDiv(x, y, nameDiv, numDiv) {
            var two = findNum(numDiv);
            pole[x][y] = numDiv;
            pole[two[0]][two[1]] = 0;
            var d1=document.getElementById(nameDiv);
            var d2=document.getElementById("pole0");
            var d11=d1.cloneNode(true);
            var d22=d2.cloneNode(true);
            d2.parentNode.insertBefore(d11,d2);
            d1.parentNode.insertBefore(d22,d1);
            d1.parentNode.removeChild(d1);
            d2.parentNode.removeChild(d2);

        }
        function notDiag(x, y, num) {
            if ((x === y && findNum(num)[0] === findNum(num)[1]) ||
            (x === findNum(num)[1] && findNum(num)[0] === y)) {
                return false;
            }
            return true;
        }
        function move(x, y) {
            var but1 = document.getElementById('but1');
            var but2 = document.getElementById('but2');
            var but3 = document.getElementById('but3');
            if(pole[x][y] === 0) {
                if (but1.checked && notDiag(x, y, 1)) {
                    swapDiv(x, y, "pole1", 1);
                }
                if (but2.checked && notDiag(x, y, 2)) {
                    swapDiv(x,y,"pole2",2);
                }
                if (but3.checked && notDiag(x, y, 3)) {
                    swapDiv(x,y,"pole3",3);
                }
            }
            return pole;
        }
        function win() {
            if(pole[0][0] === 1 && pole[0][1] === 3 && pole[1][0] === 2 ) {
                return true;
            }
            return false;
        }
        function startGame() {
            pole = [[3 ,1],
                    [2 ,0]];
            addElements();
            swapDiv(1,1,"pole3",3);
        }
        function addElements() {
            var my_div = document.getElementById("game");
            for(var i=3; i>=0; i--) {
                var radio = document.createElement("input");
                radio.name = 'polygon';
                radio.className = "active" + i;
                radio.type = 'radio';
                radio.id = "but" + i;
                var div = document.createElement("div");
                div.className = "point" + i;
                if (i > 0) {
                    div.innerHTML = "<h1>" + i + "</h1>";
                }
                div.id = 'pole' + i;
                var label = document.createElement("label");
                label.htmlFor = "but" + i;
                if(i > 0) {
                    div.appendChild(label);
                    document.body.insertBefore(radio, my_div);
                }
                my_div.appendChild(div);
            }
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
