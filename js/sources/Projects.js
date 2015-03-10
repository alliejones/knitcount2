var Marty = require('marty');
var Immutable = require('immutable');

var ProjectsStorage = Marty.createStateSource({
	type: 'localStorage',
	namespace: 'projects',
	createProject: function (project) {
		this.set(project.id, JSON.stringify(project));
	},
	getAll: function() {
		var all = new Immutable.Map();
		for (var k in localStorage) {
			if (localStorage.hasOwnProperty(k)) {
				if (k.indexOf(this.namespace) === 0) {
					var v = JSON.parse(localStorage[k]);
					all = all.set(v.id, Immutable.fromJS(v));
				}
			}
		}
		return all;
	},
	getProject: function (projectID) {
		this.get(projectID);
	}
});

module.exports = ProjectsStorage;