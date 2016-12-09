"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        _super.apply(this, arguments);
    }
    Loading.prototype.preload = function () {
        this.load.image('loadingBarBg', 'assets/images/loading-bar-bg.png');
        this.load.image('loadingBar', 'assets/images/loading-bar.png');
    };
    Loading.prototype.create = function () {
        var fontStyle = {
            font: '18px VT323',
            fill: '#7edcfc'
        };
        var loadingBarBg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBarBg');
        loadingBarBg.anchor.setTo(0.5);
        var loadingBar = this.game.add.sprite(this.game.world.centerX - 175, this.game.world.centerY - 16, 'loadingBar');
        this.load.setPreloadSprite(loadingBar);
        this.loadingText = this.add.text(this.world.centerX, this.world.centerY, 'Loading...', fontStyle);
        this.loadingText.anchor.setTo(0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        this.game.load.tilemap('map', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/images/tiles.png');
        this.game.load.start();
    };
    Loading.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText('Loading... ' + progress + '%');
    };
    Loading.prototype.loadComplete = function () {
        this.game.state.start('Menu');
    };
    return Loading;
}(Phaser.State));
exports.Loading = Loading;
