import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, RouteHandler } from 'react-router';
import { Provider, connect } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import { store } from './store';
import routes from './routes';

import '../css/style.scss';

var history = createBrowserHistory();

var Root = React.createClass({
  displayName: 'Root',

  render() {
    return (
      <div>
        <Provider store={store}>
          <ReduxRouter>{routes}</ReduxRouter>
        </Provider>
      </div>
    );
  }
});


ReactDOM.render(<Root/>, document.getElementById('react'));
