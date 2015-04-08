'use strict';

const _ = require( 'lodash' );
const isSquareMatrix = require( 'validate.io-square-matrix' );

function DiscreteTimeMarkovChain( transMatrix, states ) {

    if ( isSquareMatrix(transMatrix) === false ) {
        throw new TypeError("Supplied transition matrix is not a square matrix, i.e. an array of arrays of equal length.");
    } else {
        transMatrix.forEach( (row, index) => {
            if (row.reduce( (a,b) => a + b) !== 1) {
                throw new RangeError("Elements of row" + index + " of the supplied matrix do not sum to one");
            }
        });
    }

    this.transitionMatrix = transMatrix;
    this.dim = transMatrix.length;

    this.states = null;
    if ( states !== undefined ) {
        if ( Array.isArray(states) && states.all( state => typeof state === "string" ) ) {
            this.states = states;
        } else {
            throw new TypeError("You have to supply an array of strings for the states parameter.");
        }
    }

}

DiscreteTimeMarkovChain.prototype.getTransitionMatrix = function( time ) {
    var mat = _.map( this.transitionMatrix, _.clone );
    var ret = _.map( new Array( this.dim ), () => new Array( this.dim ) );
    var sum = 0;

    for (let t = 0; t < time; t++ ) {
        for (let c = 0; c < this.dim; c++ ) {
          for (let d = 0; d < this.dim; d++ ) {
            for (let k = 0; k < this.dim; k++ ) {
              sum = sum + mat[c][k] * mat[k][d];
            }
            ret[c][d] = sum;
            sum = 0;
          }
        }


        for ( let i = 0; i < this.dim; i++ ) {
            let row_sum = ret[i].reduce( (a, b) => a + b );
            ret[i] = ret[i].map( (e) => e / row_sum );
        }

        mat = ret;
    }

    return ret;
};

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
