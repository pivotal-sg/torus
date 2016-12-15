"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var formatter_1 = require("../helpers/formatter");
var titleFontStyle = {
    font: '50px VT323',
    fill: '#8C5C9E'
};
var subTitleFontStyle = {
    font: '30px VT323',
    fill: '#FFB83B'
};
var promptFontStyle = {
    animation: 'blinker 1s linear infinite',
    font: '30px VT323',
    fill: '#FFB83B'
};
var HighScores = (function (_super) {
    __extends(HighScores, _super);
    function HighScores() {
        _super.apply(this, arguments);
        this.yCoordForHeaderText = 110;
        this.offsetY = 80;
        this.formatter = new formatter_1.Formatter();
    }
    HighScores.prototype.xCoordForPlayerHeaderText = function () { return this.world.centerX / 3; };
    HighScores.prototype.xCoordForTimingHeaderText = function () { return this.world.centerX / 3 * 5; };
    HighScores.prototype.init = function (score) {
        this.score = score;
    };
    HighScores.prototype.preload = function () {
        this.load.json('highScores', 'http://torus-api.cfapps.io/torus/highscores', true);
    };
    HighScores.prototype.create = function () {
        this.displayTitle();
        this.displayHeaders();
        this.displayHighScores();
        this.displayPrompt();
        this.addKeyHandlers();
    };
    HighScores.prototype.displayPrompt = function () {
        var promptText = this.add.text(this.world.centerX, this.world.height - this.offsetY, 'Press Spacebar or Enter to return to Main Menu', promptFontStyle);
        promptText.anchor.setTo(0.5, 0.5);
    };
    HighScores.prototype.displayTitle = function () {
        var highScoresTitleText = this.add.text(this.world.centerX, this.offsetY, 'High Scores', titleFontStyle);
        highScoresTitleText.anchor.setTo(0.5, 0.5);
    };
    HighScores.prototype.displayHeaders = function () {
        this.add.text(this.xCoordForPlayerHeaderText(), this.yCoordForHeaderText, 'Player', titleFontStyle);
        var timingHeaderText = this.add.text(this.xCoordForTimingHeaderText(), this.yCoordForHeaderText, 'Timing', titleFontStyle);
        timingHeaderText.anchor.setTo(1, 0);
    };
    HighScores.prototype.displayHighScores = function () {
        var _this = this;
        var highScoresJson = this.game.cache.getJSON('highScores');
        highScoresJson.map(function (highScore, index) {
            var y = 170 + index * 30;
            _this.add.text(_this.xCoordForPlayerHeaderText(), y, (index + 1) + ". " + highScore.name, subTitleFontStyle);
            var scoreText = _this.add.text(_this.xCoordForTimingHeaderText(), y, _this.formatter.formatTime(highScore.score), subTitleFontStyle);
            scoreText.anchor.setTo(1, 0);
        });
    };
    HighScores.prototype.addKeyHandlers = function () {
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.goToMenu, this);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.goToMenu, this);
    };
    HighScores.prototype.goToMenu = function () {
        this.game.state.start('Menu');
    };
    HighScores.prototype.shutdown = function () {
        this.enterKey.reset(true);
        this.spaceKey.reset(true);
    };
    return HighScores;
}(Phaser.State));
exports.HighScores = HighScores;
