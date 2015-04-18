'use strict';

const _ = require( 'lodash' );

function logLikelihood( run, order = 1 ) {
	var logLik;
	var pMat = require( './fit.js' )( run, order );

	if ( Array.isArray( run ) === true ) {
		logLik = 0;
		switch ( order ) {
			case 1:
				for ( let i = 1; i < run.length; i++ ) {
					let summand = Math.log( pMat[ run[i - 1] ][ run[i] ] );
					logLik += summand;
				}
			break;
			case 2:
				for ( let i = 2; i < run.length; i++ ) {
					let summand = Math.log( pMat[ run[i-2] ][ run[i - 1] ][ run[i] ] );
					logLik += summand;
				}
			break;
		}
	} else {
		logLik = run.realizations.map( () => 0 );
		run.realizations.forEach( (vec, realizationNo) => {
			switch ( order ) {
				case 1:
					for ( let i = 1; i < vec.length; i++ ) {
						let summand = Math.log( pMat[ vec[i - 1] ][ vec[i] ] );
						logLik[ realizationNo ] += summand;
					}
				break;
				case 2:
					for ( let i = 2; i < vec.length; i++ ) {
						let summand = Math.log( pMat[ vec[i-2] ][ vec[i - 1] ][ vec[i] ] );
						logLik[ realizationNo ] += summand;
					}
				break;
			}
		} );
	}

	return logLik;
}

module.exports = exports = logLikelihood;
