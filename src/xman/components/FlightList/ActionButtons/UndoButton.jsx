import React, { Component } from 'react';
import { connect } from 'react-redux';

import UndoIcon from 'material-ui/svg-icons/content/undo';

import {
  grey700,
  fullBlack,
  fullWhite,
} from 'material-ui/styles/colors';

import XmanButton from './XmanButton';


class UndoButton extends Component {
  handleUndo = (event) => { // eslint-disable-line no-unused-vars
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
    const {
      disabled,
      backgroundColor = fullWhite,
      style,
      dimmed = false,
      ...other,
    } = this.props;

    let overridenBackgroundColor = backgroundColor;


    if(dimmed) {
      overridenBackgroundColor = grey700;
    } else if(disabled) {
      overridenBackgroundColor = null;
    }

    return (
      <XmanButton
        disabled={disabled}
        icon={<UndoIcon />}
        labelColor={fullBlack}
        backgroundColor={overridenBackgroundColor}
        style={style}
        onClick={this.handleUndo}
        {...other}
      />
    );
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
