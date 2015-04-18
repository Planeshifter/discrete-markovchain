'use strict';

var markov = require("../lib/");

var transMatrix = [
  [0.1, 0.4, 0.5],
  [0.5, 0.5, 0],
  [0.1, 0.4, 0.5]
];

var dtmc = new markov.DTMC(transMatrix);

var vec = dtmc.run(0, 1000, {'replications':1});

console.log( vec );

console.log( markov.logLik( vec, 1 ) );

console.log( markov.logLik( vec, 2 ) );

console.log( markov.lrt( vec ) );

var transMatrix20 = dtmc.getTransitionMatrix( 20 );

console.log( transMatrix20 );
