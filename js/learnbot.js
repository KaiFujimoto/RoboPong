const Paddle = require('/paddle_main');
const brain = require('brain.js');


// so basically the machine learning guy (just taking a step back) is just a freakin paddle
// and this paddle like learns to move with the stuff and not lose

// need a way to punish bot chan for losing and reward bot chan for winning?
// where would i keep that stat?
// need a picture of the whole board somehow and the whole game or something
// WTFFFFFF :(

// i need a live update thing

class LearnBotChan extends Paddle {
  constructor(hit = 1, miss = -5) {
    super();
    this.brain = new brain.NeuralNetwork();
    this.data = [{
        input: {
           predicted_pos: 350,
           padd_y_pos: 250
         },
        output: {
           down: 1
         }
       },
       {
         input: {
           predicted_pos: 150,
           padd_y_pos: 250
         },
         output: {
           up: 1
         }
       }
    ];
// i need data on the game, the ball position
  }

  training() {
    this.brain.train(this.data);
  }


}
