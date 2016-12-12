"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.apply(this, arguments);
    }
    Menu.prototype.create = function () {
        var titleFontStyle = {
            font: '180px VT323',
            fill: '#8C5C9E'
        };
        var subTitleFontStyle = {
            font: '30px VT323',
            fill: '#FFB83B'
        };
        var titleText = this.add.text(this.world.centerX, 100, 'TORUS', titleFontStyle);
        titleText.anchor.setTo(0.5, 0.5);
        var spaceman = this.game.add.image(this.world.centerX, this.world.centerY, 'spaceman');
        spaceman.anchor.setTo(0.5, 0.5);
        var startButton = this.add.text(this.world.centerX, this.world.height - 90, 'PRESS HERE OR SPACE TO START', subTitleFontStyle);
        startButton.anchor.setTo(0.5, 0.5);
        startButton.inputEnabled = true;
        startButton.events.onInputDown.addOnce(this.buttonClicked, this);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };
    Menu.prototype.buttonClicked = function () {
        this.game.state.start('Game');
    };
    Menu.prototype.update = function () {
        if (this.spaceKey.isDown) {
            this.game.state.start('Game');
        }
    };
    return Menu;
}(Phaser.State));
exports.Menu = Menu;
