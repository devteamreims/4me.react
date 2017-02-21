// @flow
import React, { Component } from 'react';

import Divider from 'material-ui/Divider';
import F from 'flexbox-react';

import IconButton from 'material-ui/IconButton';

import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Hide from 'material-ui/svg-icons/action/visibility-off';
import Unhide from 'material-ui/svg-icons/action/visibility';

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
  onRequestHide?: () => void,
  onRequestUnhide?: () => void,
  disabledActions?: boolean,
  flight: Flight,
  hidden?: boolean,
  style?: Object,
  disabledFlightFields?: Array<FlightRowFields>,
};

type DefaultProps = {
  disabledFlightFields: Array<FlightRowFields>,
  hidden: boolean,
};

const styles = {
  smallIcon: {
    width: 20,
    height: 20,
  },
  small: {
    width: 40,
    height: 40,
    padding: 10,
  },
};

export class FlightRow extends Component<DefaultProps, Props, void> {
  props: Props;

  static defaultProps: DefaultProps = {
    hidden: false,
    disabledFlightFields: [],
  };

  _renderHideIcon() {
    const {
      onRequestHide,
      onRequestUnhide,
      disabledActions,
      hidden,
    } = this.props;

    if(hidden && onRequestUnhide) {
      return (
        <IconButton
          onClick={onRequestUnhide}
          disabled={!!disabledActions}
          style={styles.small}
          iconStyle={styles.smallIcon}
        >
          <Unhide />
        </IconButton>
      );
    }

    if(!hidden && onRequestHide) {
      return (
        <IconButton
          onClick={onRequestHide}
          disabled={!!disabledActions}
          style={styles.small}
          iconStyle={styles.smallIcon}
        >
          <Hide />
        </IconButton>
      );
    }

    return null;
  }

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
        style={styles.small}
        iconStyle={styles.smallIcon}
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
        style={styles.small}
        iconStyle={styles.smallIcon}
      >
        <Delete />
      </IconButton>
    );
  }

  _renderArcid() {
    const {
      flight,
    } = this.props;

    return (
      <F
        flexDirection="row"
        style={{
          fontSize: 22,
          fontWeight: 'bold',
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
      disabledFlightFields = [],
      hidden,
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
      opacity: hidden ? '0.2' : 1,
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
            style={{margin: 0}}
          >
            {this._renderHideIcon()}
            {this._renderEditIcon()}
            {this._renderDeleteIcon()}
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
        <Divider style={{opacity: '1'}} />
      </F>
    );
  }
}

export default FlightRow;
