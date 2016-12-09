export class Player extends Phaser.Sprite {

  cursors;
  wasd;
  speed: number = 220;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'spaceman');
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

  moveLeft() {
    this.body.velocity.x = -this.speed;
  }

  moveRight() {
    this.body.velocity.x = this.speed;
  }

  moveUpwards() {
    this.body.velocity.y = -this.speed;
  }

  moveDownwards() {
    this.body.velocity.y = this.speed;
  }

  stopLeftRight() {
    this.body.velocity.x = 0;
  }

  stopUpDown() {
    this.body.velocity.y = 0;
  }

  update() {
    // this.game.physics.arcade.collide(this, this.platformsLayer);

    let actions: Function[] = [];

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

    if (actions.filter(action => action == this.moveDownwards || action == this.moveUpwards).length == 0) {
      this.stopUpDown();
    }
    if (actions.filter(action => action == this.moveLeft || action == this.moveRight).length == 0) {
      this.stopLeftRight();
    }

    if (actions.length > 0) {
      actions.map((action) => action());
    }
  }
}
