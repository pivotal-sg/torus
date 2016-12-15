enum Button {
  Start = 0,
  Scores = 1
}

export class Menu extends Phaser.State {
  private selectedButton;

  private startButton;
  private scoresButton;

  private titleFontStyle = {
    font: '180px VT323',
    fill: '#8C5C9E'
  };

  private normalSubTitleFontStyle = {
    font: '30px VT323',
    fill: '#FFB83B',
  };

  private selectedSubTitleFontStyle = {
    backgroundColor: '#FFB83B',
    font: '30px VT323',
    fill: '#000000',
  };

  create() {
    let titleText = this.add.text(400, 100, 'TORUS', this.titleFontStyle);
    titleText.anchor.setTo(0.5, 0.5);

    let spaceman = this.game.add.image(400, this.world.centerY, 'spaceman');
    spaceman.anchor.setTo(0.5, 0.5);


    const START_LABEL = ' START ';  // spaces for padding
    this.startButton = this.add.text(400, this.world.height - 120, START_LABEL, this.normalSubTitleFontStyle);
    this.startButton.anchor.setTo(0.5, 0.5);
    this.startButton.inputEnabled = true;

    this.startButton.events.onInputDown.addOnce(this.startButtonClicked, this);

    const SCORES_LABEL = ' SCORES '; // spaces for padding
    this.scoresButton = this.add.text(400, this.world.height - 60, SCORES_LABEL, this.normalSubTitleFontStyle);
    this.scoresButton.anchor.setTo(0.5, 0.5);
    this.scoresButton.inputEnabled = true;
    this.scoresButton.events.onInputDown.addOnce(this.scoresButtonClicked, this);

    this.addKeyHandlers();
    this.setDefaultButtonSelection();
  }

  private setDefaultButtonSelection() {
    this.startButtonSelected();
  }

  private addKeyHandlers() {
    let downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(this.menuButtonSelected, this);

    let upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.menuButtonSelected, this);

    let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.menuButtonPressed, this);

    let enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(this.menuButtonPressed, this);
  }

  startButtonClicked() {
    this.startButtonSelected();
    this.menuButtonPressed();
  }

  scoresButtonClicked() {
    this.scoresButtonSelected();
    this.menuButtonPressed();
  }

  menuButtonPressed() {
    let nextState = this.selectedButton == Button.Start ? 'Game' : 'HighScores';
    this.game.state.start(nextState);
  }

  menuButtonSelected() {
    if (this.selectedButton == Button.Start) {
      this.scoresButtonSelected();
    } else {
      this.startButtonSelected();
    }
  }

  startButtonSelected() {
    this.selectedButton = Button.Start;
    this.startButton.setStyle(this.selectedSubTitleFontStyle);
    this.scoresButton.setStyle(this.normalSubTitleFontStyle);
  }

  scoresButtonSelected() {
    this.selectedButton = Button.Scores;
    this.scoresButton.setStyle(this.selectedSubTitleFontStyle);
    this.startButton.setStyle(this.normalSubTitleFontStyle);
  }
}
