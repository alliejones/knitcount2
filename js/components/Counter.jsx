import React from 'react';

var Counter = React.createClass({
	render() {
		var counter = this.props.counter;
		return (
      <div className={`${this.props.className} counter`}>
        <div className="counter-name">
          {counter.get('name')}
        </div>
        <div className="counter-value">
          <strong>{counter.get('value')}</strong>{counter.maxValue ? `/${counter.maxValue}` : ''}
          {counter.countRollovers ? ` | ${counter.rolloverCount} times` : ''}&nbsp;
        </div>
        <div className="counter-controls">
          <button className="button button--small" onClick={this.inc}>inc</button>&nbsp;
          <button className="button button--small" onClick={this.dec}>dec</button>
        </div>
      </div>
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
