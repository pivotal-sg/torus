/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

import { Boot } from './states/boot';
import { Loading } from './states/loading';
import { Menu } from './states/menu';
import { Game } from './states/game';

export class App extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO);

    this.state.add('Boot', Boot);
    this.state.add('Loading', Loading);
    this.state.add('Menu', Menu);
    this.state.add('Game', Game);

    this.state.start('Boot');
    // this.state.start('Game');
  }
}

let game = new App();
