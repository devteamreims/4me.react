import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';

const keys = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '{BACKSPACE}'],
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  ['W', 'X', 'C', 'V', 'B', 'N'],
];

import {
  fullBlack,
  lightBlack,
} from 'material-ui/lib/styles/colors';

const backgroundColor = lightBlack;

class Keyboard extends Component {

  preventFocus = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  onClickHandler = (target, key) => (ev) => {
    // Prevent focus change
    this.preventFocus(ev);


    if(!target) {
      return;
    }


    const KeyboardEventInit = {
      bubbles: true,
      cancelable : true,
      key: key,
      shiftKey: true,
    };

    // Send key down event
    const keyDownEvent = new KeyboardEvent('keydown', KeyboardEventInit);
    target.dispatchEvent(keyDownEvent);


    // Send key up event
    const keyUpEvent = new KeyboardEvent('keyup', KeyboardEventInit);
    target.dispatchEvent(keyUpEvent);

    const valueBefore = target.value;
    // Change target's value
    if(key === '{BACKSPACE}') {
      target.value = valueBefore.substring(0, valueBefore.length - 1);
    } else {
      target.value = valueBefore + key;
    }

    if(valueBefore !== target.value) {
      // Send input event which will trigger changes in React
      const changeEvent = new Event('input', {bubbles: true});
      target.dispatchEvent(changeEvent);
    }
  };

  render() {
    const {
      target,
      hide,
    } = this.props;

    const styles = {
      zIndex: 99999,
      backgroundColor,
      padding: '10px 30px',
    };

    const buttonStyles = {
      margin: '5px',
    };

    if(hide) {
      Object.assign(styles, {maxHeight: 0, display: 'none'});
    }

    return (
      <div
        style={styles}
        onMouseDown={this.preventFocus}
      >
        {_.map(keys, (row, index) =>
          <div
            key={index}
          >
            {_.map(row, (key, index) =>
              <KeyboardButton
                key={index}
                onClick={this.onClickHandler(target, key)}
                style={buttonStyles}
                backgroundColor={fullBlack}
              >
                {key}
              </KeyboardButton>
            )}
          </div>
        )}
      </div>
    );
  }
}


import FlatButton from 'material-ui/lib/flat-button';
import BackspaceIcon from 'material-ui/lib/svg-icons/content/backspace';

class KeyboardButton extends Component {

  handleMouseDown = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  handleClick = (ev) => {
    const {
      onClick,
    } = this.props;

    onClick && onClick(ev);

    ev.preventDefault();
    ev.stopPropagation();
  };

  isIconButton() {
    const {
      children,
    } = this.props;

    if(children === '{BACKSPACE}') {
      return true;
    }

    return false;
  }

  getIcon() {
    const {
      children,
    } = this.props;

    if(children === '{BACKSPACE}') {
      return <BackspaceIcon />
    }

    return false;
  }

  render() {
    const {
      children,
      ...other,
    } = this.props;

    return (
      <FlatButton
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
        icon={this.getIcon()}
        {...other}
      >
        {!this.isIconButton() && children}
      </FlatButton>
    )
  }
}

export default Keyboard;
