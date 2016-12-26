import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  accent1Color,
} from '../../../../shared/theme/colors';

const highlightColor = accent1Color;

class ToneDowner extends Component {
  handleMouseEnter = () => {
    const {
      setToneDownFilter,
      path,
      value,
    } = this.props;
    setToneDownFilter(path, value);
  };

  handleMouseLeave = () => {
    const {
      clearToneDownFilter,
    } = this.props;
    clearToneDownFilter();
  };

  render() {
    const {
      isHighlighted,
      style,
    } = this.props;

    const defaultStyle = {
      fontSize: 'inherit',
      color: 'inherit',
      transition: 'none',
      cursor: 'pointer',
    };

    if (isHighlighted) {
      Object.assign(defaultStyle, {color: highlightColor});
    }

    const mergedProps = {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      style: Object.assign({}, defaultStyle, style),
    };

    return React.cloneElement(this.props.children, mergedProps);
  }
}

ToneDowner.propTypes = {
  path: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  children: React.PropTypes.element.isRequired,
};

import {
  getPath,
  getValue,
} from '../../selectors/highlighter';

const mapStateToProps = (state, ownProps) => {
  const isHighlighted = ownProps.path === getPath(state) && ownProps.value === getValue(state);
  return {
    isHighlighted,
  };
};

import {
  setToneDownFilter,
  clearToneDownFilter,
} from '../../actions/highlighter';

const mapDispatchToProps = {
  setToneDownFilter,
  clearToneDownFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToneDowner);
