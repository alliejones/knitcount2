var Marty = require('marty');
var Immutable = require('immutable');

var IDsSource = require('../sources/IDs');

var Counter = require('../utl/records').Counter;

var CountersStorage = Marty.createStateSource({
	type: 'localStorage',
	namespace: 'counters',
	createCounter: function (counter) {
		counter.id = IDsSource.generateID('counters');	
	    counter = new Counter(counter);
		this.set(counter.id, JSON.stringify(counter));
		return counter;
	},
	updateCounter: function(counter) {
		this.set(counter.id, JSON.stringify(counter));
	},
	getAll: function() {
		var all = new Immutable.Map();
		for (var k in localStorage) {
			if (localStorage.hasOwnProperty(k)) {
				if (k.indexOf(this.namespace) === 0) {
					var v = JSON.parse(localStorage[k]);
					all = all.set(v.id, new Counter(v));
				}
			}
		}
		return all;
	}
});

module.exports = CountersStorage;