import {Player} from '../prefabs/player';
import {RandomGenerator} from '../helpers/random_generator';
import Group = Phaser.Group;
import Color = Phaser.Color;

const VELOCITY = 100;
const NUM_OF_OBSTACLES = 200;
const SCREEN_WIDTH = 800;

export class Game extends Phaser.State {

    player: Player;
    obstacles: Group;
    score = 0;
    randomGenerator = new RandomGenerator();

    create() {
        this.world.resize(9999, 600);
        this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'outerSpace');

        this.player = new Player(this.game, SCREEN_WIDTH / 2, this.world.centerY);

        let numOfCircles = this.randomGenerator.generateRandom(NUM_OF_OBSTACLES);

        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);

        for (let i = 0; i < numOfCircles; i++) {
            let obstacle = this.obstacles.create(this.randomGenerator.generateRandom(this.world.width), this.randomGenerator.generateRandom(this.world.height), 'circle')
            obstacle.body.collideWorldBounds = true;
            obstacle.body.velocity.setTo(this.randomGenerator.generateRandom(VELOCITY, true), this.randomGenerator.generateRandom(VELOCITY, true));
            obstacle.body.bounce.setTo(1, 1);
        }
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.obstacles, this.reset, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.obstacles, null, null, this);
        this.score += 1;
        this.camera.x += 3;
        this.killPlayerIfHitLeftEdge();
        this.restrictRightBounds();
    }

    private killPlayerIfHitLeftEdge() {
        if(this.player.body.x <= this.camera.x) {
            this.reset(this.player);
        }
    }
    private restrictRightBounds() {
        this.player.body.x = Math.min(this.player.body.x, this.camera.x + SCREEN_WIDTH - this.player.width);
    }

    render() {
        this.game.debug.text(this.score.toString(), SCREEN_WIDTH - 80, 30, "#ffffff");
    }

    private reset(player: Player) {
        player.kill();
        this.game.state.start('Menu');
        this.score = 0;
    }
}

