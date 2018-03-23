const Right = require('./right');
const Left = require('./left');
const Ball = require("./ball");

class RoboPong {
  constructor() {
    this.dimX = 800;
    this.dimY = 500;
    this.backgroundColor = "#000000";
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
    if (this.ball.nextYPos() > (this.dimY - this.ball.radius) ||
        this.ball.nextYPos() < this.ball.radius) {
      this.ball.vel.vy = -this.ball.vel.vy;
    }
    if (this.ball.nextXPos() > this.dimX) {
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
    this.leftPaddle.isCollidedWith(this.ball);
    this.rightPaddle.isCollidedWith(this.ball);
  }

  checkKeyPress() {
    if (this.play && this.gamePlay) {
      if (this.upPressed && this.rightPaddle.pos[1] < this.dimY - this.rightPaddle.dim[1]) {
        this.rightPaddle.pos[1] += 7;
      }
      else if (this.downPressed && this.rightPaddle.pos[1] > 0) {
        this.rightPaddle.pos[1] -= 7;
      }

      if (this.imPressed && this.leftPaddle.pos[1] < this.dimY - this.leftPaddle.dim[1]) {
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
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.dimX, this.dimY);

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

module.exports = RoboPong;
