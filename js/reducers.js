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
    return state;
};

var counters = function (state = initialCounters, action) {
    return state;
};

var reducer = combineReducers({
    router: routerStateReducer,
    projects,
    counters
});

export { reducer };
