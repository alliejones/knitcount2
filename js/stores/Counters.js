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
		return this.state.toList();
	},

	getByID: function(counterID) {
		return this.state.get(counterID);
	},

	getByProjectID: function (id) {
		return this.state.filter(c => c.projectID === id).toList();
	},

	createCounter: function (counter) {
		counter = CounterSource.createCounter(counter);
		this.setState(this.state.set(counter.id, counter));
	},

	updateCounter: function (counter) {
		this.setState(this.state.set(counter.id, counter));
		CounterSource.updateCounter(counter);
	},

	incCounter: function (counterID) {
		var counter = this.getByID(counterID);
		var value = counter.get('value');
		var maxValue = counter.get('maxValue', false) || Infinity;

		if (value < maxValue) {
			this.updateCounter(counter.set('value', value + 1));	
		}
	},

	decCounter: function (counterID) {
		var counter = this.getByID(counterID);
		var value = counter.get('value');

		if (value > 0) {
			this.updateCounter(counter.set('value', value - 1));
		}
	}
});

module.exports = CountersStore;