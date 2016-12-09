export class Loading extends Phaser.State {

  loadingText: Phaser.Text;
  private hasCircleLoaded;

  preload() {
    this.load.image('loadingBarBg', 'assets/images/loading-bar-bg.png');
    this.load.image('loadingBar', 'assets/images/loading-bar.png');

    // LOAD GAME ASSETS HERE
    this.game.load.image('circle', 'assets/images/largecircle.png');
    this.game.load.image('outerSpace', 'assets/images/outer-space.jpg');
    this.game.load.spritesheet('spaceman', 'assets/images/spaceman.png', 40, 67);
  }

  create() {

    let fontStyle = {
      font: '18px VT323',
      fill: '#7edcfc'
    };

    let loadingBarBg = this.game.add.sprite(this.game.world.centerX,
      this.game.world.centerY,
      'loadingBarBg');
    // loadingBarBg.tint = 0xff0000;
    loadingBarBg.anchor.setTo(0.5);

    let loadingBar = this.game.add.sprite(this.game.world.centerX - 175,
      this.game.world.centerY - 16,
      'loadingBar');
    // loadingBar.tint = 0x00ff00;
    this.load.setPreloadSprite(loadingBar);

    this.loadingText = this.add.text(this.world.centerX,
      this.world.centerY, 'Loading...', fontStyle);

    this.loadingText.anchor.setTo(0.5);

    // this.game.load.onLoadStart.add(this.loadStart, this);
    this.game.load.onFileComplete.add(this.fileComplete, this);
    this.game.load.onLoadComplete.add(this.loadComplete, this);


    this.game.load.start();
  }

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingText.setText('Loading... ' + progress + '%');
  }

  loadComplete() {
    // this.game.state.start('Menu');
    this.game.state.start('Game');
  }

}
