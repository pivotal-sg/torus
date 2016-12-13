import {Player} from '../prefabs/player';
import {RandomGenerator} from '../helpers/random_generator';
import Group = Phaser.Group;
import Color = Phaser.Color;
import TileSprite = Phaser.TileSprite;

const VELOCITY = 100;
const INITIAL_OBSTACLE_SPEED = 100;
const NUM_OF_OBSTACLES = 10;
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

export class Game extends Phaser.State {

    player: Player;
    obstacles: Group;
    outerSpace: TileSprite;
    score = 0;
    randomGenerator = new RandomGenerator();

    create() {
        this.world.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.outerSpace = this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'outerSpace');

        this.player = new Player(this.game, SCREEN_WIDTH / 2, this.world.centerY);

        let numOfCircles = this.randomGenerator.generateRandom(NUM_OF_OBSTACLES);

        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);

        for (let i = 0; i < numOfCircles; i++) {
            let obstacle = this.obstacles.create(this.randomGenerator.generateRandom(this.world.width), this.randomGenerator.generateRandom(this.world.height), 'circle')
            obstacle.body.velocity.setTo(
                this.randomGenerator.generateRandom(VELOCITY, true) - INITIAL_OBSTACLE_SPEED,
                this.randomGenerator.generateRandom(VELOCITY, true));
        }
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.obstacles, this.reset, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.obstacles, null, null, this);
        this.score += 1;
        this.outerSpace.tilePosition.x -= 3;

        this.killPlayerIfHitLeftEdge();
    }

    private killPlayerIfHitLeftEdge() {
        if(this.player.body.x <= this.camera.x) {
            this.reset(this.player);
        }
    }

    render() {
        this.game.debug.text(this.formatTime(this.game.time.totalElapsedSeconds()), SCREEN_WIDTH - 80, 30, "#ffffff");
    }

    private reset(player: Player) {
        player.kill();
        this.game.state.start('Menu');
        this.score = 0;
    }

    private formatTime(seconds: number) {
        var date = new Date(null);
        date.setSeconds(seconds); // specify value for SECONDS here
        return date.toISOString().substr(14, 5);
    }
}

