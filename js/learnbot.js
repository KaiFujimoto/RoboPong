const Paddle = require('./paddle_main');
const brain = require('brain.js');


// so basically the machine learning guy (just taking a step back) is just a freakin paddle
// and this paddle like learns to move with the stuff and not lose

// need a way to punish bot chan for losing and reward bot chan for winning?
// where would i keep that stat?
// need a picture of the whole board somehow and the whole game or something
// WTFFFFFF :(
window.localStorage.trainingData = window.localStorage.trainingData || JSON.stringify([]);

// i need a live update thing



class LearnBotChan extends Paddle {
  constructor(options = {}, game) {
    super(options);
    this.brain = new brain.NeuralNetwork();
    this.data = {
      ballYPos: {},
      paddleYPos: {}
    };
    this.game = game;
    this.dimX = game.dimX;
    this.dimY = game.dimY;
    this.results = [];
// i need data on the game, the ball position
  }

  training(hit, ball) {
    const data = JSON.parse(window.localStorage.trainingData);

    data.push({
      input: [
        this.data.ballYPos,
        this.data.paddleYPos
      ],
      output: [hit]
    });

    window.localStorage.trainingData = JSON.stringify(data);

    this.predictPaddlePosition();
  }

  predictPaddlePosition() {
    const data = JSON.parse(window.localStorage.trainingData);
    if (!data.length) {
      return;
    }

    this.brain.train(data);

    for (let i = 0; i < 100000; i++) {
      const ballYPos = {b: ball.yPos()};
      const paddleYPos = {p: this.posY()};
      const positions = [
        ballYPos.b,
        paddleYPos.p
      ];
      const [ hit ] = this.brain.run(position);
      this.results.push({ ballYPos, paddleYPos, hit});
    }

    const sortedResults = this.results.sort( (a, b) => {
      a = a.hit;
      b = b.hit;

      return b - a;
    });
  }

  givingPaddleDirection(predictedPos) {
    // get direction the paddle should move
    if (predictedPos > this.posY()) {
      // figuring out the predicted Position with the position Y and if it's higher, then we will put as a data in our output the direction equal to 0 which will prompt the paddle to move down and vise versa

      return {down: 1};
    } else {
      return {up: 1};
    }
  }

  moveUp(position) {
    if (this.pos[1] > position) {
      this.pos[1] -= 10;
    }
  }

  moveDown(position) {
    if (this.pos[1] < position) {
      this.pos[1] += 10;
    }
  }

  defendMove(ball) {
    // first i put in the data into my this.data and i call the learn Defense data and pass in the ball.
    this.learnDefenseData(ball);
    // from my now updated Data, i will extract the object that was last pushed
    const currentData = this.data[this.data.length - 1];
    // start to train the brain
    // debugger
    this.training();
    // run the brain with the current Data
    const result = brain.likely(currentData, this.brain);
    // make it move accordingly
    if (result === "up") {
        this.moveDown(0);
    } else {
        this.moveUp(500);
    }
  }

}

module.exports = LearnBotChan;
//
// isPositive(pos) {
//   return pos === Math.abs(pos);
// }
//
// isNegative(pos) {
//   return pos !== Math.abs(pos);
// }

//
// learnDefenseData(ball) {
//   // get the predicted position based on physics calculation
//   let predictedPos = (ball.yVel() * ball.yPos()) / ball.xVel();
//   // see if the ball is coming my way
//   let dir;
//   if (!this.isPositive(ball.xVel()) && this.isNegative(ball.yVel())) {
//     // debugger
//     // check if the ball is going down or up towards me
//     if (ball.yPos() - predictedPos > this.dimY) {
//       // if the ball's y position plus the predicted Position (which is negative because predictedPosition is a negative number) is greated than this.dimY or the height of the board
//       // debugger
//       predictedPos = (ball.yPos() - predictedPos - this.dimY);
//       // we will set the predicted Position to be the ball's yPosition minus the predictedPosition (aka add the predicted Position) minus the board to get the bounce location
//       // debugger
//       dir = this.givingPaddleDirection(predictedPos);
//     } else {
//       // debugger
//       predictedPos = (ball.yVel() - predictedPos);
//       // debugger
//       dir = this.givingPaddleDirection(predictedPos);
//     }
//   } else {
//     // debugger
//     predictedPos = Math.abs(ball.yVel() - predictedPos);
//     // debugger
//     dir = this.givingPaddleDirection(predictedPos);
//   }
//   // push this data information into my brain (haha)
//   let up;
//   let value = Object.values(dir)[0];
//   let down;
//   if (Object.keys(dir)[0] === "up") {
//     up = "up";
//     this.data.push({
//       input: {
//         predictedPos: predictedPos,
//         paddYPos: this.posY()
//       },
//       output: {
//         up: value
//       }
//     });
//   } else {
//     down = "down";
//     this.data.push({
//       input: {
//         predictedPos: predictedPos,
//         paddYPos: this.posY()
//       },
//       output: {
//         down: value
//       }
//     });
//   }
//   // debugger
// }
