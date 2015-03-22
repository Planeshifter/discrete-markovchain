"use strict";

var _ = require("lodash");

function DiscreteTimeMarkovChain(transMatrix) {

  this.transitionMatrix = transMatrix;
}

DiscreteTimeMarkovChain.prototype.run = function (start, steps) {
  var options = arguments[2] === undefined ? {
    replications: 1,
    keep: undefined
  } : arguments[2];

  var run = {
    start: start,
    steps: steps,
    keptIndices: options.keep,
    realizations: []
  };

  for (var i = 0; i < options.replications; i++) {

    var stateVector = [start];
    var stateRow = this.transitionMatrix[start];
    var U = undefined;

    for (var j = 0; j < steps; j++) {
      U = Math.random();
      var sum = 0;
      for (var k = 0; k < stateRow.length; k++) {
        sum += stateRow[k];
        if (sum > U) {
          stateVector.push(k);
          stateRow = this.transitionMatrix[k];
          k = stateRow.length;
        }
      }
    }

    if (options.keep) {
      run.realizations.push(_.at(stateVector, options.keep));
    } else {
      run.realizations.push(stateVector);
    }
  }

  return run;
};

module.exports = exports = DiscreteTimeMarkovChain;