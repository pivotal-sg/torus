import {Player} from '../prefabs/player';
import Group = Phaser.Group;
import Color = Phaser.Color;

const VELOCITY = 100;
const NUM_OF_OBSTACLES = 20;

export class Game extends Phaser.State {

  player: Player;
  obstacles: Group;
  score = 0;

  create() {
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'outerSpace');

    this.player = new Player(this.game, this.world.centerX, this.world.centerY);
    let numOfCircles = this.generateRandom(NUM_OF_OBSTACLES);

    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;
    this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);

    for (let i = 0; i < numOfCircles; i++) {
      let obstacle = this.obstacles.create(this.generateRandom(this.world.width), this.generateRandom(this.world.height), 'circle')
      obstacle.body.collideWorldBounds = true;
      obstacle.body.velocity.setTo(this.generateRandom(VELOCITY, true), this.generateRandom(VELOCITY, true));
      obstacle.body.bounce.setTo(1, 1);
    }
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.obstacles, this.collide, null, this);
    this.game.physics.arcade.collide(this.obstacles, this.obstacles, null, null, this);
    this.score += 1;
  }

  render() {
    this.game.debug.text(this.score.toString(), this.world.width - 80, 30, "#ffffff");
  }

  private generateRandom(number: number, allowNegative = false) {
    return Math.ceil((Math.random() - (allowNegative ? 0.5 : 0)) * number + 1);
  }

  private collide(player: Player) {
    player.kill();
    this.game.state.start('Game');
    this.score = 0;
  }
}