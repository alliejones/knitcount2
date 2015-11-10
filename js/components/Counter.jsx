import React from 'react';

var Counter = React.createClass({
	render() {
		var counter = this.props.counter;
		return (
			<li key={counter.get('id')}>
				{counter.get('name')}&nbsp;
				<strong>{counter.get('value')}</strong>{counter.maxValue ? `/${counter.maxValue}` : ''}
        {counter.countRollovers ? ` | ${counter.rolloverCount} times` : ''}&nbsp;
				<a href="#" onClick={this.inc}>inc</a>&nbsp;
				<a href="#" onClick={this.dec}>dec</a>
			</li>
		);
	},

  inc(e) {
    e.preventDefault();
    this.props.inc(this.props.counter.id);
  },

  dec(e) {
    e.preventDefault();
    this.props.dec(this.props.counter.id);
  }
});

export default Counter;
