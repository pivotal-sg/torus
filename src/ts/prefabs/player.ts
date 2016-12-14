const INITIAL_X_SPEED = -100;

export class Player extends Phaser.Sprite {

  cursors;
  speed: number = 220;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'spaceman');
    game.physics.arcade.enableBody(this);
    game.add.existing(this);

    this.anchor.set(0.5, 0.5);
    this.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  moveLeft() {
    this.body.velocity.x = -this.speed + INITIAL_X_SPEED;
  }

  moveRight() {
    this.body.velocity.x = this.speed + INITIAL_X_SPEED;
  }

  moveUpwards() {
    this.body.velocity.y = -this.speed;
  }

  moveDownwards() {
    this.body.velocity.y = this.speed;
  }

  stopLeftRight() {
    this.body.velocity.x = INITIAL_X_SPEED;
  }

  stopUpDown() {
    this.body.velocity.y = 0;
  }

  update() {
    let actions: Function[] = [];

    if (this.cursors.left.isDown) {
      actions.push(this.moveLeft.bind(this));
    }

    if (this.cursors.right.isDown) {
      actions.push(this.moveRight.bind(this));
    }

    if (this.cursors.up.isDown) {
      actions.push(this.moveUpwards.bind(this));
    }

    if (this.cursors.down.isDown) {
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
