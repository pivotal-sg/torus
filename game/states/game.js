"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var player_1 = require('../prefabs/player');
var VELOCITY = 100;
var NUM_OF_OBSTACLES = 20;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.apply(this, arguments);
        this.score = 0;
    }
    Game.prototype.create = function () {
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'outerSpace');
        this.player = new player_1.Player(this.game, this.world.centerX, this.world.centerY);
        var numOfCircles = this.generateRandom(NUM_OF_OBSTACLES);
        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);
        for (var i = 0; i < numOfCircles; i++) {
            var obstacle = this.obstacles.create(this.generateRandom(this.world.width), this.generateRandom(this.world.height), 'circle');
            obstacle.body.collideWorldBounds = true;
            obstacle.body.velocity.setTo(this.generateRandom(VELOCITY, true), this.generateRandom(VELOCITY, true));
            obstacle.body.bounce.setTo(1, 1);
        }
    };
    Game.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.obstacles, this.collide, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.obstacles, null, null, this);
        this.score += 1;
    };
    Game.prototype.render = function () {
        this.game.debug.text(this.score.toString(), this.world.width - 80, 30, "#ffffff");
    };
    Game.prototype.generateRandom = function (number, allowNegative) {
        if (allowNegative === void 0) { allowNegative = false; }
        return Math.ceil((Math.random() - (allowNegative ? 0.5 : 0)) * number + 1);
    };
    Game.prototype.collide = function (player) {
        player.kill();
        this.game.state.start('Menu');
        this.score = 0;
    };
    return Game;
}(Phaser.State));
exports.Game = Game;
