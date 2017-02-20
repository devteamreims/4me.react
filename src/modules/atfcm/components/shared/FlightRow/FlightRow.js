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

type Props = {
  onRequestDelete?: () => void,
  onRequestEdit?: () => void,
  hideActions?: boolean,
  disabledActions?: boolean,
  flight: Flight,
  style?: Object,
};

type DefaultProps = {
  hideActions: boolean,
};

export class FlightRow extends Component<DefaultProps, Props, void> {
  props: Props;

  static defaultProps: DefaultProps = {
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
          <OnloadSector
            style={subItemStyle}
            sector={flight.onloadSector}
          />
          <FlightLevel
            style={subItemStyle}
            flightLevel={flight.constraint.flightLevel}
          />
          <Beacon
            style={subItemStyle}
            beacon={flight.constraint.beacon}
          />
          <ImplementingSector
            style={subItemStyle}
            sector={flight.implementingSector}
          />
        </F>
        <Divider />
      </F>
    );
  }
}

export default FlightRow;
