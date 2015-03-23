var Marty = require('marty');
var Immutable = require('immutable');

var ProjectConstants = require('../constants/Projects');
var ProjectSource = require('../sources/Projects');

var ProjectsStore = Marty.createStore({
  displayName: 'Projects',
  handlers: {
    createProject: ProjectConstants.CREATE_PROJECT
  },

  getInitialState: function() {
    return ProjectSource.getAll();
  },

  getAll: function() {
    return this.state.toList();
  },

  getByID: function (id) {
    return this.state.get(id);
  },

  createProject: function (project) {
    project = ProjectSource.createProject(project);
    this.setState(this.state.set(project.id, project));
  },

  updateProject: function (project) {
    this.setState(this.state.set(project.id, project));
    ProjectSource.updateProject(project);
  },
});

module.exports = ProjectsStore;