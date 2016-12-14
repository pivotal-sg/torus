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

    private score: string;
    private inputName: Fabrique.InputField;
    private enterKey;
    private spaceKey;

    init(score: string) {
        this.score = score;
        this.game.plugins.add (Fabrique.Plugins.InputField);
    }

    create() {
        let scoreText = this.add.text(this.world.centerX, 100, `You Scored ${this.score}. Well Done!`, titleFontStyle);
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
    }

    buttonClicked() {
        this.game.state.start('Game');
    }

    update() {
        if(this.enterKey && this.enterKey.isDown) {
            const playerName = this.inputName.value;
            this.inputName.kill();
            let nameText = this.add.text(this.world.centerX, 200, `Congrats ${playerName}`, titleFontStyle);
            nameText.anchor.setTo(0.5, 0.5);

            let startButton = this.add.text(this.world.centerX, this.world.height - 90, 'PRESS HERE OR SPACE TO START', subTitleFontStyle);
            startButton.anchor.setTo(0.5, 0.5);
            startButton.inputEnabled = true;
            startButton.events.onInputDown.addOnce(this.buttonClicked, this);

            this.enterKey = null;
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }

        if(this.spaceKey && this.spaceKey.isDown) {
            this.game.state.start('Game');
        }
    }
}
