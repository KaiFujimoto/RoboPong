const Right = require('./right');
const Left = require('./left');
const Ball = require("./ball");
// const Util = require("./util");

class RoboPong {
  constructor() {
    // this.paddle = [];
    this.leftPaddle = new Left();
    this.rightPaddle = new Right();
    this.ball = new Ball();
    this.player1 = 0;
    this.player2 = 0;
    this.upPressed = false;
    this.downPressed = false;
    this.imPressed = false;
    this.dePressed = false;
    this.play = false;
    this.winner = '';
    this.gamePlay = true;

    this.updateScore();
  }

  replace() {
    this.ball = new Ball();
  }

  win(player) {

    if (player >= 305) {
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

  }

  checkOutOfBounds() {
    // VV this can be refactored into nextYPos
    if (this.ball.nextYPos() > (RoboPong.DIM_Y - this.ball.radius) ||
        this.ball.nextYPos() < this.ball.radius) {
      this.ball.vel.vy = -this.ball.vel.vy;
    }
    if (this.ball.nextXPos() > RoboPong.DIM_X) {
      setTimeout(() => this.replace(), 1000);
      this.player1 += 1;
      this.win(this.player1);
    }
    if (this.ball.nextXPos() < 0) {
      setTimeout(() => this.replace(), 1000);
      this.player2 += 1;
      this.win(this.player2);
    }
  }

  checkHitPaddle() {
    const ballX = this.ball.nextXPos();
    const ballY = this.ball.nextYPos();
    const leftPaddleX = this.leftPaddle.pos[0];
    const leftPaddleY = this.leftPaddle.pos[1];
    const rightPaddleX = this.rightPaddle.pos[0];
    const rightPaddleY = this.rightPaddle.pos[1];

    if (((ballX - (this.ball.radius * 0.8)) > leftPaddleX) &&
    ((ballX - (this.ball.radius * 0.8)) < (leftPaddleX + this.leftPaddle.dim[0])) &&
    (ballY + (this.ball.radius * 0.6) > leftPaddleY - (this.ball.radius * 0.6)) &&
    (ballY - (this.ball.radius * 0.8) < (leftPaddleY + this.leftPaddle.dim[1] + (this.ball.radius * 0.8)))) {
      this.ball.goRight();
    }

    if ((ballX + (this.ball.radius * 0.8) > rightPaddleX) &&
    (ballX + (this.ball.radius * 0.8) < (rightPaddleX + this.rightPaddle.dim[0])) &&
    (ballY + (this.ball.radius * 0.8) > rightPaddleY) &&
    (ballY < (rightPaddleY + this.rightPaddle.dim[1] + (this.ball.radius * 0.8)))) {
       this.ball.goLeft();
    }
  }

  checkKeyPress() {
    if (this.play && this.gamePlay) {
      if (this.upPressed && this.rightPaddle.pos[1] < RoboPong.DIM_Y - this.rightPaddle.dim[1]) {
        this.rightPaddle.pos[1] += 7;
      }
      else if (this.downPressed && this.rightPaddle.pos[1] > 0) {
        this.rightPaddle.pos[1] -= 7;
      }

      if (this.imPressed && this.leftPaddle.pos[1] < RoboPong.DIM_Y - this.leftPaddle.dim[1]) {
        this.leftPaddle.pos[1] += 7;
      }
      else if (this.dePressed && this.leftPaddle.pos[1] > 0) {
        this.leftPaddle.pos[1] -= 7;
      }
    }
  }

  draw(ctx) {

    const score = document.getElementById("players");

    score.innerText = `Player 1: ${this.player1 % 10}, Player 2: ${this.player2 % 10} Winner: ${this.winner}`;

    ctx.beginPath();
    ctx.clearRect(0, 0, RoboPong.DIM_X, RoboPong.DIM_Y);
    ctx.fillStyle = RoboPong.BG_COLOR;
    ctx.fillRect(0, 0, RoboPong.DIM_X, RoboPong.DIM_Y);

    this.ball.draw(ctx);
    if (this.play && this.gamePlay) {
      this.winner = '';
      this.ball.pos.x += this.ball.vel.vx;
      this.ball.pos.y += this.ball.vel.vy;
    } else if (this.gamePlay === false){
      this.reset();
    }

    this.checkOutOfBounds();
    this.checkHitPaddle();
    this.checkKeyPress();

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


RoboPong.BG_COLOR = "#000000";
RoboPong.DIM_X = 800;
RoboPong.DIM_Y = 500;
RoboPong.FPS = 32;

module.exports = RoboPong;
