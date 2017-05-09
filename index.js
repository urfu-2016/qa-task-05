// Логику пятнашек нужно описать в этом файле
var app = (function() {
    var generateCells = function() {
        var specksBlock = document.createDocumentFragment();
        var nums = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        var randomNums = nums.slice().sort(function() {
            return .5 - Math.random();
        });
        /** Add clear block */
        var specksItemNone = document.createElement('div');
        specksItemNone.className = 'specks__item specks__item--hidden';
        specksItemNone.style.gridColumn = 1;
        specksItemNone.style.gridRow = 1;
        specksBlock.appendChild(specksItemNone);

        nums.forEach(function(item, ind) { 
            var newSpecksItem = document.createElement('div');
            newSpecksItem.addEventListener('click', handlerClick)
            newSpecksItem.className = 'specks__item';
            newSpecksItem.style.gridColumn = randomNums[ind] === 16 ? 1 : parseInt(randomNums[ind] / 4, 10) + 1;
            newSpecksItem.style.gridRow = randomNums[ind] === 16 ? 2 :parseInt(randomNums[ind] % 4, 10) + 1;
            newSpecksItem.innerHTML = (item === 16) ? 1 : item;
            newSpecksItem.setAttribute('value', (item === 16) ? 1 : item);
            specksBlock.appendChild(newSpecksItem);
        })
        document.querySelector('.specks').appendChild(specksBlock);
    }

    var isValidCheck = function(el1, el2) {
            var colEl1 = +el1.style.gridColumn[0];
            var colEl2 = +el2.style.gridColumn[0];
            var rowEl1 = +el1.style.gridRow[0];
            var rowEl2 = +el2.style.gridRow[0];
            return (Math.abs(colEl1 - colEl2) === 1 && Math.abs(rowEl1 - rowEl2) === 0)
                || (Math.abs(colEl1 - colEl2) === 0 && Math.abs(rowEl1 - rowEl2) === 1);
    }
    var moveSpecksBlocks = function(el1, el2) {
        var gridRow = el1.style.gridRow;
        var gridCol = el1.style.gridColumn;
        el1.style.gridRow = el2.style.gridRow;
        el1.style.gridColumn = el2.style.gridColumn;
        el2.style.gridRow = gridRow;
        el2.style.gridColumn = gridCol;
        }
    var isGameFinish = function() {
        var specksBlocks = document.querySelectorAll('.specks__item');
        var specksItemNone = document.querySelector('.specks__item--hidden');
        if (+specksItemNone.style.gridRow[0] !== 4 || +specksItemNone.style.gridColumn[0] !== 4)
            return false
        var flag = true;
        for (var i = 1; i < specksBlocks.length; i++) {
            if (+specksBlocks[i].innerHTML < 5 && (+specksBlocks[i].style.gridRow[0] !== 1
                ||  +specksBlocks[i].style.gridColumn[0] !== +specksBlocks[i].innerHTML))
                flag = false

            if (+specksBlocks[i].innerHTML > 4 && +specksBlocks[i].innerHTML < 9
                && (+specksBlocks[i].style.gridRow[0] !== 2 ||  +specksBlocks[i].style.gridColumn[0] !== +specksBlocks[i].innerHTML - 4))
                flag = false

            if (+specksBlocks[i].innerHTML > 8 && +specksBlocks[i].innerHTML < 13
                && (+specksBlocks[i].style.gridRow[0] !== 3 ||  +specksBlocks[i].style.gridColumn[0] !== +specksBlocks[i].innerHTML - 8))
                flag = false

            if (+specksBlocks[i].innerHTML > 12 && +specksBlocks[i].innerHTML < 16
                && (+specksBlocks[i].style.gridRow[0] !== 4 ||  +specksBlocks[i].style.gridColumn[0] !== +specksBlocks[i].innerHTML - 12))
                flag = false
        }
        return flag
    }

    var gameFinish = function() {
        var congratBlock = document.createElement('span');
        congratBlock.className = 'specks__game-stop';
        congratBlock.innerHTML = 'You WIN!';
        document.querySelector('.specks').appendChild(congratBlock);
        var specksBlocks = document.querySelectorAll('.specks__item');
        [].forEach.call(specksBlocks, function(item) {
            item.className += ' game-finish';
        });
    }
    var handlerClick = function(event) {
        if (isGameFinish()) gameFinish()
        else {
            var specksItemNone = document.querySelector('.specks__item--hidden');
            if (isValidCheck(event.target, specksItemNone))
                moveSpecksBlocks(event.target, specksItemNone);
        }
    }

    return {
        init: generateCells
    }
})()

app.init()
