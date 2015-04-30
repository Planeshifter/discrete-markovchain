'use strict';

require("babel/polyfill");

module.exports = {
	'DTMC': require( './DTMC' ),
	'fit' : require( './fit' ),
	'logLik': require( './likelihood' ),
	'lrt': require( './likelihoodRatioTest' )
};
