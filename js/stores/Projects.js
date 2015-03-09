var Marty = require('marty');
var Immutable = require('immutable');

var ProjectConstants = require('../constants/Projects');

var ProjectsStore = Marty.createStore({
  displayName: 'Projects',
  handlers: {
    createProject: ProjectConstants.CREATE_PROJECT
  },
  getInitialState: function() {
    return Immutable.fromJS({
      '1': {
        id: '1',
        name: 'Test Project'
      },
      '2': {
        id: '2',
        name: 'A different test project'
      }
    });
  },

  getAll: function() {
    return this.state;
  },

  getByID: function (id) {
    return this.state.get(id);
  },

  createProject: function (project) {
    project.id = this._getID();
    this.setState(this.state.set(project.id, Immutable.fromJS(project)));
  },

  _getID: function() {
    return (this.state.count() + 1).toString();
  }
});

module.exports = ProjectsStore;