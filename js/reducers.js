import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import { Project, Counter } from './records';

var initialProjects = Immutable.fromJS([
  new Project({
    id: 0,
    name: 'Sweater'
  }),
  new Project({
    id: 1,
    name: 'Hat'
  }),
  new Project({
    id: 2,
    name: 'Blanket'
  })
]);


var initialCounters = Immutable.fromJS([
  new Counter({
    id: 0,
    projectID: 0,
    name: 'Rows',
    value: 10,
    maxValue: null
  }),
  new Counter({
    id: 1,
    projectID: 0,
    name: 'Decreases',
    value: 0,
    maxValue: null
  }),
  new Counter({
    id: 2,
    projectID: 1,
    name: 'Stripes',
    value: 6,
    maxValue: null
  }),
  new Counter({
    id: 3,
    projectID: 2,
    name: 'Squares',
    value: 0,
    maxValue: null
  })
]);

var projects = function (state = initialProjects, action) {
  switch (action.type) {
  case 'CREATE_PROJECT':
    state = state.set(state.size, new Project({
      id: state.size,
      name: action.payload.project.name
    }));
    break;
  }
  return state;
};

var counters = function (state = initialCounters, action) {
  var counter;
  switch (action.type) {
  case 'INC_COUNTER':
    counter = state.get(action.payload.counterID);
    if (counter.value === counter.maxValue) {
      state = state.set(counter.id, state.get(counter.id).merge({
        value: 1,
        rolloverCount: counter.rolloverCount + 1
      }));
    } else {
      state = state.updateIn([counter.id, 'value'], v => v + 1);
    }
    break;

  case 'DEC_COUNTER':
    if (state.getIn([action.payload.counterID, 'value']) > 0)
      state = state.updateIn([action.payload.counterID, 'value'], v => v - 1);
    break;

  case 'CREATE_COUNTER':
    counter = action.payload.counter;
    state = state.set(state.size, new Counter({
      id: state.size,
      projectID: counter.projectID,
      name: counter.name,
      value: 0,
      maxValue: counter.maxValue,
      countRollovers: counter.countRollovers,
      rolloverCount: counter.countRollovers ? 0 : null
    }));
    break;
  }

  return state;
};

var reducer = combineReducers({
  router: routerStateReducer,
  projects,
  counters
});

export { reducer };
