export class Menu extends Phaser.State {

  create() {

    let titleFontStyle = {
      font: '180px VT323',
      fill: '#83769C'
    };

    let titleText = this.add.text(this.world.centerX, 100, 'TORUS', titleFontStyle);
    titleText.anchor.setTo(0.5, 0.5);

    let buttonFontStyle = {
      font: '30px VT323',
      fill: '#00E232'
    };

    let spaceman = this.game.add.image(this.world.centerX, this.world.centerY, 'spaceman');
    spaceman.anchor.setTo(0.5, 0.5);

    let gameButton = this.add.text(this.world.centerX, this.world.height - 150, 'PLAY!', buttonFontStyle);
    gameButton.anchor.setTo(0.5, 0.5);
    gameButton.inputEnabled = true;
    gameButton.events.onInputDown.addOnce(this.buttonClicked, this);
  }

  buttonClicked() {
    this.game.state.start('Game');
  }
}
