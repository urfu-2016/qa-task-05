'use strict';

var game = {
    init: function () {
        this._collectData();
        this._bindEvenets();
        // this._initField();
    },

    _collectData: function () {
        this.clicked = false;
        this.offset = 102;
        this.$gameField = $('.js-game-field');
        this.$rows = this.$gameField.children();
        this.rowSelector = '.js-row';
        this.cellSelector = '.js-cell';
        this.spaceSelector = '.js-space';
        this.wonBlock = '.js-won';
        this.wonClassName = '.won';
        this.wonAudio = '.js-won-audio';
        this.wonTrigger = 'trigger';
    },

    _bindEvenets: function () {
        this.$gameField.on('click', this.cellSelector, this._clickHandler.bind(this))
    },

    _initField: function () {
        var $space = $(this.spaceSelector);

        var cells = [];

        this.$rows.each(function () {
            $(this).children().each(function () {
                if ($(this).get(0) !== $space.get(0)) {
                    cells.push(this);
                }
            });
        });

        cells.sort(function () {
            return .5 - Math.random();
        });

        cells.push($space);

        this.$rows.each(function () {
            var $row = $(this).empty();

            var counter = 0;

            $(cells).each(function () {
                if (counter++ < 4) {
                    $row.append(cells.pop());
                } else {
                    return false;
                }
            });

        });

        this.$gameField.animate({
            opacity: 1
        }, 1000)
    },

    _clickHandler: function (e) {
        if (this.clicked) {
            return;
        }

        var $space = $(this.spaceSelector);

        var elemRow = this._detectRow(e.target);
        var spaceRow = this._detectRow($space);

        var elemColumn = this._detectColumn(e.target);
        var spaceColumn = this._detectColumn($space);

        var offset;

        if ((elemRow === spaceRow) && Math.abs(elemColumn - spaceColumn) === 1) {
            offset = {
                left: '+='
            };

            if (elemColumn - spaceColumn < 0) {
                offset.left += this.offset;
            } else {
                offset.left += this.offset * -1;
            }
        }

        if ((elemColumn === spaceColumn) && Math.abs(elemRow - spaceRow) === 1) {
            offset = {
                top: '+='
            };

            if (elemRow - spaceRow < 0) {
                offset.top += this.offset;
            } else {
                offset.top += this.offset * -1;
            }
        }

        if (offset) {
            this.clicked = true;

            $(e.target).animate(offset, 300, function () {
                this.clicked = false;
                this._swap(e.target, $space);
                this._checkWin();
            }.bind(this));
        }
    },

    _detectRow: function (elem) {
        var $elem = $(elem);
        var $row = $elem.closest(this.rowSelector);
        return $.inArray($row.get(0), this.$gameField.children()) + 1;
    },

    _detectColumn: function (elem) {
        var $elem = $(elem);
        var $row = $elem.closest(this.rowSelector);
        return $.inArray($elem.get(0), $row.children()) + 1;
    },

    _checkWin: function () {
        var currentCombination = [];

        this.$rows.each(function () {
            var $elem = $(this);
            $elem.children().each(function () {
                currentCombination.push(parseInt($(this).text(), 10));
            });
        });

        var winCombination = currentCombination.slice();

        winCombination.sort(function (a, b) {
            return a - b;
        });

        if (currentCombination.toString() === winCombination.toString()) {
            this._playWonAudio();
        }
    },

    _playWonAudio: function () {
        $(this.wonBlock).addClass(this.wonTrigger);

        var audio = $(this.wonAudio)[0];
        audio.play();
    },

    _swap: function (elem_1, elem_2) {
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

$(function () {
    game.init();
});