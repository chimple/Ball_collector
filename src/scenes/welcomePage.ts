import { Game } from "./game";

export default class welcomePage extends Phaser.Scene {
  bestScore:any;
    score:any ;
    button:any;
    gameWidth:any = 400;
    gameHeight:any = 800;
    private isGameOver: any;
    constructor(){
        super('welcomePage')
    }
    init(data:any){
        this.score = data.score;
        this.isGameOver = data.isGameOver ?? false;
      }
    preload(){
      
         this.load.image('title','./assets/title.png')
         this.load.image('play','./assets/play.png')
         this.load.audio('click','./assets/click.mp3')
        localStorage.getItem('bestScore') == null ? this.bestScore = 0: 
        this.bestScore= localStorage.getItem('bestScore')
    }
    create() {
      this.add
      .image(200,50, "title")
      .setOrigin(0.5, 0)
      .setScale(0.3);
      this.add
      .text(this.gameWidth / 2, this.gameHeight * 0.4, "Score")
      .setFontSize(60)
      .setColor("#000000")
      .setFontFamily("Agency FB")
      .setOrigin(0.5, 0);
    this.add
      .text(this.gameWidth / 2, this.gameHeight * 0.5, this.score ?? "00")
      .setFontSize(45)
      .setFontFamily("Agency FB")
      .setColor("#000000")
      .setOrigin(0.5, 0);
    this.add
      .text(this.gameWidth / 2, this.gameHeight * 0.65, "Best Score")
      .setFontSize(50)
      .setColor("#000000")
      .setFontFamily("Agency FB")
      .setOrigin(0.5, 0);
    this.add
      .text(
        this.gameWidth / 2,
        this.gameHeight * 0.74,
        localStorage.getItem("bestScore") ?? "00"
      )
      .setFontSize(45)
      .setFontFamily("Agency FB")
      .setColor("#000000")
      .setOrigin(0.5, 0);

      this.button = this.add
      .image(this.gameWidth / 2, this.gameHeight * 0.85, "play")
      .setOrigin(0.5, 0)
      .setScale(0.35).setInteractive()
      .on("pointerdown", () => {
        this.sound.play('click')
        if (this.isGameOver) {
          this.scene.add("game", Game,false);
        }
        this.scene.start("game");
      },)
  
       this.add
      .text(this.button.x-80, this.button.y+15,
         "Tap to Start",{
        fontSize: "35px",
        align:'centre',
        color: "	#FFFFFF",
      }) .setFontFamily("Agency FB")
      }
}