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
    counter.id = this._getID();
    var defaultCounter = new Immutable.Map({
      id: null,
      projectID: null,
      name: null,
      value: 0,
      maxValue: null
    });
    counter = defaultCounter.merge(Immutable.fromJS(counter));
    this.setState(this.state.set(counter.get('id'), counter));
  },

  incCounter: function (counterID) {
    var value = this.state.getIn([counterID, 'value']);
    var maxValue = this.state.getIn([counterID, 'maxValue'], false) || Infinity;
    if (value < maxValue) {
      this.setState(this.state.updateIn([counterID, 'value'], v => v + 1));
    }
  },

  decCounter: function (counterID) {
    var value = this.state.getIn([counterID, 'value']);
    if (value === 0) return;
    this.setState(this.state.updateIn([counterID, 'value'], v => v - 1));
  },

  _getID: function() {
    return (this.state.count() + 1).toString();
  }
});

module.exports = CountersStore;