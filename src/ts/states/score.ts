/// <reference path="../../../node_modules/@types/whatwg-fetch/index.d.ts"/>

import { Formatter } from "../helpers/formatter";

const INPUT_WIDTH = 500;
const titleFontStyle = {
    font: '50px VT323',
    fill: '#8C5C9E'
};
const subTitleFontStyle = {
    font: '30px VT323',
    fill: '#FFB83B'
};

export class Score extends Phaser.State {

    private score: number;
    private inputName: Fabrique.InputField;
    private enterKey;
    private formatter = new Formatter();

    init(score: number) {
        this.score = score;
        this.game.plugins.add (Fabrique.Plugins.InputField);
    }

    create() {
        let scoreText = this.add.text(this.world.centerX, 100, `You Scored ${this.formatter.formatTime(this.score)}. Well Done!`, titleFontStyle);
        scoreText.anchor.setTo(0.5, 0.5);

        let titleText = this.add.text(this.world.centerX, 150, 'Please Enter Your Name', titleFontStyle);
        titleText.anchor.setTo(0.5, 0.5);

        this.inputName = this.game.add.inputField(
            this.world.centerX - INPUT_WIDTH/2, 200, {
            width: INPUT_WIDTH,
            borderColor: '#0000000',
            backgroundColor: '#0000000',
            font: '60px VT323',
            fill: '#FFB83B',
            cursorColor: '#FFB83B',
            max: "20"
        });
        this.inputName.blockInput = false;
        this.inputName.startFocus();

        let spaceman = this.game.add.image(this.world.centerX, this.world.centerY, 'spaceman');
        spaceman.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.submitScore, this);
    }

    private submitScore() {
        let body = JSON.stringify({
            name: this.inputName.value,
            score: this.score
        });

        fetch('https://torus-api.cfapps.io/torus/highscores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        }).then(() => this.game.state.start('HighScores'));
    }

    shutdown() {
        this.enterKey.reset(true);
    }
}
