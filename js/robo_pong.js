const Right = require('./right');
const Left = require('./left');
const Ball = require("./ball");
// const Util = require("./util");

class RoboPong {
  constructor() {
    // this.paddle = [];
    this.left = new Left();
    this.right = new Right();
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
    if (this.ball.pos.y + this.ball.vel.vy > (RoboPong.DIM_Y - this.ball.radius) ||
        this.ball.pos.y + this.ball.vel.vy < this.ball.radius) {
      this.ball.vel.vy = -this.ball.vel.vy;
    }
    if (this.ball.pos.x + this.ball.vel.vx > RoboPong.DIM_X) {
      setTimeout(() => this.replace(), 1000);
      this.player1 += 1;
      this.win(this.player1);
    }
    if (this.ball.pos.x + this.ball.vel.vx < 0) {
      setTimeout(() => this.replace(), 1000);
      this.player2 += 1;
      this.win(this.player2);
    }
  }

  checkHitPaddle() {
    const ballX = this.ball.pos.x + this.ball.vel.vx;
    const ballY = this.ball.pos.y + this.ball.vel.vy;
    const leftX = this.left.pos[0];
    const leftY = this.left.pos[1];
    const rightX = this.right.pos[0];
    const rightY = this.right.pos[1];

    if (((ballX - (this.ball.radius * 0.8)) > leftX) && // if the ball is on the right of the left border of the left bar
    ((ballX - (this.ball.radius * 0.8)) < (leftX + this.left.dim[0])) && // if the ball is on the left of the right border of the left bar
    (ballY + (this.ball.radius * 0.6) > leftY - (this.ball.radius * 0.6)) && // if the ballY is larger than the top border
    (ballY - (this.ball.radius * 0.8) < (leftY + this.left.dim[1] + (this.ball.radius * 0.8)))) { // if ballY is less than the bottom border
      this.ball.vel.vx = -this.ball.vel.vx;
    }

    if ((ballX + (this.ball.radius * 0.8) > rightX) &&
    (ballX + (this.ball.radius * 0.8) < (rightX + this.right.dim[0])) &&
    (ballY + (this.ball.radius * 0.8) > rightY) &&
    (ballY < (rightY + this.right.dim[1] + (this.ball.radius * 0.8)))) {
       this.ball.vel.vx = -this.ball.vel.vx;
    }
  }

  checkKeyPress() {
    if (this.play && this.gamePlay) {
      if (this.upPressed && this.right.pos[1] < RoboPong.DIM_Y - this.right.dim[1]) {
        this.right.pos[1] += 7;
      }
      else if (this.downPressed && this.right.pos[1] > 0) {
        this.right.pos[1] -= 7;
      }

      if (this.imPressed && this.left.pos[1] < RoboPong.DIM_Y - this.left.dim[1]) {
        this.left.pos[1] += 7;
      }
      else if (this.dePressed && this.left.pos[1] > 0) {
        this.left.pos[1] -= 7;
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

    this.left.draw(ctx);
    this.right.draw(ctx);
  }

  reset() {
    this.ball = new Ball();
    this.left = new Left();
    this.right = new Right();
    this.player1 = 0;
    this.player2 = 0;
  }
}


RoboPong.BG_COLOR = "#000000";
RoboPong.DIM_X = 800;
RoboPong.DIM_Y = 500;
RoboPong.FPS = 32;

module.exports = RoboPong;
