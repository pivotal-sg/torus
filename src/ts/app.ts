/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser-input/build/phaser-input.d.ts"/>

import { Boot } from './states/boot';
import { Loading } from './states/loading';
import { Menu } from './states/menu';
import { Game } from './states/game';
import { Score } from "./states/score";
import { HighScores } from "./states/highScores";


export class App extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO);

    this.state.add('Boot', Boot);
    this.state.add('Loading', Loading);
    this.state.add('Menu', Menu);
    this.state.add('Game', Game);
    this.state.add('HighScores', HighScores);
    this.state.add('Score', Score);

    this.state.start('Boot');
  }
}

let game = new App();
