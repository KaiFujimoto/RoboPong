// const Paddle = require('./paddle_main');
// const brain = require('brain.js');
//
//
// // so basically the machine learning guy (just taking a step back) is just a freakin paddle
// // and this paddle like learns to move with the stuff and not lose
//
// // need a way to punish bot chan for losing and reward bot chan for winning?
// // where would i keep that stat?
// // need a picture of the whole board somehow and the whole game or something
// // WTFFFFFF :(
//
//
//
// const INITIAL_VALUES = {
//   input: {
//     ballYPos: 0,
//     paddleYPos: 0
//   },
//   output: {score: 0.5}
// };
// // i need a live update thing
// window.localStorage.trainingData = window.localStorage.trainingData || JSON.stringify([INITIAL_VALUES]);
//
//
// class LearnBotChan extends Paddle {
//
//   constructor(options = {}, game) {
//     super(options);
//     this.brain = new brain.NeuralNetwork({timeout: 10});
//     this.data = [];
//     this.game = game;
//     this.dimX = game.dimX;
//     this.dimY = game.dimY;
//     this.ball = game.ball;
//     this.points = 0;
//     this.oppPoints = 0;
//   }
//
//   updateData() {
//     this.data.push({
//       input: {
//         ballYPos: this.ball.yPos(),
//         paddleYPos: this.posY()
//       },
//       output: {
//         score: 0.5
//       }
//     });
//   }
//
//   checkPoints() {
//
//     const data = JSON.parse(window.localStorage.trainingData);
//     if (this.points > this.oppPoints) {
//       this.data[0].output.score = 1;
//     } else {
//       this.data[0].output.score = 0;
//     }
//
//     this.points = 0;
//     this.oppPoints = 0;
//     data.push(this.data[0]);
//
//     window.localStorage.trainingData = JSON.stringify(data);
//     this.data = [];
//   }
//
//   areThereAnyScores() {
//     if (this.points < this.game.player1 || this.oppPoints < this.game.player2) {
//       this.points = this.game.player1;
//       this.oppPoints = this.game.player2;
//       return true;
//     }
//     return false;
//   }
//
//   defend() {
//     if (this.game.gameOngoing) {
//       if (this.areThereAnyScores()) {
//         this.updateData();
//         this.checkPoints();
//       }
//     }
//
//     this.predictPaddlePosition();
//   }
//
//   predictPaddlePosition() {
//     const data = JSON.parse(window.localStorage.trainingData);
//     if (!data.length) {
//       return;
//     }
//
//     this.brain.train(data);
//     const results = [];
//     MAP.map(el => {
//       const input = {
//         ballYPos: this.ball.yPos(),
//         paddleYPos: this.pos[1] + el
//       };
//
//       const move = this.brain.run(input);
//       results.push(move.score);
//     });
//
//     if (results[0] >= results[1]) {
//       if (this.posY() < this.paddleBounds(this.dimY)) {
//         this.pos[1] += 10;
//       }
//     } else {
//       if (this.posY() > 0) {
//         this.pos[1] -= 10;
//       }
//     }
//   }
//
// }
//
// const MAP = [10, -10];
//
// module.exports = LearnBotChan;
