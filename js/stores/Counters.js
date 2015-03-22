var Marty = require('marty');
var Immutable = require('immutable');

var CounterConstants = require('../constants/Counters');
var CounterSource = require('../sources/Counters');

var CountersStore = Marty.createStore({
	displayName: 'Counters',
	handlers: {
		createCounter: CounterConstants.CREATE_COUNTER,
		incCounter: CounterConstants.INC_COUNTER,
		decCounter: CounterConstants.DEC_COUNTER
	},
	getInitialState: function() {
		return CounterSource.getAll();
	},

	getAll: function() {
		return this.state;
	},

	getByProjectID: function (id) {
		return this.state.filter(c => c.get('projectID') === id);
	},

	createCounter: function (counter) {
		counter = CounterSource.createCounter(counter);
		this.setState(this.state.set(counter.get('id'), counter));
	},

	incCounter: function (counterID) {
		var counter = this.state.get(counterID);
		var value = counter.get('value');
		var maxValue = counter.get('maxValue', false) || Infinity;

		if (value < maxValue) {
			var newState = this.state.updateIn([counterID, 'value'], v => v + 1);
			this.setState(newState);
			CounterSource.updateCounter(newState.get(counterID));
		}
	},

	decCounter: function (counterID) {
		var value = this.state.getIn([counterID, 'value']);
		if (value === 0) return;

		var newState = this.state.updateIn([counterID, 'value'], v => v - 1);
		this.setState(newState);
		CounterSource.updateCounter(newState.get(counterID));
	},

	_getID: function() {
		return (this.state.count() + 1).toString();
	}
});

module.exports = CountersStore;