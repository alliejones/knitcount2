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
			counterName: null,
      counterMaxValue: null,
      createRolloverCounter: null
		};
	},

	render: function() {
		return (
			<div>
				<Link to="/">back to project list</Link>
				<h1>Project: {this.props.project.name}</h1>
				<div>
          <ul className="list">
						{this.props.counters.map(c => {
               return <li className="list-item" key={c.id}>
                 <Counter
                   className="list-itemWrap"
                   counter={c}
                   inc={this.props.incCounter}
                   dec={this.props.decCounter} />
               </li>;
						})}
					</ul>
					{this.renderCreateForm()}
				</div>
			</div>
		);
	},

	renderCreateForm: function() {
		if (!this.state.showCreateForm) {
      return <button className="button" onClick={this.showCreateForm}>New counter</button>;
		}

		return (
			<div>
				<h2>Add a new counter</h2>
				<form onSubmit={this.createCounter}>
          <label for="counterName">Name</label>
          <input name="counterName" type="text" valueLink={this.linkState('counterName')}/>

          <label for="maxValue">Max value</label>
          <input name="maxValue" type="number" valueLink={this.linkState('counterMaxValue')}/>

          <label for="countRollovers">Count rollovers?</label>
          <input name="countRollovers" type="checkbox" valueLink={this.linkState('countRollovers')}/>

          <input type="submit" className="button" />
				</form>
        <button className="button" onClick={this.hideCreateForm}>Cancel</button>
			</div>
		);
	},

	createCounter: function(e) {
    e.preventDefault();

    this.props.createCounter({
      projectID: +this.props.params.id,
      name: this.state.counterName,
      maxValue: +this.state.counterMaxValue,
      countRollovers: (this.state.countRollovers === 'on')
    });

    this.setState({
      counterName: null,
      showCreateForm: false,
      maxValue: null,
      countRollovers: false
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
    createCounter: function (counter) {
      return {
        type: 'CREATE_COUNTER',
        payload: { counter }
      };
    },
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
