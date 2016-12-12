export class Menu extends Phaser.State {
  private spaceKey;

  create() {

    let titleFontStyle = {
      font: '180px VT323',
      fill: '#8C5C9E'
    };

    let subTitleFontStyle = {
      font: '30px VT323',
      fill: '#FFB83B'
    };

    let titleText = this.add.text(400, 100, 'TORUS', titleFontStyle);
    titleText.anchor.setTo(0.5, 0.5);

    let spaceman = this.game.add.image(400, this.world.centerY, 'spaceman');
    spaceman.anchor.setTo(0.5, 0.5);

    let startButton = this.add.text(400, this.world.height - 90, 'PRESS HERE OR SPACE TO START', subTitleFontStyle);
    startButton.anchor.setTo(0.5, 0.5);
    startButton.inputEnabled = true;
    startButton.events.onInputDown.addOnce(this.buttonClicked, this);

    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  buttonClicked() {
    this.game.state.start('Game');
  }

  update() {
    if (this.spaceKey.isDown) {
      this.game.state.start('Game');
    }
  }
}
