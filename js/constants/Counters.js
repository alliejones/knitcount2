var Marty = require('marty');

var CounterConstants = Marty.createConstants([
	'CREATE_COUNTER',
	
	'INC_COUNTER',
	'DEC_COUNTER'
]);

module.exports = CounterConstants;