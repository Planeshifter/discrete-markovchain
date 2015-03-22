"use strict";

var _ = require("lodash");

function fit(run) {

  var counts = [];
  var nStates = _.unique(run.realizations[0]).length;
  for (var i = 0; i < nStates; i++) {
    counts.push(new Array(nStates));
    for (var j = 0; j < nStates; j++) {
      counts[i][j] = 0;
    }
  }

  run.realizations.forEach(function (vec) {
    for (var i = 1; i < vec.length; i++) {
      counts[vec[i - 1]][vec[i]] += 1;
    }
  });

  // normalize

  for (var i = 0; i < nStates; i++) {
    (function (i) {
      var row_sum = counts[i].reduce(function (a, b) {
        return a + b;
      });
      counts[i] = counts[i].map(function (e) {
        return e / row_sum;
      });
    })(i);
  }

  return counts;
}

module.exports = exports = fit;