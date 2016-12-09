"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var boot_1 = require('./states/boot');
var loading_1 = require('./states/loading');
var menu_1 = require('./states/menu');
var game_1 = require('./states/game');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.call(this, 200, 200, Phaser.CANVAS);
        this.state.add('Boot', boot_1.Boot);
        this.state.add('Loading', loading_1.Loading);
        this.state.add('Menu', menu_1.Menu);
        this.state.add('Game', game_1.Game);
        this.state.start('Boot');
    }
    return App;
}(Phaser.Game));
exports.App = App;
var game = new App();
