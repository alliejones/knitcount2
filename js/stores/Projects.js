var Marty = require('marty');
var Immutable = require('immutable');

var ProjectConstants = require('../constants/Projects');
var ProjectSource = require('../sources/Projects');
var IDsSource = require('../sources/IDs');

var ProjectsStore = Marty.createStore({
  displayName: 'Projects',
  handlers: {
    createProject: ProjectConstants.CREATE_PROJECT
  },

  getInitialState: function() {
    return ProjectSource.getAll();
  },

  getAll: function() {
    return this.state;
  },

  getByID: function (id) {
    return this.state.get(id);
  },

  createProject: function (project) {
    project.id = IDsSource.generateID('projects');
    ProjectSource.createProject(project);
    this.setState(this.state.set(project.id, Immutable.fromJS(project)));
  },

  _getID: function() {
    return ProjectSource.generateID();
  }
});

module.exports = ProjectsStore;