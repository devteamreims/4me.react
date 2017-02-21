// @flow
import React, { Component } from 'react';

import Divider from 'material-ui/Divider';
import F from 'flexbox-react';

import IconButton from 'material-ui/IconButton';

import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';

import {
  ImplementingSector,
  OnloadSector,
  FlightLevel,
  Beacon,
} from './AnnotatedIcons';

import type { Flight } from '../../../types';

export type FlightRowFields = "onloadSector" | "constraint" | "implementingSector";

type Props = {
  onRequestDelete?: () => void,
  onRequestEdit?: () => void,
  hideActions?: boolean,
  disabledActions?: boolean,
  flight: Flight,
  style?: Object,
  disabledFlightFields?: Array<FlightRowFields>,
};

type DefaultProps = {
  hideActions: boolean,
  disabledFlightFields: Array<FlightRowFields>,
};

export class FlightRow extends Component<DefaultProps, Props, void> {
  props: Props;

  static defaultProps: DefaultProps = {
    hideActions: false,
    disabledFlightFields: [],
  };

  _renderEditIcon() {
    const {
      onRequestEdit,
      disabledActions,
    } = this.props;

    if(typeof onRequestEdit !== 'function') {
      return null;
    }

    return (
      <IconButton
        onClick={onRequestEdit}
        disabled={!!disabledActions}
      >
        <Edit />
      </IconButton>
    );
  }

  _renderDeleteIcon() {
    const {
      onRequestDelete,
      disabledActions,
    } = this.props;

    if(typeof onRequestDelete !== 'function') {
      return null;
    }
    return (
      <IconButton
        onClick={onRequestDelete}
        disabled={!!disabledActions}
      >
        <Delete />
      </IconButton>
    );
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
      style,
      hideActions,
      disabledFlightFields = [],
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
            {!hideActions && [
              this._renderEditIcon(),
              this._renderDeleteIcon(),
            ]}
          </F>
        </F>
        <F
          flexDirection="row"
          justifyContent="space-between"
        >
          {!disabledFlightFields.includes('implementingSector') &&
            <ImplementingSector
              style={subItemStyle}
              sector={flight.implementingSector}
            />
          }
          {!disabledFlightFields.includes('onloadSector') &&
            <OnloadSector
              style={subItemStyle}
              sector={flight.onloadSector}
            />
          }
          {!disabledFlightFields.includes('constraint') &&
            <FlightLevel
              style={subItemStyle}
              flightLevel={flight.constraint.flightLevel}
            />
          }
          {!disabledFlightFields.includes('constraint') &&
            <Beacon
              style={subItemStyle}
              beacon={flight.constraint.beacon}
            />
          }
        </F>
        <Divider />
      </F>
    );
  }
}

export default FlightRow;
