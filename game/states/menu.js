"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button;
(function (Button) {
    Button[Button["Start"] = 0] = "Start";
    Button[Button["Scores"] = 1] = "Scores";
})(Button || (Button = {}));
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.apply(this, arguments);
        this.titleFontStyle = {
            font: '180px VT323',
            fill: '#8C5C9E'
        };
        this.normalSubTitleFontStyle = {
            font: '30px VT323',
            fill: '#FFB83B',
        };
        this.selectedSubTitleFontStyle = {
            backgroundColor: '#FFB83B',
            font: '30px VT323',
            fill: '#000000',
        };
    }
    Menu.prototype.create = function () {
        var titleText = this.add.text(400, 100, 'TORUS', this.titleFontStyle);
        titleText.anchor.setTo(0.5, 0.5);
        var spaceman = this.game.add.image(400, this.world.centerY, 'spaceman');
        spaceman.anchor.setTo(0.5, 0.5);
        var START_LABEL = ' START ';
        this.startButton = this.add.text(400, this.world.height - 120, START_LABEL, this.normalSubTitleFontStyle);
        this.startButton.anchor.setTo(0.5, 0.5);
        this.startButton.inputEnabled = true;
        this.startButton.events.onInputDown.addOnce(this.startButtonClicked, this);
        var SCORES_LABEL = ' SCORES ';
        this.scoresButton = this.add.text(400, this.world.height - 60, SCORES_LABEL, this.normalSubTitleFontStyle);
        this.scoresButton.anchor.setTo(0.5, 0.5);
        this.scoresButton.inputEnabled = true;
        this.scoresButton.events.onInputDown.addOnce(this.scoresButtonClicked, this);
        this.addKeyHandlers();
        this.setDefaultButtonSelection();
    };
    Menu.prototype.setDefaultButtonSelection = function () {
        this.startButtonSelected();
    };
    Menu.prototype.addKeyHandlers = function () {
        var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        downKey.onDown.add(this.menuButtonSelected, this);
        var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.menuButtonSelected, this);
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.menuButtonPressed, this);
        var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.menuButtonPressed, this);
    };
    Menu.prototype.startButtonClicked = function () {
        this.startButtonSelected();
        this.menuButtonPressed();
    };
    Menu.prototype.scoresButtonClicked = function () {
        this.scoresButtonSelected();
        this.menuButtonPressed();
    };
    Menu.prototype.menuButtonPressed = function () {
        var nextState = this.selectedButton == Button.Start ? 'Game' : 'HighScores';
        this.game.state.start(nextState);
    };
    Menu.prototype.menuButtonSelected = function () {
        if (this.selectedButton == Button.Start) {
            this.scoresButtonSelected();
        }
        else {
            this.startButtonSelected();
        }
    };
    Menu.prototype.startButtonSelected = function () {
        this.selectedButton = Button.Start;
        this.startButton.setStyle(this.selectedSubTitleFontStyle);
        this.scoresButton.setStyle(this.normalSubTitleFontStyle);
    };
    Menu.prototype.scoresButtonSelected = function () {
        this.selectedButton = Button.Scores;
        this.scoresButton.setStyle(this.selectedSubTitleFontStyle);
        this.startButton.setStyle(this.normalSubTitleFontStyle);
    };
    return Menu;
}(Phaser.State));
exports.Menu = Menu;
