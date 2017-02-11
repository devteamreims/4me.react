// @flow
import React, { Component } from 'react';

import Divider from 'material-ui/Divider';
import F from 'flexbox-react';

import IconButton from 'material-ui/IconButton';

import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Build from 'material-ui/svg-icons/action/build';
import Location from 'material-ui/svg-icons/maps/my-location';
import FlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

import ColorizedContent from '../../../../shared/components/ColorizedContent';

import type { Flight } from './types';

type Props = {
  onRequestDelete?: () => void,
  onRequestEdit?: () => void,
  hideActions?: boolean,
  disabledActions?: boolean,
  flight: Flight,
  style?: Object,
};

export class FlightRow extends Component {
  props: Props;

  static defaultProps = {
    hideActions: false,
  };

  _renderActions() {
    const {
      onRequestEdit,
      onRequestDelete,
      disabledActions,
    } = this.props;

    return [
      <IconButton
        onClick={onRequestEdit}
        disabled={disabledActions}
      >
        <Edit />
      </IconButton>,
      <IconButton
        onClick={onRequestDelete}
        disabled={disabledActions}
      >
        <Delete />
      </IconButton>
    ];
  }

  _renderArcid() {
    const { flight } = this.props;

    return (
      <F
        flexDirection="row"
        style={{
          fontSize: 22,
          fontWeight: 'bold'
        }}
        alignItems="center"
      >
        {flight.arcid}
      </F>
    );
  }


  render() {
    const {
      flight,
      onRequestDelete, // eslint-disable-line no-unused-vars
      onRequestEdit, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      hideActions,
    } = this.props;


    const subItemStyle = {
      display: 'flex',
      flexGrow: 1,
      flexBasis: 0,
      fontSize: 16,
      margin: '5px 0',
    };

    const defaultStyle = {
      margin: '16px 0',
    };

    return (
      <F
        flexDirection="column"
        style={Object.assign({}, defaultStyle, style)}
      >
        <F
          flexDirection="row"
          justifyContent="space-between"
        >
          {this._renderArcid()}
          <F
            flexDirection="row"
          >
            {!hideActions && this._renderActions()}
          </F>
        </F>
        <F
          flexDirection="row"
          justifyContent="space-between"
        >
          <F
            flexDirection="row"
            alignItems="center"
            style={subItemStyle}
          >
            <AddCircle
              color="grey"
              style={{marginRight: 10}}
            />
            <ColorizedContent
              hash={flight.onloadSector}
              theme="light"
            >
              {flight.onloadSector}
            </ColorizedContent>
          </F>
          <F
            flexDirection="row"
            alignItems="center"
            style={subItemStyle}
          >
            <FlightTakeoff
              color="grey"
              style={{marginRight: 10}}
            />
            {flight.constraint.flightLevel}
          </F>
          <F
            flexDirection="row"
            alignItems="center"
            style={subItemStyle}
          >
            <Location
              color="grey"
              style={{marginRight: 10}}
            />
            {flight.constraint.beacon}
          </F>
          <F
            flexDirection="row"
            alignItems="center"
            style={subItemStyle}
          >
            <Build
              color="grey"
              style={{marginRight: 10}}
            />
            <ColorizedContent
              hash={flight.implementingSector}
              theme="light"
            >
              {flight.implementingSector}
            </ColorizedContent>
          </F>
        </F>
        <Divider />
      </F>
    );
  }
}

export default FlightRow;
