'use strict';

const _ = require( 'lodash' );

function fit( run ) {

  var counts = [];
  var nStates = _.unique( run.realizations[0] ).length;
  for ( let i = 0; i < nStates; i++ ) {
    counts.push( new Array(nStates) );
    for ( let j = 0; j < nStates; j++ ) {
      counts[i][j] = 0;
    }
  }

  run.realizations.forEach( vec => {
    for ( let i = 1; i < vec.length; i++ ) {
      counts[ vec[i - 1] ][ vec[i] ] += 1;
    }
  } );

  // normalize

  for ( let i = 0; i < nStates; i++ ) {
    let row_sum = counts[i].reduce( (a, b) => a + b );
    counts[i] = counts[i].map( (e) => e / row_sum );
  }

  return counts;

}

module.exports = exports = fit;
