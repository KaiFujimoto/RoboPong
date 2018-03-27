import * as dl from 'deeplearn';
/**
 * We want to learn the coefficients that give correct solutions to the
 * following quadratic equation:
 *      y = a * x^2 + b * x + c
 * In other words we want to learn values for:
 *      a
 *      b
 *      c
 * Such that this function produces 'desired outputs' for y when provided
 * with x. We will provide some examples of xs and ys to allow this model
 * to learn what we mean by desired outputs and then use it to produce new
 * values of y that fit the curve implied by our example.
 */


 // Step 1. Set up variables, these are the things we want the model
 // to learn in order to do prediction accurately. We will initialize
 // them with random values.
 const a = dl.variable(dl.scalar(Math.random()));
 const b = dl.variable(dl.scalar(Math.random()));
 const c = dl.variable(dl.scalar(Math.random()));

 // Step 2. Create an optimizer, we will use this later
const learningRate = 0.01;
const optimizer = dl.train.sgd(learningRate);
