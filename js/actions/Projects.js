var Marty = require('marty');

var ProjectConstants = require('../constants/Projects');

var ProjectActionCreators = Marty.createActionCreators({
	addProject: ProjectConstants.ADD_PROJECT()
});

module.exports = ProjectActionCreators;