var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({  
	render: function() {
		return (
			<div>
				<RouteHandler/>
			</div>
		);
	}
});

var ProjectList = require('./components/ProjectList');
var ProjectView = require('./components/ProjectView');

var routes = (  
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={ProjectList} />	
		<Route name="project" path="/project/:projectID" handler={ProjectView}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {  
	React.render(<Handler/>, document.getElementById('react'));
});