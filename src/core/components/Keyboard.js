// @flow
import React, { Component } from 'react';

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
} from '../../shared/theme/colors';

const backgroundColor = lightBlack;
const keyBackgroundColor = canvasColor;

type Props = {};

class Keyboard extends Component {
  props: Props;
  state: {
    showKeyboard: boolean,
    targetElement: ?(HTMLInputElement | HTMLTextAreaElement),
  };

  constructor(props: Props) {
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

  focusHandler = (ev: Event) => {
    // This looks like duplicate type refinement stuff
    // But flow won't take the refinement otherwise
    // eslint-disable-next-line max-len
    // See : https://flowtype.org/try/#0PQKgBAAgZgNg9gdzCYAoALgTwA4FMwCiAHngMbq4AmYAvGABIAqAsgDICSAdtgK7oExcAW1yd0AblSpSMAIYBneWEa556MAG9UYMAH0KagFyESuclUk7tYKHFI959WZ0qCATrTAAKXADdjBL6i6ACUtAB8mtY6AJZQPr4AdOiybgDmuOoxnGrOpLhwUAwsHNx8AsLBYVo6tWDoABYx8on6qup0fsmpGRLRYAC+1gOSI1LScorK7QBMUTptRiZkFJSS1rb2js6uuB50CQFBYmE0kTW1pHA56inpmZ5dd72WtXFejc2tBvy+Hz2ZELVfo6T4tRYdeoAvp1IY6MbWCGBTz-e6hCLzN7xZ4PbK5Tj5QrFNhcXj8QQiE6YupuTI8NycepuHi4V7w-q09D0xlQWQweSs4ajcRAA
    if(this._shouldTriggerKeyboard(ev.target) && (
      ev.target instanceof HTMLInputElement ||
      ev.target instanceof HTMLTextAreaElement
    )) {
      this.setState({showKeyboard: true, targetElement: ev.target});
    }
  };

  blurHandler = (ev: Event) => {
    if(this._shouldTriggerKeyboard(ev.target) && (
      ev.target instanceof HTMLInputElement ||
      ev.target instanceof HTMLTextAreaElement
    )) {
      this.setState(this._getDefaultState());
    }
  };

  _getDefaultState() {
    return {showKeyboard: false, targetElement: null};
  }

  handleMouseDown = (ev: Event) => this.preventFocus(ev);

  preventFocus = (ev: Event) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  _shouldTriggerKeyboard = (target: EventTarget): boolean => {
    if(
      // We have an input
      target instanceof HTMLInputElement &&
      // And it's a text input
      target.type === 'text' &&
      // And it's not disabled
      target.disabled === false
    ) {
      return true;
    }

    if(
      target instanceof HTMLTextAreaElement &&
      target.disabled === false
    ) {
      return true;
    }

    return false;
  };


  onClickHandler = (key: string) => (ev: Event): void => {
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
        {showKeyboard && keys.map((row, index: number) =>
          <div
            key={index}
            style={{margin: '5px 30px'}}
          >
            {row.map((key, index) =>
              <KeyboardButton
                key={index}
                onClick={this.onClickHandler(key)}
                style={buttonStyles}
                backgroundColor={keyBackgroundColor}
                title={key}
              />
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
  props: {
    children: ?React.Element<*>,
    onClick: (Event) => void,
    title: string,
  };

  static defaultProps = {
    children: null,
  };

  handleMouseDown = (ev: Event) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  handleClick = (ev: Event) => {
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
      title,
    } = this.props;

    if(title === '{BACKSPACE}') {
      return true;
    }

    return false;
  }

  getIcon() {
    const {
      title,
    } = this.props;

    if(title === '{BACKSPACE}') {
      return <BackspaceIcon />;
    }

    return null;
  }

  render() {
    const {
      title,
      onClick, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    return (
      <FlatButton
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
        icon={this.getIcon()}
        {...other}
      >
        {!this.isIconButton() && title}
      </FlatButton>
    );
  }
}

export default Keyboard;
