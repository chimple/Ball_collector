import Phaser from 'phaser';
import { Game } from './scenes/game';
import WelcomPage from './scenes/welcomePage';

export default {
	type: Phaser.AUTO,
	debugger:true,
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
