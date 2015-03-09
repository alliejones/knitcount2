var Marty = require('marty');

var ProjectConstants = require('../constants/Projects');

var ProjectActionCreators = Marty.createActionCreators({
	createProject: ProjectConstants.CREATE_PROJECT()
});

module.exports = ProjectActionCreators;