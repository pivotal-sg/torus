import { Player } from '../prefabs/player';
import Group = Phaser.Group;

export class Game extends Phaser.State {

  player: Player;
  obstacles: Group;

  create() {
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'outerSpace');

    this.player = new Player(this.game, this.world.centerX, this.world.centerY);
    let numOfCircles = this.generateRandom(100);

    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;

    for (let i = 0; i < numOfCircles; i++) {
      this.obstacles.create(this.generateRandom(this.world.width), this.generateRandom(this.world.height), 'circle')
    }
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.obstacles, this.collide, null, this);
  }

  private generateRandom(number: number) {
    return Math.ceil(Math.random() * number + 1);
  }

  private collide(player : Player) {
    player.kill();
    this.game.state.start('Game');
  }
}
