describe('tests', function () {

    function restoreInitialState() {
        specks.forEach(function (speck) {
            speck.classList.remove('field__speck_disabled');
            speck.addEventListener('click', onSpeckClick);
        });
        var congratulation = document.getElementsByClassName('congratulation')[0];
        congratulation.classList.add('congratulation_hidden');
    }

    function simulateWiningState() {
        specks.slice(0, -1).forEach(function (speck, index) {
            speck.innerHTML = index + 1;
        });
        specks[15].innerHTML = '';
    }

    function simulatePreWiningState() {
        simulateWiningState();
        specks[15].innerHTML = 15;
        specks[14].innerHTML = "";
    }

    var specks;
    before(function () {
        specks = getDocumentSpecks();
    });

    describe('isPlayerWin', function() {

        describe('win', function () {

            before(function() {
                restoreInitialState();
                simulateWiningState();
                checkForWin(specks);
            });

            it('should delete class congratulation_hidden from congratulation class', function () {

                var congratulation = document.getElementsByClassName('congratulation')[0];
                chai.assert.equal(congratulation.classList.contains('congratulation_hidden'), false);
            });

            it('should add class field__speck_disabled from every speck', function () {

                specks.forEach(function(speck) {
                    var isSpeckDisabled = speck.classList.contains('field__speck_disabled');
                    chai.assert.equal(isSpeckDisabled, true);
                });
            });

            it('should not move speck on click on speck near empty speck', function () {
                var movingElement = specks[specks.length - 2];
                var expected = movingElement.innerHTML;
                movingElement.dispatchEvent(new Event('click'));
                chai.assert.equal(movingElement.innerHTML, expected);
                chai.assert.equal(specks[specks.length - 1].innerHTML, "");
            });
        });

        describe('not win', function () {

            before(function () {
                restoreInitialState();
                simulatePreWiningState();
            });

            it('should add class congratulation_hidden from congratulation class', function () {

                var congratulation = document.getElementsByClassName('congratulation')[0];
                chai.assert.equal(congratulation.classList.contains('congratulation_hidden'), true);
            });

            it('should make class do not have field__speck_disabled from every speck', function () {

                specks.forEach(function(speck) {
                    var isSpeckDisabled = speck.classList.contains('field__speck_disabled');
                    chai.assert.equal(isSpeckDisabled, false);
                });
            });

            it('should not move speck', function () {

                var movingElement = specks[6]; // левая нижняя
                var expected = movingElement.innerHTML;
                movingElement.dispatchEvent(new Event('click'));
                chai.assert.equal(movingElement.innerHTML, expected);
            });

            describe('pre win', function() {

                it('should move speck to winning state', function () {
                    var movingElement = specks[specks.length - 1];
                    movingElement.dispatchEvent(new Event('click'));
                    chai.assert.equal(movingElement.innerHTML, '');
                    chai.assert.equal(specks[specks.length - 2].innerHTML, '15');
                });

            });

            describe('border elements', function () {
                before(restoreInitialState);

                beforeEach(function () {
                    simulateWiningState();
                });

                it('should not move speck to empty place through border', function () {
                    var newEmptySpeck = specks[11];
                    specks[15].innerHTML = newEmptySpeck.innerHTML;
                    newEmptySpeck.innerHTML = "";

                    var movingElement = specks[specks.length - 4]; // левая нижняя
                    var expected = movingElement.innerHTML;
                    movingElement.dispatchEvent(new Event('click'));
                    chai.assert.equal(movingElement.innerHTML, expected);
                });

                it('should not move speck to empty place through border', function () {
                    var newEmptySpeck = specks[4];
                    specks[15].innerHTML = newEmptySpeck.innerHTML;
                    newEmptySpeck.innerHTML = "";

                    var movingElement = specks[3]; // правая верхняя
                    var expected = movingElement.innerHTML;
                    movingElement.dispatchEvent(new Event('click'));
                    chai.assert.equal(movingElement.innerHTML, expected);
                });
            });

            describe('basic movements', function () {
                before(restoreInitialState);

                beforeEach(function () {
                    simulateWiningState();
                    var newEmptySpeck = specks[6];
                    specks[15].innerHTML = newEmptySpeck.innerHTML;
                    newEmptySpeck.innerHTML = "";
                });

                it('should move speck to empty place from top to bottom', function () {

                    var movingElement = specks[2];
                    movingElement.dispatchEvent(new Event('click'));
                    chai.assert.equal(movingElement.innerHTML, '');
                    chai.assert.equal(specks[6].innerHTML, '3');
                });

                it('should move speck to empty place from right to left', function () {

                    var movingElement = specks[7];
                    movingElement.dispatchEvent(new Event('click'));
                    chai.assert.equal(movingElement.innerHTML, '');
                    chai.assert.equal(specks[6].innerHTML, '8');
                });

                it('should move speck to empty place from bottom to top', function () {

                    var movingElement = specks[10];
                    movingElement.dispatchEvent(new Event('click'));
                    chai.assert.equal(movingElement.innerHTML, '');
                    chai.assert.equal(specks[6].innerHTML, '11');
                });

                it('should move speck to empty place from left to right', function () {

                    var movingElement = specks[5];
                    movingElement.dispatchEvent(new Event('click'));
                    chai.assert.equal(movingElement.innerHTML, '');
                    chai.assert.equal(specks[6].innerHTML, '6');
                });
            });

        });

    });
});
