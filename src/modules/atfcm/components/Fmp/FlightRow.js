// @flow
import React, { Component } from 'react';

import Divider from 'material-ui/Divider';
import F from 'flexbox-react';

import StamAvatar from '../StamAvatar';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';

import type { Flight } from './StamCard';

type Props = {
  onRequestDelete?: () => void,
  onRequestEdit?: () => void,
  flight: Flight,
  style?: Object,
};

export class FlightRow extends Component {
  props: Props;
  state: {
    showActions: boolean,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      showActions: false,
    };
  }

  showActions = () => {
    this.setState({showActions: true});
  };

  hideActions = () => {
    this.setState({showActions: false});
  };

  _renderActions() {
    const {
      onRequestEdit,
      onRequestDelete,
    } = this.props;

    const {
      showActions,
    } = this.state;

    if(!showActions) {
      return null;
    }

    return [
      <IconButton>
        <Edit />
      </IconButton>,
      <IconButton>
        <Delete />
      </IconButton>
    ];
  }

  render() {
    const {
      flight,
      onRequestDelete,
      onRequestEdit,
      style,
      ...otherProps
    } = this.props;

    const newStyles = Object.assign({
      marginBottom: 5,
      fontSize: 28,
    }, style);

    return (
      <div
        style={newStyles}
        onMouseEnter={this.showActions}
        onMouseLeave={this.hideActions}
        {...otherProps}
      >
        <F flexDirection="row" justifyContent="space-between">
          <div>
            <StamAvatar
              stamId={flight.implementingSector}
              size={10}
              style={{
                margin: 5,
              }}
            />
            <b>{flight.arcid}</b>
          </div>
          <div style={{display: 'flex', minHeight: 60, border: '1px solid red'}}>
            {this._renderActions()}
          </div>
        </F>
        <Divider />
      </div>
    );
  }
}

export default FlightRow;
