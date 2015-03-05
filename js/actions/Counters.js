var Marty = require('marty');

var CounterConstants = require('../constants/Counters');

var CounterActionCreators = Marty.createActionCreators({
	createCounter: CounterConstants.CREATE_COUNTER(),
	incCounter: CounterConstants.INC_COUNTER(),
	decCounter: CounterConstants.DEC_COUNTER()
});

module.exports = CounterActionCreators;