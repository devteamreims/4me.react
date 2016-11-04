import React, { Component } from 'react';

import { connect } from 'react-redux';

import Widget from '../../core/components/Dashboard/Widget';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {ContentAddCircle, ContentRemoveCircle} from 'material-ui/svg-icons';


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
          <div style={subContainerStyle}>
            <h1>{counter}</h1>
          </div>
          <div style={subContainerStyle}>
            <IconButton
              onTouchTap={this.handleDecrement}
              disabled={counter === 0}
            >
              <ContentRemoveCircle color="red" />
            </IconButton>
            <IconButton
              onTouchTap={this.handleIncrement}
            >
              <ContentAddCircle color="green" />
            </IconButton>
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
