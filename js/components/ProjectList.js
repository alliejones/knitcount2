import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import { Project } from '../utl/records';
import { List } from 'immutable';

var ProjectList = React.createClass({

	getInitialState: function() {
		return {
			  showCreateForm: false,
        projects: new List()
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
	mixins: [ LinkedStateMixin ],

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
