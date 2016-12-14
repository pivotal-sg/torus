"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    }
    Score.prototype.init = function (score) {
        this.score = score;
        this.game.plugins.add(Fabrique.Plugins.InputField);
    };
    Score.prototype.create = function () {
        var scoreText = this.add.text(this.world.centerX, 100, "You Scored " + this.score + ". Well Done!", titleFontStyle);
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
    };
    Score.prototype.buttonClicked = function () {
        this.game.state.start('Game');
    };
    Score.prototype.update = function () {
        if (this.enterKey && this.enterKey.isDown) {
            var playerName = this.inputName.value;
            this.inputName.kill();
            var nameText = this.add.text(this.world.centerX, 200, "Congrats " + playerName, titleFontStyle);
            nameText.anchor.setTo(0.5, 0.5);
            var startButton = this.add.text(this.world.centerX, this.world.height - 90, 'PRESS HERE OR SPACE TO START', subTitleFontStyle);
            startButton.anchor.setTo(0.5, 0.5);
            startButton.inputEnabled = true;
            startButton.events.onInputDown.addOnce(this.buttonClicked, this);
            this.enterKey = null;
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }
        if (this.spaceKey && this.spaceKey.isDown) {
            this.spaceKey = null;
            this.game.state.start('Game');
        }
    };
    return Score;
}(Phaser.State));
exports.Score = Score;
