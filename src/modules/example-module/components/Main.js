// @flow
import React, { Component } from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import RedirectToDashboard from '../../../shared/components/RedirectToDashboard';
import Counter from './Counter';
import { Increment, Decrement } from './CounterActions';

import Paper from 'material-ui/Paper';

import {
  increment,
  decrement,
} from '../actions';

import type { Client, Sectors } from '../../../core/types';

type StateProps = {
  counter: number,
};

type DispatchProps = {
  increment: () => void,
  decrement: () => void,
};

type Props = StateProps & DispatchProps & {
  client: Client,
  sectors: Sectors,
};

class Main extends Component {
  props: Props;

  handleDecrement = () => {
    const {
      decrement,
    } = this.props;

    decrement();
  };

  handleIncrement = () => {
    const {
      increment,
    } = this.props;

    increment();
  };

  getExplanationString = (): ?React.Element<*> => {
    const {
      counter,
    } = this.props;

    if(counter === 0) {
      return (
        <p>
          This module exposes a simple counter and shows interactions with 4ME CORE.<br />
          Start by clicking on the PLUS button.
        </p>
      );
    } else if(counter < 2) {
      return (
        <p>
          Great ! See the notification count in the left menu change ?<br />
          Click again !
        </p>
      );
    } else if(counter < 10) {
      return (
        <p>
          The notification changed color. 4ME modules can also display a priority along side notifications.<br />
          Let's get the counter up to 10.
        </p>
      );
    } else if(counter === 10) {
      return (
        <p>
          Perfect, now take a look in the top right corner. See how the status icon just changed ?<br />
          4ME submodules also can signal 4ME CORE that something is wrong.
        </p>
      );
    } else if(counter >= 30) {
      return (
        <p>
          Seriously ? Don't you think that's enough clicking for one day ?!
        </p>
      );
    }

    return null;
  }

  render() {
    const {
      counter,
      client,
      sectors,
    } = this.props;

    const containerStyle = {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const boxStyle = {
      padding: 20,
      width: 400,
    };

    const shouldRedirectToDashboard: boolean = !R.isEmpty(sectors);

    return (
      <div style={containerStyle}>
        {shouldRedirectToDashboard && <RedirectToDashboard />}
        <Paper
          zDepth={3}
          style={boxStyle}
        >
          <h3>This is an example module !</h3>
          <p>
            We are {client.name}<br />
            We are a {client.type}<br />
            This is our sectors : {sectors.join(',')}
          </p>
          <Counter
            count={counter}
            style={{textAlign: 'center'}}
          />
          <div style={{textAlign: 'center'}}>
            <Decrement
              onTouchTap={this.handleDecrement}
              disabled={counter === 0}
            />
            <Increment
              onTouchTap={this.handleIncrement}
            />
          </div>
          {this.getExplanationString()}
        </Paper>
      </div>
    );
  }
}

import { p } from '../selectors';

const mapStateToProps = state => {
  const ourState = p(state);

  return {
    counter: ourState.counter,
  };
};

const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
