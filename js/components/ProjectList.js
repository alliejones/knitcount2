var Marty = require('marty');
var React = require('react/addons');
var Router = require('react-router');

var ProjectActions = require('../actions/Projects');
var ProjectsStore = require('../stores/Projects');

var Link = require('react-router').Link;

var ProjectListState = Marty.createStateMixin({
	listenTo: [ ProjectsStore ],
	getState: function () {
		return {
			projects: ProjectsStore.getAll()
		};
	}
});

var ProjectList = React.createClass({
	mixins: [ ProjectListState ],

	getInitialState: function() {
		return {
			showCreateForm: false
		};
	},

	render: function() {
		return (
			<div>
				<h1>Projects</h1>
				{this.state.projects.count() ?
					this.renderProjectList() : this.renderEmptyMessage()}	
				{this.renderCreateForm()}
			</div>
		);
	},

	renderEmptyMessage: function() {
		return <p>No projects yet!</p>;
	},

	renderProjectList: function() {
		return (
			<ul>
				{this.state.projects.map(function(p) {
					return (
						<li key={p.id}>
							<Link to="project"
								params={{projectID: p.id }}>
								{p.name}
							</Link>
						</li>
					);
				})}
			</ul>
		);
	},

	renderCreateForm: function() {
		if (this.state.showCreateForm) {
			return <ProjectCreateForm close={this.hideCreateForm} />;
		} else {
			return <button onClick={this.showCreateForm}>New Project</button>;
		}
	},

	showCreateForm: function() {
		this.setState({ showCreateForm: true });
	},

	hideCreateForm: function() {
		this.setState({ showCreateForm: false });
	}
});

var ProjectCreateForm = React.createClass({
	mixins: [ React.addons.LinkedStateMixin, Router.Navigation ],

	getInitialState: function() {
		return {
			projectName: null
		};
	},

	render: function() {
		return (
			<div>
				<h1>Create a New Project</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name
						<input type="text" valueLink={this.linkState('projectName')}/>
					</label>
					<input type="submit"/>
				</form>
				<button onClick={this.props.close}>Cancel</button>
			</div>
		);
	},

	handleSubmit: function(e) {
		e.preventDefault();
		ProjectActions.createProject({ name: this.state.projectName });
		this.props.close();
	}
});

module.exports = ProjectList;