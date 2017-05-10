describe('Position solvablility checker test', function() {
    it('should return `false` for increasing-order with swap 15-th and 14-th block', function() {
        result = checkPermutation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0]);
        chai.expect(result).to.be.false;
    });
    it('should return `false` for increasing-order with swap 15-th and 14-th block and singe move by 14-th', function() {
        result = checkPermutation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 0, 14]);
        chai.expect(result).to.be.false;
    });
});

describe('Position generator test', function() {
    it('should return first valid permutation', function() {
        result = checkPermutation([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 0, 14]);
        chai.expect(result).to.be.false;
    });
});

describe('Game logic test', function() {
    describe('inside checker test', function() {
        function singleCheck(x, y, result) {
            chai.expect(coordinatesInside(x, y)).to.equal(result);
        }
        function checkInsideTests(tests, result) {
            for (i = 0; i < tests.length; i++)
                singleCheck(tests[i][0], tests[i][1], result);
        }
        it('should return true for correct pairs', function() {
            tests = [
                [0, 0],
                [0, 3],
                [3, 0],
                [3, 3],
                [1, 2]
            ]
            checkInsideTests(tests, true);
        });
        it('should return false for incorrect pairs', function() {
            tests = [
                [-1, -1],
                [-1, 0],
                [-1, 3],
                [-1, 4],
                [0, -1],
                [0, 4],
                [1, 4],
                [2, 5],
                [3, -1],
                [4, 4],
                [4, 0]
            ]
            checkInsideTests(tests, false);
        });
    });
    describe('check game win test', function() {
        function createField(permutation) {
            result = new Array(16);
            var cnt = 0;
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 4; j++) {
                    if (permutation[cnt] === 0)
                        result[cnt] = {textContent: '', EmptyCell: true};
                    else
                        result[cnt] = {textContent: permutation[cnt], EmptyCell: false};
                    cnt++;
                }
            return result;
        }
        it('should return `true` for win position', function() {
            field = createField([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]);
            console.log(field);
            result = checkGameWin(field);
            chai.expect(result).to.be.true;
        });
        it('should return `false` for not win position', function() {
            field = createField([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15]);
            result = checkGameWin(field);
            chai.expect(result).to.be.false;
        });
        it('should return `false` for incorrect position', function() {
            field = createField([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0]);
            result = checkGameWin(field);
            chai.expect(result).to.be.false;
        });
    });
});