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
            font: '18px VT323',
            fill: '#83769C'
        };
        var titleText = this.add.text(this.world.centerX, 50, 'MAIN MENU', titleFontStyle);
        titleText.anchor.setTo(0.5, 0.5);
        var buttonFontStyle = {
            font: '30px VT323',
            fill: '#00E232'
        };
        var gameButton = this.add.text(this.world.centerX, 150, 'PLAY!', buttonFontStyle);
        gameButton.anchor.setTo(0.5, 0.5);
        gameButton.inputEnabled = true;
        gameButton.events.onInputDown.addOnce(this.buttonClicked, this);
    };
    Menu.prototype.buttonClicked = function () {
        this.game.state.start('Game');
    };
    return Menu;
}(Phaser.State));
exports.Menu = Menu;
