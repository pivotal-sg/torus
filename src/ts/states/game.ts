import {Player} from '../prefabs/player';
import {RandomGenerator} from '../helpers/random_generator';
import Group = Phaser.Group;
import Color = Phaser.Color;
import TileSprite = Phaser.TileSprite;
import {Formatter} from "../helpers/formatter";
import {GATracker} from "../helpers/ga_tracker";

const VELOCITY = 100;
const INITIAL_OBSTACLE_SPEED = 100;
const NUM_OF_OBSTACLES_INITIAL = 3;
const NUM_OF_OBSTACLES_ADD = 2;
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

export class Game extends Phaser.State {

    player: Player;
    obstacles: Group;
    outerSpace: TileSprite;
    randomGenerator = new RandomGenerator();
    formatter = new Formatter();
    totalPausedTime = 0;
    score = "";
    gaTracker = new GATracker();

    create() {
        this.world.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.outerSpace = this.game.add.tileSprite(0, 0, this.world.width, this.world.height, 'outerSpace');

        this.player = new Player(this.game, SCREEN_WIDTH / 2, this.world.centerY);

        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;
        this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);

        this.addObstacles(NUM_OF_OBSTACLES_INITIAL);

        this.resetTime();
        this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 10, this.addObstacles, this, NUM_OF_OBSTACLES_ADD);
        this.game.time.events.start();

        this.gaTracker.sendPageView();
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.obstacles, this.reset, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.obstacles, null, null, this);
        this.outerSpace.tilePosition.x -= 3;

        this.killPlayerIfHitLeftEdge();
    }

    private addObstacles(num) {
        for (let i = 0; i < num; i++) {
            let obstacle = this.obstacles.create(
                SCREEN_WIDTH + this.randomGenerator.generateRandom(SCREEN_WIDTH/10),
                this.randomGenerator.generateRandom(SCREEN_HEIGHT),
                'circle'
            );
            obstacle.body.velocity.setTo(
                this.randomGenerator.generateRandom(VELOCITY, true) - INITIAL_OBSTACLE_SPEED,
                this.randomGenerator.generateRandom(VELOCITY, true)
            );

            obstacle.checkWorldBounds = true;
            obstacle.events.onOutOfBounds.add(this.obstacleOut, this);
        }
    }

    private obstacleOut(obstacle) {
        obstacle.reset(
            SCREEN_WIDTH + this.randomGenerator.generateRandom(SCREEN_WIDTH/10),
            this.randomGenerator.generateRandom(SCREEN_HEIGHT)
        );

        obstacle.body.velocity.setTo(
            this.randomGenerator.generateRandom(VELOCITY, true) - INITIAL_OBSTACLE_SPEED,
            this.randomGenerator.generateRandom(VELOCITY, true)
        );
    }

    private killPlayerIfHitLeftEdge() {
        if (this.player.body.x <= this.camera.x) {
            this.reset(this.player);
        }
    }

    render() {
        this.score = this.formatter.formatTime(this.getGameTime());
        this.game.debug.text(this.score, SCREEN_WIDTH - 80, 30, "#ffffff");
    }

    private reset(player: Player) {
        player.kill();
        this.game.state.start('Score', true, false, this.getGameTime());
    }

    private resetTime() {
        this.game.time.reset();
        this.game.time.pauseDuration = 0;
        this.totalPausedTime = 0;
    }

    private getGameTime() {
        this.totalPausedTime += this.game.time.pauseDuration;
        this.game.time.pauseDuration = 0;

        return this.game.time.totalElapsedSeconds() - Math.floor(this.totalPausedTime / 1000);
    }
}

