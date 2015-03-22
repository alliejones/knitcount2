var Marty = require('marty');
var Immutable = require('immutable');

var IDsSource = require('../sources/IDs');

var Project = Immutable.Record({
	id: null,
	name: null
});

var ProjectsStorage = Marty.createStateSource({
	type: 'localStorage',
	namespace: 'projects',
	createProject: function (project) {
		project.id = IDsSource.generateID('projects');
		project = new Project(project);
		this.set(project.id, JSON.stringify(project));
		return project;
	},
	getAll: function() {
		var all = new Immutable.Map();
		for (var k in localStorage) {
			if (localStorage.hasOwnProperty(k)) {
				if (k.indexOf(this.namespace) === 0) {
					var v = JSON.parse(localStorage[k]);
					all = all.set(v.id, new Project(v));
				}
			}
		}
		return all;
	}
});

module.exports = ProjectsStorage;