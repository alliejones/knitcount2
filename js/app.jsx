import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, RouteHandler } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import { store } from './store';
import routes from './routes';

console.log(store);

var history = createBrowserHistory();

var Root = React.createClass({
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
