"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        _super.apply(this, arguments);
    }
    Score.prototype.init = function (score) {
        this.score = score;
        console.log("SCORE: " + this.score);
    };
    Score.prototype.create = function () {
        var titleFontStyle = {
            font: '80px VT323',
            fill: '#8C5C9E'
        };
        var subTitleFontStyle = {
            font: '30px VT323',
            fill: '#FFB83B'
        };
        this.game.plugins.add(Fabrique.Plugins.InputField);
        var input = this.game.add.inputField(10, 90);
        var titleText = this.add.text(400, 100, 'Enter Your Name', titleFontStyle);
        titleText.anchor.setTo(0.5, 0.5);
        var spaceman = this.game.add.image(400, this.world.centerY, 'spaceman');
        spaceman.anchor.setTo(0.5, 0.5);
        var startButton = this.add.text(400, this.world.height - 90, 'PRESS HERE OR SPACE TO START', subTitleFontStyle);
        startButton.anchor.setTo(0.5, 0.5);
        startButton.inputEnabled = true;
        startButton.events.onInputDown.addOnce(this.buttonClicked, this);
    };
    Score.prototype.buttonClicked = function () {
        this.game.state.start('Menu');
    };
    return Score;
}(Phaser.State));
exports.Score = Score;
