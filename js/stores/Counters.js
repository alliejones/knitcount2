var Marty = require('marty');
var Immutable = require('immutable');

var CounterConstants = require('../constants/Counters');

var CountersStore = Marty.createStore({
  displayName: 'Counters',
  handlers: {
    createCounter: CounterConstants.CREATE_COUNTER,
    incCounter: CounterConstants.INC_COUNTER,
    decCounter: CounterConstants.DEC_COUNTER
  },
  getInitialState: function() {
    return Immutable.fromJS({
      '1': {
        id: '1',
        projectID: '1',
        name: 'A counter',
        value: 0,
        maxValue: null
      },
      '2': {
        id: '2',
        projectID: '1',
        name: 'Another counter',
        value: 2,
        maxValue: 10
      },
      '3': {
        id: '3',
        projectID: '2',
        name: 'Test counter',
        value: 11,
        maxValue: null
      }
    });
  },

  getAll: function() {
    return this.state;
  },

  getByProjectID: function (id) {
    return this.state.filter(c => c.get('projectID') === id);
  },

  createCounter: function (counter) {
    this.state[counter.id] = counter;
    this.hasChanged();
  },

  incCounter: function (counterID) {
    this.setState(this.state.updateIn([counterID, 'value'], v => v + 1));
  },

  decCounter: function (counterID) {
    this.setState(this.state.updateIn([counterID, 'value'], v => v - 1));
  }
});

module.exports = CountersStore;