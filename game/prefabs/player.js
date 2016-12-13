"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var INITIAL_X_SPEED = -100;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game, x, y) {
        _super.call(this, game, x, y, 'spaceman');
        this.speed = 220;
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.anchor.set(0.5, 0.5);
        this.body.collideWorldBounds = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            space: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };
    }
    Player.prototype.moveLeft = function () {
        this.body.velocity.x = -this.speed + INITIAL_X_SPEED;
    };
    Player.prototype.moveRight = function () {
        this.body.velocity.x = this.speed + INITIAL_X_SPEED;
    };
    Player.prototype.moveUp = function () {
    };
    Player.prototype.moveUpwards = function () {
        this.body.velocity.y = -this.speed;
    };
    Player.prototype.moveDownwards = function () {
        this.body.velocity.y = this.speed;
    };
    Player.prototype.stopLeftRight = function () {
        this.body.velocity.x = INITIAL_X_SPEED;
    };
    Player.prototype.stopUpDown = function () {
        this.body.velocity.y = 0;
    };
    Player.prototype.update = function () {
        var _this = this;
        var actions = [];
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            actions.push(this.moveLeft.bind(this));
        }
        if (this.cursors.right.isDown || this.wasd.right.isDown) {
            actions.push(this.moveRight.bind(this));
        }
        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            actions.push(this.moveUpwards.bind(this));
        }
        if (this.cursors.down.isDown || this.wasd.down.isDown) {
            actions.push(this.moveDownwards.bind(this));
        }
        if (actions.filter(function (action) { return action == _this.moveDownwards || action == _this.moveUpwards; }).length == 0) {
            this.stopUpDown();
        }
        if (actions.filter(function (action) { return action == _this.moveLeft || action == _this.moveRight; }).length == 0) {
            this.stopLeftRight();
        }
        if (actions.length > 0) {
            actions.map(function (action) { return action(); });
        }
    };
    return Player;
}(Phaser.Sprite));
exports.Player = Player;
