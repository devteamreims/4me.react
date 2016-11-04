import React, { Component } from 'react';

import { connect } from 'react-redux';

import Widget from '../../core/components/Dashboard/Widget';
import { Increment, Decrement } from './CounterActions';
import Counter from './Counter';

class WidgetComponent extends Component {

  handleIncrement = () => {
    const {
      increment,
    } = this.props;

    increment();
  };

  handleDecrement = () => {
    const {
      decrement,
    } = this.props;

    decrement();
  };

  render() {
    const {
      cols,
      counter,
    } = this.props;

    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflow: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const subContainerStyle = {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    };

    return (
      <Widget
        cols={cols}
        title="Example module"
      >
        <div style={containerStyle}>
          <Counter
            style={subContainerStyle}
            count={counter}
          />
          <div style={subContainerStyle}>
            <Decrement
              onTouchTap={this.handleDecrement}
              disabled={counter === 0}
            />
            <Increment
              onTouchTap={this.handleIncrement}
            />
          </div>
        </div>
      </Widget>
    );
  }
}

import p from '../selectors';

const mapStateToProps = state => {
  return {
    counter: p(state).counter,
  };
};

import {
  increment,
  decrement,
} from '../actions';

const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetComponent);