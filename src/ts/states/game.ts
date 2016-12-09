import { Player } from '../prefabs/player';

export class Game extends Phaser.State {

  player: Player;

  create() {
    this.game.time.advancedTiming = true; // needed for FPS counter
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 800;

    let map = this.game.add.tilemap('map');
    map.addTilesetImage('tiles', 'tiles');
    let platformsLayer = map.createLayer('platforms');
    map.setCollision(1, true, platformsLayer);
    platformsLayer.resizeWorld();

    this.player = new Player(this.game, this.world.centerX, this.world.centerY, platformsLayer);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
  }

  render() {
    this.game.debug.text(this.game.time.fps.toString(), 10, 20, "#ffffff");
  }

}
