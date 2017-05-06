function initField() {

    var container = createContainer();

    var fieldElement = document.getElementsByClassName('field')[0];
    fieldElement.appendChild(container);
}

function createContainer() {
    var specksValues = createSpecksValues();

    var container = document.createDocumentFragment();
    createSpecksInContainer(container, specksValues);

    return container;
}

function createSpecksValues() {
    var specksValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    shuffle(specksValues);
    specksValues.unshift("");
    return specksValues;
}

function shuffle(array) {
    var i, j, x;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        x = array[j];
        array[j] = array[i];
        array[i] = x;
    }
}

function createSpecksInContainer(container, specksValues) {

    specksValues.map(function (speckValue) {
        var speck = document.createElement('div');
        speck.classList.add('field__speck');
        speck.addEventListener('click', onSpeckClick);
        speck.innerHTML = speckValue;
        container.appendChild(speck);
    });
}

function onSpeckClick(event) {
    var specks = getDocumentSpecks();
    var i = specks.indexOf(event.target);
    if (i - 4 >= 0 && specks[i - 4].innerHTML === "") {
        swapElementsInnerHTML(specks[i], specks[i - 4]);
    }
    else if (i + 4 < specks.length && specks[i + 4].innerHTML === "") {
        swapElementsInnerHTML(specks[i], specks[i + 4])
    }
    else if (i % 4 !== 0 && specks[i - 1].innerHTML === "") {
        swapElementsInnerHTML(specks[i], specks[i - 1])
    }
    else if (i % 4 !== 3 && specks[i + 1].innerHTML === "") {
        swapElementsInnerHTML(specks[i], specks[i + 1])
    }
    checkForWin();
}

function getDocumentSpecks() {
    var field = document.getElementsByClassName('field')[0];
    return Array.prototype.slice.call(field.childNodes, 0);
}

function checkForWin(specks) {
    if (specks === undefined) {
        specks = getDocumentSpecks();
    }
    if (isPlayerWin(specks)) {
        document.getElementsByClassName('congratulation')[0]
            .classList.remove('congratulation_hidden');
        specks.forEach(function (speck) {
            speck.removeEventListener('click', onSpeckClick);
            speck.classList.add('field__speck_disabled');
        });
    }
}

function isPlayerWin(specks) {
    for (var i = 0; i < specks.length - 1; i++) {
        if (Number(specks[i].innerHTML) !== i + 1) {
            return false;
        }
    }
    return true;
}

function swapElementsInnerHTML(first, second) {
    var temp = first.innerHTML;
    first.innerHTML = second.innerHTML;
    second.innerHTML = temp;
}

initField();
checkForWin();