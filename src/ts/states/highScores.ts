import { Formatter } from "../helpers/formatter";
const titleFontStyle = {
    font: '50px VT323',
    fill: '#8C5C9E'
};
const subTitleFontStyle = {
    font: '30px VT323',
    fill: '#FFB83B'
};
const promptFontStyle = {
    animation: 'blinker 1s linear infinite',
    font: '30px VT323',
    fill: '#FFB83B'
};

export class HighScores extends Phaser.State {

    private score: string;
    private enterKey;
    private spaceKey;

    private yCoordForHeaderText = 110;
    private offsetY = 80;

    private xCoordForPlayerHeaderText() { return this.world.centerX / 3; }
    private xCoordForTimingHeaderText() { return this.world.centerX / 3 * 5; }

    private formatter = new Formatter();

    init(score: string) {
        this.score = score;
    }

    preload() {
        this.load.json('highScores', 'http://torus-api.cfapps.io/torus/highscores', true);
    }

    create() {
        this.displayTitle();
        this.displayHeaders();
        this.displayHighScores();
        this.displayPrompt();
        this.addKeyHandlers();
    }

    private displayPrompt() {
        let promptText = this.add.text(this.world.centerX, this.world.height - this.offsetY, 'Press Spacebar or Enter to return to Main Menu', promptFontStyle);
        promptText.anchor.setTo(0.5, 0.5);
    }

    private displayTitle() {
        let highScoresTitleText = this.add.text(this.world.centerX, this.offsetY, 'High Scores', titleFontStyle);
        highScoresTitleText.anchor.setTo(0.5, 0.5);
    }

    private displayHeaders() {
        this.add.text(this.xCoordForPlayerHeaderText(), this.yCoordForHeaderText, 'Player', titleFontStyle);

        let timingHeaderText = this.add.text(this.xCoordForTimingHeaderText(), this.yCoordForHeaderText, 'Timing', titleFontStyle);
        timingHeaderText.anchor.setTo(1, 0);
    }

    private displayHighScores() {
        let highScoresJson = this.game.cache.getJSON('highScores');
        highScoresJson.map((highScore, index) => {
            const y = 170 + index * 30;

            this.add.text(this.xCoordForPlayerHeaderText(), y, `${index + 1}. ${highScore.name}`, subTitleFontStyle);

            let scoreText = this.add.text(this.xCoordForTimingHeaderText(), y, this.formatter.formatTime(highScore.score), subTitleFontStyle);
            scoreText.anchor.setTo(1, 0);
        });
    }

    private addKeyHandlers() {
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.goToMenu, this);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.goToMenu, this);
    }

    private goToMenu() {
        this.game.state.start('Menu');
    }

    shutdown() {
        this.enterKey.reset(true);
        this.spaceKey.reset(true);
    }
}
