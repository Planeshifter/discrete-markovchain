'use strict';

const _ = require( 'lodash' );
const logLikelihood = require( './likelihood' );
const chisq = require('jStat').jStat.chisquare;

function lrt( run ) {

	let result = run.realizations.map( (vec, realizationNo) => {

		let l1 = logLikelihood( vec, 1 );
		let l2 = logLikelihood( vec, 2 );
		let T = 2 * ( l2 - l1 );

		let nStates = _.unique( vec ).length;
		let df = ( nStates * nStates * ( nStates - 1 ) ) - ( nStates * ( nStates - 1 ) );

		let pvalue = 1 - chisq.cdf( T, df );

		return {
			'run': realizationNo,
			'T': T,
			'df': df,
			'pvalue': pvalue
		};
	});

	return result;
}

module.exports = exports = lrt;
