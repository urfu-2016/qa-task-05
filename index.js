'use strict';

var game = {
    init: function () {
        this._collectData();
        this._bindEvenets();
        this._initField();
    },

    _collectData: function () {
        this._clicked = false;
        this._offset = 102;
        this._$gameField = $('.js-game-field');
        this._$rows = this._$gameField.children();
        this._rowSelector = '.js-row';
        this._cellSelector = '.js-cell';
        this._spaceSelector = '.js-space';
        this._winCombination = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        this._wonBlock = '.js-won';
        this._wonClassName = '.won';
        this._wonAudio = '.js-won-audio';
        this._wonTrigger = 'trigger';
    },

    _bindEvenets: function () {
        this._$gameField.on('click', this._cellSelector, this._clickHandler.bind(this))
    },

    _initField: function (isWinCombation) {
        this._playWonEffect(true);

        var $space = $(this._spaceSelector);

        var cells = [];

        this._$rows.each(function (indexOuter, row) {
            $(row).children().each(function (indexInner, cell) {
                if ($(cell).get(0) !== $space.get(0)) {
                    cells.push(cell);
                }
            });
        });

        if (!isWinCombation) {
            cells.sort(function () {
                return .5 - Math.random();
            });

            cells.push($space);
        } else {
            cells.sort(function (a, b) {
                return parseInt($(a).text(), 10) - parseInt($(b).text(), 10);
            });

            cells.reverse().unshift($space);
        }

        this._$rows.each(function (index, row) {
            var $row = $(row).empty();

            var counter = 0;

            $(cells).each(function () {
                if (counter++ < 4) {
                    $row.append(cells.pop());
                } else {
                    return false;
                }
            });

        });

        this._$gameField.animate({
            opacity: 1
        }, 1000)
    },

    _clickHandler: function (e) {
        if (this._clicked) {
            return;
        }

        var $space = $(this._spaceSelector);

        var elemRow = this._detectRow(e.target);
        var spaceRow = this._detectRow($space);

        var elemColumn = this._detectColumn(e.target);
        var spaceColumn = this._detectColumn($space);

        var offset;

        if ((elemRow === spaceRow) && Math.abs(elemColumn - spaceColumn) === 1) {
            offset = {
                left: '+=' + this._offset * ((elemColumn - spaceColumn) < 0 ? 1 : -1)
            };
        }

        if ((elemColumn === spaceColumn) && Math.abs(elemRow - spaceRow) === 1) {
            offset = {
                top: '+=' + +this._offset * ((elemRow - spaceRow) < 0 ? 1 : -1)
            };
        }

        if (offset) {
            this._clicked = true;

            $(e.target).animate(offset, 300, function () {
                this._clicked = false;
                this._swapAndRemoveStyleAttr(e.target, $space);
                this._checkWin();
            }.bind(this));
        }
    },

    _detectRow: function (elem) {
        var $elem = $(elem);
        var $row = $elem.closest(this._rowSelector);
        return $.inArray($row.get(0), this._$gameField.children()) + 1;
    },

    _detectColumn: function (elem) {
        var $elem = $(elem);
        var $row = $elem.closest(this._rowSelector);
        return $.inArray($elem.get(0), $row.children()) + 1;
    },

    _checkWin: function () {
        var currentCombination = [];

        this._$rows.each(function (indexOuter, row) {
            var $row = $(row);
            $row.children().each(function (indexInner, cell) {
                currentCombination.push(parseInt($(cell).text(), 10));
            });
        });

        if (currentCombination.toString() === this._winCombination.toString()) {
            this._playWonEffect();
        }
    },

    _playWonEffect: function (stop) {
        var $wonBlock = $(this._wonBlock);
        var $audio = $(this._wonAudio)[0];

        if (!stop) {
            $wonBlock.addClass(this._wonTrigger);
            $audio.play();
        } else {
            $wonBlock.removeClass(this._wonTrigger);
            $audio.pause();
        }
    },

    _swapAndRemoveStyleAttr: function (elem_1, elem_2) {
        var $elem_1 = $(elem_1);
        var $elem_2 = $(elem_2);

        var $copy_1 = $elem_1.clone();
        var $copy_2 = $elem_2.clone();

        $elem_1.replaceWith($copy_2);
        $elem_2.replaceWith($copy_1);

        $copy_1.removeAttr('style');
        $copy_2.removeAttr('style');
    }
};

game.init();
