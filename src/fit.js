'use strict';

const _ = require( 'lodash' );

function fit( run, order = 1 ) {

	var counts = [];
	var nStates = _.unique( run.realizations[0] ).length;

	switch ( order ) {
		case 1:
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

		break;
		case 2:

			for ( let i = 0; i < nStates; i++ ) {
				counts.push( new Array(nStates) );
				for ( let j = 0; j < nStates; j++ ) {
					counts[i].push( new Array(nStates) );
					for ( let k = 0; k < nStates; k++ ) {
						counts[i][j][k] = 0;
					}
				}
			}

			run.realizations.forEach( vec => {
				for ( let i = 1; i < vec.length; i++ ) {
					counts[ vec[i-2] ][ vec[i - 1] ][ vec[i] ] += 1;
				}
			} );

			// normalize

			for ( let i = 0; i < nStates; i++ ) {
				let norm_constant = counts[i]
					.reduce( (a, b) => a + b )
					.reduce( (a, b) => a + b );
				for ( let j = 0; j < nStates; j++ ) {
					counts[i][j] = counts[i][j].map( (e) => e / norm_constant );
				}
			}

		break;
	}

  return counts;

}

module.exports = exports = fit;
