import Phaser from 'phaser';
import config from './config';
import { Game } from './scenes/game';
import WelcomPage from './scenes/welcomePage';

new Phaser.Game(
  Object.assign(config, {
    scene: [WelcomPage,Game]
  })
);
