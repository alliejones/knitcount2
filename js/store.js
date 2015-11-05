import { createStore } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';

import { routes } from './routes';
import { reducer } from './reducers';

var store = reduxReactRouter({
    routes,
    createHistory
})(createStore)(reducer);

export { store };
