import Phaser, { Tweens } from "phaser";
export  class Game extends Phaser.Scene {
    constructor(){
        console.log('@@@@@@@@')
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
  gameOver: any = false;
  bestScore: any = 0;
  check:any = this.gameWidth*0.8;
  speed:any = 1000;
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
    this.BallGenerator(this.colorsPicker[0]);
    this.BallGenerator(this.colorsPicker[1]);
    this.BallGenerator(this.colorsPicker[2]);
    this.orangeButton = this.add
      .circle(this.gameWidth * 0.5, this.gameHeight * 0.87, 30, 0xFE804E)
      .setInteractive()
      .on("pointerdown", () => {
        this.orangeBalls.getChildren().forEach((orange: any) => {
          this.checkBall = orange;
          this.tweens.add({
            targets: orange,
            alpha: 1,
            props: {
              x: { value: this.gameWidth * 0.5, duration: 500 },
              y: {
                value: this.gameHeight * 0.87,
                duration: 500,
                ease: Phaser.Math.Easing.Quadratic.InOut,
              },
            },
            repeat: 1,
            yoyo: true,
          }).play;
          this.time.addEvent({
            delay: 500, // ms
            callback: () => {3
              this.score++;
              this.scoreBoard.setText("Score: " + this.score);
              orange.destroy();            },
            //args: [],
          });
        });
      })
      .on("pointerup", () => {
        this.sound.play('collect')
        this.time.addEvent({
          delay: 600, // 
        callback: () => {
          this.BallGenerator(this.colorsPicker[0])
        },
      });
      });
    this.yellowButton = this.add
      .circle(this.gameWidth * 0.15, this.gameHeight * 0.87, 30, 0xFED43C)
      .setInteractive()
      .on("pointerdown", () => {
        this.yellowBalls.getChildren().forEach((yellow: any) => {
          this.tweens.add({
            targets: yellow,
            alpha: 1,
            props: {
              x: { value: this.gameWidth * 0.15, duration: 500 },
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
              yellow.destroy();
            },
            //args: [],
          });
        });
      })
      .on("pointerup", () => {
        this.sound.play('collect')
        this.time.addEvent({
          delay: 600, // 
        callback: () => {
          this.BallGenerator(this.colorsPicker[1])
        },
      });
    });
    this.greenButton = this.add
      .circle(this.gameWidth * 0.85, this.gameHeight * 0.87, 30, 0x17DC9B)
      .setInteractive()
      .on("pointerdown", () => {
        this.greenBalls.getChildren().forEach((green: any) => {
          this.tweens.add({
            targets: green,
            alpha: 1,
            props: {
              x: { value: this.gameWidth * 0.85  , duration: 500 },
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
              green.destroy();
            },
            //args: [],
          });
        });
      })
      .on("pointerup", () => {
        this.sound.play('collect')
        this.time.addEvent({
          delay: 600, // 
        callback: () => {
          this.BallGenerator(this.colorsPicker[2])
        },
      });
      });
    this.enemy = this.add.image(
      this.yellowButton.x,
      this.gameHeight * 0.78,'enemy'
    ).setScale(0.3);
    this.physics.add.existing(this.enemy);
    this.enemyTween(this.enemy,800)
    this.physics.add.collider(this.enemy, this.yellowBalls, (a, b) => {
      this.gameOver = true;
    });
    this.physics.add.collider(this.enemy, this.orangeBalls, (a, b) => {
      this.gameOver = true;
    });
    this.physics.add.collider(this.enemy, this.greenBalls, (a, b) => {
      this.gameOver = true;
    });
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
  BallGenerator(color: string) {
    for (var i = 0; i < this.randomNumberPic(10, 15); i++) {
      var ball = this.add.circle(
      this.number[this.randomNumberPic(0,1)],
        this.randomNumberPic(100, this.gameHeight * 0.65),
        10,
        this.colour.get(color)
      );
      this.physics.add.existing(ball);
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
  checkOverlap(spriteA: any, spriteB: any) {
    return Phaser.Geom.Intersects.CircleToCircle(spriteA, spriteB);
  }
  update(time: any, delta: any) {
    this.enemy.angle+=5
    this.timer += delta;
    while (this.timer > this.randomNumberPic(3000, 5000)) {
      this.resources += 1;
      this.timer -= this.randomNumberPic(3000, 5000);
      this.BallGenerator(this.colorsPicker[this.randomNumberPic(0, 2)]);
    }
    if (this.gameOver) {
      this.sound.stopByKey('collect')
      this.sound.play('over')
      const style = {
        font: "32px Monospace",
        fill: "#fffff",
        // align: "center",
      };
      this.scene.pause()
     // this.scene.start('welcomePage',{ score: this.score })
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
    if (
      this.gameOver &&
      (this.input.activePointer.isDown || this.input.pointer1.isDown)
    ) {
      this.score = 0;
      this.gameOver = false;
      this.scene.restart();
    }
  }
  ballsTween(ball:any){
    this.tweens.add({
      targets: ball,
  //    alpha: 1,
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
      // repeat: 1,
      // yoyo: true,
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
        this.enemyTween(enemy,this.randomNumberPic(1200,1500))
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
}