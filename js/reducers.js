import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

var initialState = Immutable.fromJS({
    projects: []
});

var knitcount = function (state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    return state;
};

var reducer = combineReducers({
    router: routerStateReducer,
    knitcount
});

export { reducer };
