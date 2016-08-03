import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import UndoIcon from 'material-ui/svg-icons/content/undo';

import {
  redA200,
  grey700,
  fullBlack,
  fullWhite,
} from 'material-ui/styles/colors';

import XmanButton from './XmanButton';


class UndoButton extends Component {
  handleUndo = (event) => {
    const {
      disabled,
      readOnly,
      clearAction,
    } = this.props;

    console.log('Called !');

    if(disabled || readOnly) {
      return;
    }

    clearAction();

  };

  render() {
    let {
      disabled,
      backgroundColor = fullWhite,
      iconColor = redA200,
      style,
      dimmed = false,
      ...other,
    } = this.props;


    if(dimmed) {
      backgroundColor = grey700;
    } else if(disabled) {
      backgroundColor = null;
    }

    return <XmanButton
      disabled={disabled}
      icon={<UndoIcon />}
      labelColor={fullBlack}
      backgroundColor={backgroundColor}
      style={style}
      onClick={this.handleUndo}
      {...other}
    />
  }
}

UndoButton.propTypes = {
  disabled: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
};

import {
  hasSetAction,
} from '../../../selectors/flight';

const mapStateToProps = (state, ownProps) => {
  const {
    ifplId,
    readOnly,
  } = ownProps;

  return {
    disabled: !hasSetAction(state, ifplId),
  };
};

import {
  clearAction,
} from '../../../actions/flight';

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    ifplId,
  } = ownProps;

  return {
    clearAction: () => dispatch(clearAction(ifplId, {})),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UndoButton);

