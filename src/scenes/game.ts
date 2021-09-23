import Phaser, { Tweens } from "phaser";
export  class Game extends Phaser.Scene {
    constructor(){
        super('game')
    }
  greenBalls: any;
  orangeBalls: any;
  yellowBalls: any;
  greenTween: any;
  yellowTween: any;
  orangeTween: any;
  greenButton: any;
  orangeButton: any;
  yellowButton: any;
  gameWidth: any = 400;
  gameHeight: any = 800;
  timer = 0;
  resources = 0;
  colorsPicker: any;
  colour: any;
  enemy: any;
  checkBall: any;
  score: any = 0;
  scoreBoard: any;
  bestScore: any = 0;
  speed:any = 1200;
  randomenemyPosition:any;
  number:any
  preload() {
    this.load.image('enemy','./assets/enemy.png')
    this.load.audio('collect','./assets/collect.wav')
    this.load.audio('over','./assets/over.wav') 
    this.randomenemyPosition = [this.gameWidth*0.15,this.gameWidth*0.5,this.gameWidth*0.85]
    this.scene.stop('welcomePage')
    localStorage.getItem('bestScore') == null ? this.bestScore = 0: 
    this.bestScore= localStorage.getItem('bestScore')
    this.colour = new Map();
    this.colorsPicker = ["orange", "yellow", "green"];
    this.number = [-1,this.gameWidth+1]
    this.colour.set("orange", 0xFE804E);
    this.colour.set("yellow", 0xFED43C);
    this.colour.set("green", 0x17DC9B);
    this.orangeBalls = this.physics.add.group();
    this.greenBalls = this.physics.add.group();
    this.yellowBalls = this.physics.add.group();
  }
  create() {
    this.ballsGenerator(this.colorsPicker[0]);
    this.ballsGenerator(this.colorsPicker[1]);
    this.ballsGenerator(this.colorsPicker[2]);
    this.orangeButton= this.createButton(this.colorsPicker[0],this.gameWidth * 0.5)
    this.yellowButton= this.createButton(this.colorsPicker[1],this.gameWidth * 0.15)
    this.greenButton= this.createButton(this.colorsPicker[2],this.gameWidth * 0.85)
    this.enemy = this.add.image(
      this.yellowButton.x,
      this.gameHeight * 0.78,'enemy'
    ).setScale(0.3);
    this.physics.add.existing(this.enemy);
    this.enemyTween(this.enemy,800)
    this.checkCollision(this.enemy,this.greenBalls)
    this.checkCollision(this.enemy,this.orangeBalls)
    this.checkCollision(this.enemy,this.yellowBalls)
    this.scoreCard()
    this.time.addEvent({
      delay: 1500,
     repeat:-1,
      callback: () => {
        this.ballsGenerator(this.colorsPicker[this.randomNumberPic(0, 2)]);       
      },
    });
  }
  checkCollision(sprite1:any,sprite2:any){
    this.physics.add.collider(sprite1, sprite2, (a, b) => {
      this.gameEnd()
    });
  }
  scoreCard(){
    this.scoreBoard = this.add.text(this.gameWidth / 2,
      this.gameHeight * 0.02, "Score: 0", {
      fontSize: "40px",
      fontStyle: "bold",
      color: "#fffff",
    }) .setFontSize(45)
    .setFontFamily("Agency FB")
    .setColor("#000000")
    .setOrigin(0.5, 0);
  }
  ballsGenerator(color: string) {
    for (var i = 0; i < this.randomNumberPic(10, 15); i++) {
      var ball = this.add.circle(
      this.number[this.randomNumberPic(0,1)],
        this.randomNumberPic(100, this.gameHeight * 0.65),
        10,
        this.colour.get(color)
      );
     // this.physics.add.existing(ball);
      this.ballsTween(ball)
      if (color == "yellow") {
        this.yellowBalls.add(ball);
      } else if (color == "orange") {
        this.orangeBalls.add(ball);
      } else {
        this.greenBalls.add(ball);
      }
    }
  }
  ballsTween(ball:any){
    this.tweens.add({
      targets: ball,
      onComplete:()=>{
        this.ballsTween(ball)
      },
      props: {
        x: {
          value: this.randomNumberPic(20, this.gameWidth * 0.9),
          duration: this.randomNumberPic(1400, 1500)
        },
        y: {
          value: this.randomNumberPic(100, this.gameHeight * 0.65),
          duration: this.randomNumberPic(1400, 1500)
        },
      },
    }).play;
  }
  enemyTween(enemy:any,duration:any){
    var pos = this.randomenemyPosition[this.randomNumberPic(0, 2 )]
    if(pos == this.enemy.x){
      pos = this.randomenemyPosition[this.randomNumberPic(0, 2 )]
    }
    var tween:any;
    tween = this.tweens.add({
      targets: enemy,
      onComplete:()=>{
        this.enemyTween(enemy,this.randomNumberPic(this.speed,this.speed+300))
      },
      props: {
        x: {
          value: pos,
          duration : duration
        },
      },
    }).play;
  }
  randomNumberPic(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  gameEnd(){
      this.sound.stopByKey('collect')
      this.sound.play('over')
      this.scene.pause()
      this.bestScore < this.score ?  localStorage.setItem('bestScore',this.score): null
      this.add
      .text(this.gameWidth / 2, this.gameHeight / 2, "Game Over")
      .setFontSize(60)
      .setColor("#000000")
      .setFontStyle("bold")
      .setFontFamily("Zekton")
      .setOrigin(0.5);
       setTimeout(() => {
        this.scene.start("welcomePage", {
        score: this.score,
        isGameOver: true,
      });
      this.scene.remove("game");
    }, 1000);
  }
  clickEvent(colorBalls:any,xAxis:number){
    var scror = 0;
    colorBalls.getChildren().forEach((ball: any) => {
      scror++;
      this.tweens.add({
        targets: ball,
        alpha: 1,
        props: {
          x: { value: xAxis, duration: 500 },
          y: {
            value: this.gameHeight * 0.87,
            duration: 500,
          },
        },
        repeat: 1,
        yoyo: true,
      }).play;
      this.time.addEvent({
        delay: 500, // ms
        callback: () => {
          this.score++;
          this.scoreBoard.setText("Score: " + this.score);
          ball.destroy();
        },
        //args: [],
      });
    });
    this.speed -= scror/2 
  }
  createButton(color:string,xPosition:number){
    var button = this.add
    .circle(xPosition, this.gameHeight * 0.87, 30, this.colour.get(color))
    .setInteractive()
    .on("pointerdown", () => {
      switch(color){  
  
        case 'orange':  
              this.clickEvent(this.orangeBalls,xPosition)
            break; 
        case 'yellow':  
            this.clickEvent(this.yellowBalls,xPosition)
            break;            
        default:  
            this.clickEvent(this.greenBalls,xPosition)
            break;  
        }  
    })
    .on("pointerup", () => {
      this.sound.play('collect')
      this.time.addEvent({
        delay: 600, // 
        callback: () => {
        this.ballsGenerator(color)
      },
    });
   });
    return button;
  }
}