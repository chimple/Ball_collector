import Phaser from 'phaser';
import { Game } from './scenes/game';
import WelcomPage from './scenes/welcomePage';

export default {
	type: Phaser.AUTO,
	debugger:true,
	scale: {
		mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
		
	  },
	width: 400,
	height: 800,
	backgroundColor: "#EBFAFF",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		}
	},
	scene: [Game,WelcomPage]
};
