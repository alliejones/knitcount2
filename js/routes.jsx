import React from 'react';
import { Route, IndexRoute } from 'react-router';

import ProjectList from './components/ProjectList';
import ProjectView from './components/ProjectView';

var App = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectList} />
    <Route path="/project/:id" component={ProjectView} />
  </Route>
);

export { routes };
