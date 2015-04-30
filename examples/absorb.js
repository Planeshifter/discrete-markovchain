'use strict';

var markov = require("../lib/");

var transMatrix = [
  [0.1, 0.4, 0.5],
  [0, 1, 0],
  [0.1, 0.4, 0.5]
];

var dtmc = new markov.DTMC(transMatrix, ["0","1","2"]);

console.log( dtmc.absorbingStates );

console.log( dtmc.communicatingClasses() );
