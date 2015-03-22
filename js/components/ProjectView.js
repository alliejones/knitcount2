var Marty = require('marty');
var React = require('react/addons');
var Router = require('react-router');

var ProjectStore = require('../stores/Projects');
var CounterStore = require('../stores/Counters');
var CounterActions = require('../actions/Counters');

var Link = Router.Link;
var Counter = require('./Counter');

var ProjectState = Marty.createStateMixin({
	listenTo: [ ProjectStore, CounterStore ],
	getState: function () {
		var projectID = this.props.params.projectID;
		return {
			project: ProjectStore.getByID(projectID),
			counters: CounterStore.getByProjectID(projectID)
		};
	}
});

var ProjectView = React.createClass({
	mixins: [ React.addons.LinkedStateMixin, ProjectState ],

	getInitialState: function() {
		return {
			showCreateForm: false,
			counterName: null
		};
	},

	render: function() {
		return (
			<div>
				<Link to="/">back to project list</Link>
				<h1>Project: {this.state.project.name}</h1>
				<div>
					<ul>
						{this.state.counters.map(function (c) {
							return <Counter key={c.id} counter={c} />; 
						})}
					</ul>
					{this.renderCreateForm()}
				</div>
			</div>
		);
	},

	renderCreateForm: function() {
		if (!this.state.showCreateForm) {
			return <button onClick={this.showCreateForm}>New counter</button>;
		}

		return (
			<div>
				<h2>Add a new counter</h2>
				<form onSubmit={this.createCounter}>
					<label>
						Name
						<input type="text" valueLink={this.linkState('counterName')}/>
					</label>
					<input type="submit"/>
				</form>
				<button onClick={this.hideCreateForm}>Cancel</button>
			</div>
		);
	},

	createCounter: function(e) {
		e.preventDefault();
		CounterActions.createCounter({
			name: this.state.counterName,
			projectID: this.state.project.id
		});
		this.setState({
			counterName: null,
			showCreateForm: false
		});
	},

	showCreateForm: function() {
		this.setState({ showCreateForm: true });
	},

	hideCreateForm: function() {
		this.setState({ showCreateForm: false });
	}
});

module.exports = ProjectView;