var Marty = require('marty');

var ProjectsStorage = Marty.createStateSource({
	type: 'localStorage',
	saveProjects: function (projects) {
		this.set('projects', projects);
	},
	getProjects: function (projects) {
		this.get('projects');
	}
});

module.exports = ProjectsStorage;