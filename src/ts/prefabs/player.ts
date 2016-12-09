export class Player extends Phaser.Sprite {

  cursors;
  wasd;
  platformsLayer;
  speed: number = 180;

  constructor(game: Phaser.Game, x: number, y: number, platformsLayer) {
    super(game, x, y, 'dude', 0);
    game.physics.arcade.enableBody(this);
    game.add.existing(this);

    this.platformsLayer = platformsLayer;

    this.anchor.set(0.5, 0.5);
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.wasd = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      space: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    };

    this.cursors.up.onDown.add(this.jump, this);
    this.wasd.up.onDown.add(this.jump, this);
    this.wasd.space.onDown.add(this.jump, this);
  }

  jump() {
    if (this.body.blocked.down || this.body.touching.down) {
      this.body.velocity.y = -350;
    }
  }

  moveLeft() {
    this.body.velocity.x = -this.speed;
    this.animations.play('left');
  }

  moveRight() {
    this.body.velocity.x = this.speed;
    this.animations.play('right');
  }

  stop() {
    this.body.velocity.x = 0;
    this.animations.stop();
    this.frame = 4;
  }

  update() {
    this.game.physics.arcade.collide(this, this.platformsLayer);

    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      this.moveLeft();
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      this.moveRight();
    } else {
      this.stop();
    }

  }

}
