var Marty = require('marty');
var Immutable = require('immutable');

var IDsStorage = Marty.createStateSource({
	type: 'localStorage',
	namespace: 'ids',
	getLastID: function(namespace) {
		return this.get('lastID'+namespace);
	},
	generateID: function(namespace) {
		var last = this.get('lastID'+namespace);
		if (last === undefined) {
			this.set('lastID'+namespace, '0');
			return '0';
		} else {
			last = (+last + 1).toString();
			this.set('lastID'+namespace, last);
			return last;
		}
	}
});

module.exports = IDsStorage;