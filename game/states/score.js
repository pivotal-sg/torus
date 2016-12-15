"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var formatter_1 = require("../helpers/formatter");
var INPUT_WIDTH = 500;
var titleFontStyle = {
    font: '50px VT323',
    fill: '#8C5C9E'
};
var subTitleFontStyle = {
    font: '30px VT323',
    fill: '#FFB83B'
};
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        _super.apply(this, arguments);
        this.formatter = new formatter_1.Formatter();
    }
    Score.prototype.init = function (score) {
        this.score = score;
        this.game.plugins.add(Fabrique.Plugins.InputField);
    };
    Score.prototype.create = function () {
        var scoreText = this.add.text(this.world.centerX, 100, "You Scored " + this.formatter.formatTime(this.score) + ". Well Done!", titleFontStyle);
        scoreText.anchor.setTo(0.5, 0.5);
        var titleText = this.add.text(this.world.centerX, 150, 'Please Enter Your Name', titleFontStyle);
        titleText.anchor.setTo(0.5, 0.5);
        this.inputName = this.game.add.inputField(this.world.centerX - INPUT_WIDTH / 2, 200, {
            width: INPUT_WIDTH,
            borderColor: '#0000000',
            backgroundColor: '#0000000',
            font: '60px VT323',
            fill: '#FFB83B',
            cursorColor: '#FFB83B',
            max: "20"
        });
        this.inputName.blockInput = false;
        this.inputName.startFocus();
        var spaceman = this.game.add.image(this.world.centerX, this.world.centerY, 'spaceman');
        spaceman.anchor.setTo(0.5, 0.5);
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.submitScore, this);
    };
    Score.prototype.submitScore = function () {
        var _this = this;
        var body = JSON.stringify({
            name: this.inputName.value,
            score: this.score
        });
        fetch('https://torus-api.cfapps.io/torus/highscores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(function () { return _this.game.state.start('HighScores'); });
    };
    Score.prototype.shutdown = function () {
        this.enterKey.reset(true);
    };
    return Score;
}(Phaser.State));
exports.Score = Score;