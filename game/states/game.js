"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var player_1 = require('../prefabs/player');
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.apply(this, arguments);
    }
    Game.prototype.create = function () {
        this.game.time.advancedTiming = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 800;
        var map = this.game.add.tilemap('map');
        map.addTilesetImage('tiles', 'tiles');
        var platformsLayer = map.createLayer('platforms');
        map.setCollision(1, true, platformsLayer);
        platformsLayer.resizeWorld();
        this.player = new player_1.Player(this.game, this.world.centerX, this.world.centerY, platformsLayer);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    };
    Game.prototype.render = function () {
        this.game.debug.text(this.game.time.fps.toString(), 10, 20, "#ffffff");
    };
    return Game;
}(Phaser.State));
exports.Game = Game;
