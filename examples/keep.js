'use strict';

var markov = require( '../lib/' );
var _      = require( 'lodash' );

var transMatrix = [
  [0.1, 0.4, 0.5],
  [0.5, 0.5, 0],
  [0.1, 0.4, 0.5]
];

var dtmc = new markov.DTMC(transMatrix);


console.log('When initital state is 0:');

var myRun = dtmc.run(0, 100, {
  'keep': [1, 80, 100],
  'replications':1000
});

function calculateProportionsForIndex(run, index){

  var counts = {};
  counts["0"] = myRun.realizations.filter(function(e) {
      return e[index] === 0;
  }).length;
  counts["1"] = myRun.realizations.filter(function(e) {
      return e[index] === 1;
  }).length;
  counts["2"] = myRun.realizations.filter(function(e) {
      return e[index] === 2;
  }).length;

  return _.map(counts, function(e) {
    var o = {};
    o.val = e / 1000;
    o.sd = Math.sqrt( o.val * (1 - o.val) / 1000 );
    return o;
  });

}

var tableStep1 = calculateProportionsForIndex( myRun, 0 );
var tableStep80 = calculateProportionsForIndex( myRun, 1);
var tableStep100 = calculateProportionsForIndex( myRun, 2 );

console.log( tableStep1 );
console.log( tableStep80 );
console.log( tableStep100 );

console.log('When initital state is 1:');

var myRun = dtmc.run(1, 100, {
  'keep': [1, 80, 100],
  'replications':1000
});

var tableStep1 = calculateProportionsForIndex( myRun, 0 );
var tableStep80 = calculateProportionsForIndex( myRun, 1 );
var tableStep100 = calculateProportionsForIndex (myRun, 2 );

console.log( tableStep1 );
console.log( tableStep80 );
console.log( tableStep100 );

console.log('When initital state is 2:');

var myRun = dtmc.run(2, 100, {
  'keep': [1, 80, 100],
  'replications':1000
});

var tableStep1 = calculateProportionsForIndex( myRun, 0 );
var tableStep80 = calculateProportionsForIndex( myRun, 1 );
var tableStep100 = calculateProportionsForIndex( myRun, 2 );

console.log( tableStep1 );
console.log( tableStep80 );
console.log( tableStep100 );
