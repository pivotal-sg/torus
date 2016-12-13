"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var player_1 = require('../prefabs/player');
var random_generator_1 = require('../helpers/random_generator');
var formatter_1 = require("../helpers/formatter");
var VELOCITY = 100;
var INITIAL_OBSTACLE_SPEED = 100;
var NUM_OF_OBSTACLES = 10;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.apply(this, arguments);
        this.randomGenerator = new random_generator_1.RandomGenerator();
        this.formatter = new formatter_1.Formatter();
        this.totalPausedTime = 0;
        this.score = "";
    }
    Game.prototype.create = function () {
        this.world.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.outerSpace = this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'outerSpace');
        this.player = new player_1.Player(this.game, SCREEN_WIDTH / 2, this.world.centerY);
        var numOfCircles = this.randomGenerator.generateRandom(NUM_OF_OBSTACLES);
        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);
        for (var i = 0; i < numOfCircles; i++) {
            var obstacle = this.obstacles.create(this.randomGenerator.generateRandom(this.world.width), this.randomGenerator.generateRandom(this.world.height), 'circle');
            obstacle.body.velocity.setTo(this.randomGenerator.generateRandom(VELOCITY, true) - INITIAL_OBSTACLE_SPEED, this.randomGenerator.generateRandom(VELOCITY, true));
        }
        this.resetTime();
    };
    Game.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.obstacles, this.reset, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.obstacles, null, null, this);
        this.outerSpace.tilePosition.x -= 3;
        this.killPlayerIfHitLeftEdge();
    };
    Game.prototype.killPlayerIfHitLeftEdge = function () {
        if (this.player.body.x <= this.camera.x) {
            this.reset(this.player);
        }
    };
    Game.prototype.render = function () {
        this.score = this.formatter.formatTime(this.getGameTime());
        this.game.debug.text(this.score, SCREEN_WIDTH - 80, 30, "#ffffff");
    };
    Game.prototype.reset = function (player) {
        player.kill();
        this.game.state.start('Score', true, false, this.score);
    };
    Game.prototype.resetTime = function () {
        this.game.time.reset();
        this.game.time.pauseDuration = 0;
        this.totalPausedTime = 0;
    };
    Game.prototype.getGameTime = function () {
        this.totalPausedTime += this.game.time.pauseDuration;
        this.game.time.pauseDuration = 0;
        return this.game.time.totalElapsedSeconds() - Math.floor(this.totalPausedTime / 1000);
    };
    return Game;
}(Phaser.State));
exports.Game = Game;
