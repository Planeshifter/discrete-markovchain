'use strict';

const logLikelihood = require( './likelihood' );

function lrt( run ) {

	let result = run.realizations.map( (vec, realizationNo) => {

		let l1 = logLikelihood( vec, 1 );
		let l2 = logLikelihood( vec, 2 );
		let T = 2 * ( l2 - l1 );

		return {
			'run': realizationNo,
			'T': T
		};
	});

	return result;
}

module.exports = exports = lrt;
