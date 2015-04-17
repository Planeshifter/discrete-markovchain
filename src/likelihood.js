'use strict';

const _ = require( 'lodash' );

function logLikelihood( run, order = 1 ) {

	var pMat = require( './fit.js' )( run, order );
	var logLik = run.realizations.map( () => 0 );

	run.realizations.forEach( (vec, realizationNo) => {
		for ( let i = 1; i < vec.length; i++ ) {

			var summand;
			switch ( order ) {
				case 1:
					summand = Math.log( pMat[ vec[i - 1] ][ vec[i] ] );
				break;
				case 2:
					summand = Math.log( pMat[ vec[i-2] ][ vec[i - 1] ][ vec[i] ] );
				break;
			}

			logLik[ realizationNo ] += summand;
		}
	} );

	return logLik;
}

module.exports = exports = logLikelihood;
