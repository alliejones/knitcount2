import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Counter from './counter';

var ProjectView = React.createClass({
  displayName: 'ProjectView',

	mixins: [ LinkedStateMixin ],

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
				<h1>Project: {this.props.project.name}</h1>
				<div>
					<ul>
						{this.props.counters.map(c => {
							  return <Counter key={c.id}
                                counter={c}
                                inc={this.props.incCounter}
                                dec={this.props.decCounter} />;
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

      this.props.dispatch({
        type: 'CREATE_COUNTER',
        payload: {
          projectID: +this.props.params.id,
          name: this.state.counterName
        }
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

var mapStateToProps = function(state) {
  var projectID = +state.router.params.id;
  return {
    project: state.projects.get(projectID),
    counters: state.counters.filter(c => c.projectID === projectID)
  };
};

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators({
    incCounter: function(counterID) {
      return {
        type: 'INC_COUNTER',
        payload: { counterID }
      };
    },
    decCounter: function(counterID) {
      return {
        type: 'DEC_COUNTER',
        payload: { counterID }
      };
    }
  }, dispatch);
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ProjectView);