'use strict';

var markov = require("../lib/");

var transMatrix = [
  [0.5, 0.4, 0.1],
  [0.2, 0.5, 0.3],
  [0.1, 0.2, 0.7]
];

var states = ["early", "on-time", "late"];


var dtmc = new markov.DTMC(transMatrix, states);


console.log( dtmc.states );
