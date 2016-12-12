"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var player_1 = require('../prefabs/player');
var random_generator_1 = require('../helpers/random_generator');
var VELOCITY = 100;
var NUM_OF_OBSTACLES = 200;
var SCREEN_WIDTH = 800;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.apply(this, arguments);
        this.score = 0;
        this.randomGenerator = new random_generator_1.RandomGenerator();
    }
    Game.prototype.create = function () {
        this.world.resize(9999, 600);
        this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'outerSpace');
        this.player = new player_1.Player(this.game, SCREEN_WIDTH / 2, this.world.centerY);
        var numOfCircles = this.randomGenerator.generateRandom(NUM_OF_OBSTACLES);
        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);
        for (var i = 0; i < numOfCircles; i++) {
            var obstacle = this.obstacles.create(this.randomGenerator.generateRandom(this.world.width), this.randomGenerator.generateRandom(this.world.height), 'circle');
            obstacle.body.collideWorldBounds = true;
            obstacle.body.velocity.setTo(this.randomGenerator.generateRandom(VELOCITY, true), this.randomGenerator.generateRandom(VELOCITY, true));
            obstacle.body.bounce.setTo(1, 1);
        }
    };
    Game.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.obstacles, this.collide, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.obstacles, null, null, this);
        this.score += 1;
        this.camera.x += 3;
        this.restrictXBounds();
    };
    Game.prototype.restrictXBounds = function () {
        this.player.body.x = Math.max(this.player.body.x, this.camera.x);
        this.player.body.x = Math.min(this.player.body.x, this.camera.x + SCREEN_WIDTH - this.player.width);
    };
    Game.prototype.render = function () {
        this.game.debug.text(this.score.toString(), SCREEN_WIDTH - 80, 30, "#ffffff");
    };
    Game.prototype.collide = function (player) {
        player.kill();
        this.game.state.start('Menu');
        this.score = 0;
    };
    return Game;
}(Phaser.State));
exports.Game = Game;
