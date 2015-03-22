'use strict';

const _ = require( 'lodash' );

function DiscreteTimeMarkovChain( transMatrix ) {

  this.transitionMatrix = transMatrix;

}

DiscreteTimeMarkovChain.prototype.run = function( start, steps, options = {
  'replications': 1,
  'keep': undefined
} ) {

  var run = {
    'start': start,
    'steps': steps,
    'keptIndices': options.keep,
    'realizations': []
  };

  for ( let i = 0; i < options.replications; i++ ) {

    let resVector = [ start ];
    let stateRow = this.transitionMatrix[ start ];
    let U;

    for ( let j=0; j < steps; j++ ) {
      U = Math.random();
      var sum = 0;
      for( let k=0; k < stateRow.length; k++ ) {
        sum += stateRow[ k ];
        if ( sum > U ) {
          resVector.push( k );
          stateRow = this.transitionMatrix[ k ];
          k = stateRow.length;
        }
      }
    }

    if ( options.keep ) {
      run.realizations.push( _.at(resVector, options.keep) );
    } else {
      run.realizations.push( resVector );
    }

  }

  return run;

};

module.exports = exports = DiscreteTimeMarkovChain;
