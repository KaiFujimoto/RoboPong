const Right = require('./right');
const Left = require('./left');
const Ball = require("./ball");
const Sensei = require("./sensei");

class RoboPong {
  constructor() {
    this.dimX = 800;
    this.dimY = 500;
    this.backgroundColor = "#000000";
    this.leftPaddle = new Left();
    this.rightPaddle = new Right();
    this.ball = new Ball();
    this.sensei = new Sensei(this.ball, this);
    this.player1 = 0;
    this.player2 = 0;
    this.upPressed = false;
    this.downPressed = false;
    this.imPressed = false;
    this.dePressed = false;
    this.play = false;
    this.winner = '';
    this.gamePlay = true;
    this.gameOngoing = true;

    this.updateScore();
  }

  replace() {
    this.ball = new Ball();
    this.gameOngoing = true;
  }

  win(player) {

    if (player >= 5) {
      if (player === this.player1) {
        this.winner = "player1 wins!";
      } else {
        this.winner = "player2 wins!";
      }
      this.play = false;
      this.gamePlay = false;
      this.updateScore();
    }

  }

  updateScore() {
    const score = document.getElementById("players");

    score.innerText = `Player 1: ${this.player1}, Player 2: ${this.player2} Winner: ${this.winner}`;
  }

  checkOutOfBounds() {
    this.ball.checkBoarders(this.dimY);
  }

  score() {
    if (this.ball.nextXPos() > this.dimX) {
      setTimeout(() => this.replace(), 1000);
      if (this.gameOngoing) {
        this.player1 += 1;
        this.win(this.player1);
        this.gameOngoing = false;
      }
    }
    if (this.ball.nextXPos() < 0) {
      setTimeout(() => this.replace(), 1000);
      if (this.gameOngoing) {
        this.player2 += 1;
        this.win(this.player2);
        this.gameOngoing = false;
      }
    }
  }

  checkHitPaddle() {
    this.leftPaddle.isCollidedWith(this.ball);
    this.rightPaddle.isCollidedWith(this.ball);
  }

  keyPressHandler(eKeyCode) {
    switch (eKeyCode) {
      case (50):
        if (this.play === false) {
          this.leftPaddle = new Left();
          this.rightPaddle = new Right();
          this.play = true;
        }
        break;

      case (49):
        if (this.play === false) {
          this.leftPaddle = new Left();
          this.rightPaddle = new Sensei(this.ball, this);
          this.play = true;
        }
        break;

      case (32):
        this.play = false;
        break;

      case (13):
        if (this.gamePlay === false) {
          this.gamePlay = true;
          this.play = false;
        }
        return this.play;
    }
  }

  _inGame() {
    return (this.play && this.gamePlay);
  }

  keyControlsToPaddleMovement() {
    if (this._inGame()) {
      if (this.upPressed && this.rightPaddle.posY() < this.rightPaddle.paddleBounds(this.dimY)) {
        this.rightPaddle.moveUp();
      }
      else if (this.downPressed && this.rightPaddle.posY() > 0) {
        this.rightPaddle.moveDown();
      }

      if (this.imPressed && this.leftPaddle.posY() < this.leftPaddle.paddleBounds(this.dimY)) {
        this.leftPaddle.moveUp();
      }
      else if (this.dePressed && this.leftPaddle.posY() > 0) {
        this.leftPaddle.moveDown();
      }
    }
  }

  playGame(ctx) {
    this.draw(ctx);
    this.updateGame();
    if (this.play) {
      this.sensei.defend();
    }
  }

  updateGame() {
    this.checkOutOfBounds();
    this.score();
    this.checkHitPaddle();
    this.keyControlsToPaddleMovement();
  }

  draw(ctx) {
    // draw field
    ctx.beginPath();
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.dimX, this.dimY);
    ctx.fill();
    // draw line
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.dimX/2, 0);
    ctx.lineTo(this.dimX/2, this.dimY);
    ctx.closePath();
    ctx.stroke();
    // draw the ball
    this.ball.draw(ctx);
    if (this.play && this.gamePlay) {
      this.winner = '';
      this.ball.pos.x += this.ball.vel.vx;
      this.ball.pos.y += this.ball.vel.vy;
    } else if (this.gamePlay === false){
      this.reset();
    }

    this.leftPaddle.draw(ctx);
    this.rightPaddle.draw(ctx);
  }

  reset() {
    this.ball = new Ball();
    this.leftPaddle = new Left();
    this.rightPaddle = new Right();
    this.player1 = 0;
    this.player2 = 0;
  }
}

module.exports = RoboPong;
