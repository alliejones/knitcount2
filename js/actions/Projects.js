var Marty = require('marty');

var ProjectConstants = require('../constants/Projects');

var ProjectActionCreators = Marty.createActionCreators({
	addProject: ProjectConstants.ADD_PROJECT(function (id, data) {
		this.dispatch(id, data);
	})
});

module.exports = ProjectActionCreators;