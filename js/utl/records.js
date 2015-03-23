var Immutable = require('immutable');

module.exports.Project = Immutable.Record({
	id: null,
	name: null
});

module.exports.Counter = Immutable.Record({
	id: null,
	projectID: null,
	name: null,
	value: 0,
	maxValue: null
});