export class Boot extends Phaser.State {

  fontsLoaded: boolean = false;
  preLoadingText: Phaser.Text;

  init() {
    window['WebFontConfig'] = {
      active: () => this.fontsLoaded = true,
      google: { families: ['VT323'] }
    };
  }

  preload() {
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
  }

  create() {
    let fontStyle = {
      font: '12px Courier',
      fill: '#7edcfc'
    };

    this.preLoadingText = this.add.text(this.world.centerX,
    this.world.centerY,'Loading fonts...', fontStyle);
    this.preLoadingText.anchor.setTo(0.5);

    this.game.input.maxPointers = 1;
    this.game.antialias = false; // For pixel art
    this.stage.disableVisibilityChange = false; // disable auto-pause on focus loss

    if (!this.game.device.desktop) {
      this.scale.forceOrientation(true, false); // Landscape
      //this.scale.forceOrientation(false, true); // Portrait
    }

    // this.scale.pageAlignHorizontally = true;
    // this.scale.pageAlignVertically = true;
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Use max screen space
  }

  update() {
    if (this.fontsLoaded) {
      this.game.state.start('Loading');
    }
  }

}
