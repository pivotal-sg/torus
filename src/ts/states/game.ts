import {Player} from '../prefabs/player';
import Group = Phaser.Group;

const GRAVITY = 100;
const NUM_OF_OBSTACLES = 10;

export class Game extends Phaser.State {

  player: Player;
  obstacles: Group;

  create() {
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'outerSpace');

    this.player = new Player(this.game, this.world.centerX, this.world.centerY);
    let numOfCircles = this.generateRandom(NUM_OF_OBSTACLES);

    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;

    for (let i = 0; i < numOfCircles; i++) {
      let obstacle = this.obstacles.create(this.generateRandom(this.world.width), this.generateRandom(this.world.height), 'circle')
      obstacle.body.gravity.x = this.generateRandom(GRAVITY, true);
      obstacle.body.gravity.y = this.generateRandom(GRAVITY, true);
      obstacle.body.collideWorldBounds = true;
      obstacle.body.bounce.x = 1;
      obstacle.body.bounce.y = 1;
    }
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.obstacles, this.collide, null, this);
    this.game.physics.arcade.collide(this.obstacles, this.obstacles, null, null, this);
  }

  private generateRandom(number: number, allowNegative = false) {
    return Math.ceil((Math.random() - (allowNegative ? 0.5 : 0)) * number + 1);
  }

  private collide(player: Player) {
    player.kill();
    this.game.state.start('Game');
  }
}
