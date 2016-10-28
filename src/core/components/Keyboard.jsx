import React, { Component } from 'react';

import _ from 'lodash';

const keys = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '{BACKSPACE}'],
  ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
  ['W', 'X', 'C', 'V', 'B', 'N'],
];

import {
  lightBlack,
} from 'material-ui/styles/colors';

import {
  canvasColor,
} from '../../theme/colors';

const backgroundColor = lightBlack;
const keyBackgroundColor = canvasColor;

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = this._getDefaultState();
  }

  // When this component mounts, we add event handlers on the window object
  // This allows us to catch when the user focuses an input element
  componentDidMount() {
    // And we add event listeners for the keyboard
    window.addEventListener('focus', this.focusHandler, true);
    window.addEventListener('blur', this.blurHandler, true);
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.focusHandler, true);
    window.removeEventListener('blur', this.blurHandler, true);
  }

  focusHandler = (el) => {
    if(this._shouldTriggerKeyboard(el.target)) {
      this.setState({showKeyboard: true, targetElement: el.target});
    }
  };

  blurHandler = (el) => {
    if(this._shouldTriggerKeyboard(el.target)) {
      this.setState(this._getDefaultState());
    }
  };

  _getDefaultState() {
    return {showKeyboard: false, targetElement: null};
  }

  handleMouseDown = (ev) => this.preventFocus(ev);

  preventFocus = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  _shouldTriggerKeyboard(target) {
    return _.get(target, 'nodeName') === 'INPUT' &&
      _.get(target, 'type') === 'text';
  }

  focusHandler = (el) => {
    if(this._shouldTriggerKeyboard(el.target)) {
      this.setState({showKeyboard: true, targetElement: el.target});
    }
  };

  blurHandler = (el) => {
    if(this._shouldTriggerKeyboard(el.target)) {
      this.setState(this._getDefaultState());
    }
  };

  onClickHandler = (key) => (ev) => {
    // Prevent focus change
    this.preventFocus(ev);

    const {
      targetElement,
    } = this.state;

    if(!targetElement) {
      return;
    }

    const KeyboardEventInit = {
      bubbles: true,
      cancelable: true,
      key: key,
      shiftKey: true,
    };

    // Send key down event
    const keyDownEvent = new KeyboardEvent('keydown', KeyboardEventInit);
    targetElement.dispatchEvent(keyDownEvent);

    // Send key up event
    const keyUpEvent = new KeyboardEvent('keyup', KeyboardEventInit);
    targetElement.dispatchEvent(keyUpEvent);

    // Sending those events will trigger any listeners attached but won't change
    // the value inside the text field
    const valueBefore = targetElement.value;

    let {
      selectionStart,
      selectionEnd, // eslint-disable-line prefer-const
    } = targetElement;

    // Change target's value
    if(key === '{BACKSPACE}') {
      if(selectionEnd === selectionStart) {
        // Here we have nothing selected, remove char before selectionStart

        // Move caret backwards
        selectionStart--;

        // Remove selected character
        // eslint-disable-next-line max-len
        targetElement.value = valueBefore.slice(0, targetElement.selectionStart - 1 > 0 ? targetElement.selectionStart - 1 : 0) + valueBefore.slice(targetElement.selectionEnd, valueBefore.length);
      } else {
        // Here, we have a substring selected, remove it
        // No need to move the caret here, selectionStart is fine
        // eslint-disable-next-line max-len
        targetElement.value = valueBefore.slice(0, targetElement.selectionStart) + valueBefore.slice(targetElement.selectionEnd, valueBefore.length);
      }
    } else {
      // Add key
      // eslint-disable-next-line max-len
      targetElement.value = valueBefore.slice(0, selectionStart) + key + valueBefore.slice(selectionEnd, valueBefore.length);
      // Move caret forward
      selectionStart++;
    }

    if(valueBefore !== targetElement.value) {
      // Send input event which will trigger changes in React
      const changeEvent = new Event('input', {bubbles: true});
      targetElement.dispatchEvent(changeEvent);
    }

    targetElement.setSelectionRange(selectionStart, selectionStart);
  };

  render() {
    const {
      showKeyboard,
    } = this.state;

    const styles = {
      zIndex: 99999,
      backgroundColor,
      margin: 0,
      maxHeight: 0,
      flex: '0 0 auto',
    };

    const buttonStyles = {
      margin: '5px 5px',
    };

    if(showKeyboard) {
      Object.assign(styles, {
        maxHeight: 500,
      });
    }

    return (
      <div
        style={styles}
        onMouseDown={this.handleMouseDown}
      >
        {showKeyboard && _.map(keys, (row, index) =>
          <div
            key={index}
            style={{margin: '5px 30px'}}
          >
            {_.map(row, (key, index) =>
              <KeyboardButton
                key={index}
                onClick={this.onClickHandler(key)}
                style={buttonStyles}
                backgroundColor={keyBackgroundColor}
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


import FlatButton from 'material-ui/FlatButton';
import BackspaceIcon from 'material-ui/svg-icons/content/backspace';

class KeyboardButton extends Component {

  handleMouseDown = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  handleClick = (ev) => {
    const {
      onClick,
    } = this.props;

    if(onClick) {
      onClick(ev);
    }

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
      return <BackspaceIcon />;
    }

    return null;
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
    );
  }
}

export default Keyboard;
