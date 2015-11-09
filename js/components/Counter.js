var React = require('react');

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
        this.props.inc(this.props.counter.id);
    },

	  dec: function(e) {
        e.preventDefault();
		    this.props.dec(this.props.counter.id);
	  }
});

module.exports = Counter;
