'use strict';

const _ = require( 'lodash' );

function fit( run, order = 1 ) {

	var counts = [];
	var nStates;

	if ( Array.isArray( run ) === true ) {
		nStates = _.unique( run ).length;
		switch ( order ) {
			case 1:
				for ( let i = 0; i < nStates; i++ ) {
					counts.push( new Array(nStates) );
					for ( let j = 0; j < nStates; j++ ) {
						counts[i][j] = 0;
					}
				}

				for ( let i = 1; i < run.length; i++ ) {
					counts[ run[i - 1] ][ run[i] ] += 1;
				}
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
						counts[i][j] = new Array(nStates) ;
						for ( let k = 0; k < nStates; k++ ) {
							counts[i][j][k] = 0;
						}
					}
				}

				for ( let i = 2; i < run.length; i++ ) {
					counts[ run[i-2] ][ run[i - 1] ][ run[i] ] += 1;
				}

				// normalize
				for ( let i = 0; i < nStates; i++ ) {
					for ( let j = 0; j < nStates; j++ ) {
						let norm_constant = counts[i][j]
							.reduce( (a, b) => a + b );
						counts[i][j] = counts[i][j].map( (e) => e / norm_constant );
					}
				}

			break;
		}
	} else {
		nStates = _.unique( run.realizations[0] ).length;
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
						counts[i][j] = new Array(nStates) ;
						for ( let k = 0; k < nStates; k++ ) {
							counts[i][j][k] = 0;
						}
					}
				}

				run.realizations.forEach( vec => {
					for ( let i = 2; i < vec.length; i++ ) {
						counts[ vec[i-2] ][ vec[i - 1] ][ vec[i] ] += 1;
					}
				} );

				// normalize

				for ( let i = 0; i < nStates; i++ ) {
					for ( let j = 0; j < nStates; j++ ) {
						let norm_constant = counts[i][j]
							.reduce( (a, b) => a + b );
						counts[i][j] = counts[i][j].map( (e) => e / norm_constant );
					}
				}

			break;
		}
	}

  return counts;

}

module.exports = exports = fit;
