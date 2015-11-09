import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { List } from 'immutable';

var ProjectList = React.createClass({
    displayName: 'ProjectList',

	getInitialState: function() {
		return {
			  showCreateForm: false
		};
	},

	render: function() {
		return (
			<div>
				<h1>Projects</h1>
				{this.props.projects.count() ?
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
				{this.props.projects.map(function(p) {
					return (
						<li key={p.id}>
                  <Link to={`/project/${p.id}`}>{p.name}</Link>
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
    displayName: 'ProjectCreateForm',

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

module.exports = connect((state) => { return { projects: state.projects }; })(ProjectList);
