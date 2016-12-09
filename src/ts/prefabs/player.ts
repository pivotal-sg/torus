export class Player extends Phaser.Sprite {

  cursors;
  wasd;
  platformsLayer;
  speed: number = 180;

  constructor(game: Phaser.Game, x: number, y: number) {
    super(game, x, y, 'dude', 0);
    game.physics.arcade.enableBody(this);
    game.add.existing(this);

    // this.platformsLayer = platformsLayer;

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

    // this.cursors.up.onDown.add(this.moveUp, this);
    // this.wasd.up.onDown.add(this.moveUp, this);
    // this.cursors.down.onDown.add(this.moveDown, this);
    // this.wasd.down.onDown.add(this.moveDown, this);
    // this.wasd.space.onDown.add(this.moveUp, this);
  }

  // jump() {
  //   if (this.body.blocked.down || this.body.touching.down) {
  //     this.body.velocity.y = -350;
  //   }
  // }

  moveLeft() {
    this.body.velocity.x = -this.speed;
    this.animations.play('left');
  }

  moveRight() {
    this.body.velocity.x = this.speed;
    this.animations.play('right');
  }

  moveUp() {
    this.body.velocity.y = -this.speed;
    // this.animations.play('right');
  }

  moveDown() {
    this.body.velocity.y = this.speed;
    // this.animations.play('left');
  }


  stopLeftRight() {
    this.body.velocity.x = 0;
    this.stopMoveAnimation();
  }

  stopUpDown() {
    this.body.velocity.y = 0;
    this.stopMoveAnimation();
  }

  stopMoveAnimation() {
    if (this.body.velocity.y == 0 && this.body.velocity.x == 0) {
      this.animations.stop();
      this.frame = 4;
    }
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
      actions.push(this.moveUp.bind(this));
    }

    if (this.cursors.down.isDown || this.wasd.down.isDown) {
      actions.push(this.moveDown.bind(this));
    }

    if (actions.filter(action => action == this.moveDown || action == this.moveUp).length == 0) {
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
