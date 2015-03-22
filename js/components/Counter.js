var React = require('react');

var CounterActionCreators = require('../actions/Counters');

var Counter = React.createClass({
	render: function() {
		var counter = this.props.counter;
		return (
			<li key={counter.get('id')}>
				{counter.get('name')}&nbsp;
				<strong>{counter.get('value')}</strong>&nbsp;
				<a href="#" onClick={this.inc}>inc</a>&nbsp;
				<a href="#" onClick={this.dec}>dec</a>
			</li>
		);
	},

	inc: function(e) {
		e.preventDefault();
		CounterActionCreators.incCounter(this.props.counter.get('id'));
	},

	dec: function(e) {
		e.preventDefault();
		CounterActionCreators.decCounter(this.props.counter.get('id'));
	}
});

module.exports = Counter;