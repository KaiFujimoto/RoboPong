const Sensei = require('./sensei.js');
const Paddle = require('./paddle_main');
const Ball = require("./ball");

class RoboPong {
  constructor() {
    this.dimX = 800;
    this.dimY = 500;
    this.backgroundColor = "#000000";
    this.leftPaddle = new Paddle({type: "L"});
    this.rightPaddle = new Paddle({type: "R"});
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
    this.gameOngoing = true;
    this.botPlaying = false;
    this.bot2Playing = false;

    this.updateScore();
  }

  replace() {
    this.ball = new Ball();
    this.gameOngoing = true;
  }

  win(player) {

    if (player >= 5) {
      if (player === this.player1) {
        this.winner = "Player1 Wins!";
      } else {
        this.winner = "Player2 Wins!";
      }
      this.play = false;
      this.gamePlay = false;
      this.updateScore();
    }

  }

  updateScore() {
    const score = document.getElementById("players");

    score.innerText = `Player 1: ${this.player1}, Player 2: ${this.player2}`;

    const winner = document.getElementById("winner");

    winner.innerText = `Winner: ${this.winner}`;
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
            this.leftPaddle = new Paddle({type: 'L'});
            this.rightPaddle = new Paddle({type: 'R'});
            this.play = true;
          }
          break;

        case (49):
          if (this.play === false) {
            this.leftPaddle = new Paddle({type: 'L'});
            this.rightPaddle = new Sensei({type: 'R'}, this);
            this.play = true;
            this.botPlaying = true;
          }
          break;

        case (51):
          if (this.play === false) {
            this.leftPaddle = new Sensei({type: 'L'}, this);
            this.rightPaddle = new Sensei({type: 'R'}, this);
            this.play = true;
            this.bot2Playing = true;
          }
          break;

        case (32):
          if (this.play === false) {
            this.play = true;
          } else {
            this.play = false;
          }
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
        if (!this.botPlaying && !this.bot2Playing) {
          this.rightPaddle.moveUp();
        }
      }
      else if (this.downPressed && this.rightPaddle.posY() > 0) {
        if (!this.botPlaying && !this.bot2Playing) {
          this.rightPaddle.moveDown();
        }
      }

      if (this.imPressed && this.leftPaddle.posY() < this.leftPaddle.paddleBounds(this.dimY)) {
        if (!this.bot2Playing) {
          this.leftPaddle.moveUp();
        }
      }
      else if (this.dePressed && this.leftPaddle.posY() > 0) {
        if (!this.bot2Playing) {
          this.leftPaddle.moveDown();
        }
      }
    }
  }

  playGame(ctx) {
    this.draw(ctx);
    this.updateGame();
  }

  updateGame() {
    this.checkOutOfBounds();
    this.score();
    this.checkHitPaddle();
    this.keyControlsToPaddleMovement();
    if (this.botPlaying && this.play) {
      this.rightPaddle.defend(this.ball);
    }
    if (this.bot2Playing && this.play) {
      this.leftPaddle.defend(this.ball);
      this.rightPaddle.defend(this.ball);
    }
  }

  draw(ctx) {

    ctx.beginPath();
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.dimX, this.dimY);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 500);
    ctx.lineWidth = 10;
    ctx.setLineDash([0, 5, 10, 15]);
    ctx.stroke();

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
    this.leftPaddle = new Paddle({type: "L"});
    this.rightPaddle = new Paddle({type: "R"});
    this.player1 = 0;
    this.player2 = 0;
  }
}

module.exports = RoboPong;
