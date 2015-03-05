var Marty = require('marty');

var ProjectConstants = require('../constants/Projects');

var ProjectsStore = Marty.createStore({
  displayName: 'Projects',
  handlers: {
    createProject: ProjectConstants.CREATE_PROJECT
  },
  getInitialState: function() {
    return {
      1: {
        id: 1,
        name: 'Test Project'
      },
      2: {
        id: 2,
        name: 'A different test project'
      }
    };
  },

  getAll: function() {
    return this.state;
  },

  getByID: function (id) {
    return this.state[id];
  },

  createProject: function (project) {
    this.state[project.id] = project;
    this.hasChanged();
  }
});

module.exports = ProjectsStore;