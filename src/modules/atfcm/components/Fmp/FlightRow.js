// @flow
import React, { Component } from 'react';

import Divider from 'material-ui/Divider';
import F from 'flexbox-react';

import StamAvatar from '../StamAvatar';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Subheader from 'material-ui/Subheader';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import Build from 'material-ui/svg-icons/action/build';
import Location from 'material-ui/svg-icons/maps/my-location';
import FlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

import { List, ListItem } from 'material-ui/List';

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

    return [
      <IconButton>
        <Edit />
      </IconButton>,
      <IconButton>
        <Delete />
      </IconButton>
    ];
  }

  _renderMetadata() {
    const {
      showActions,
    } = this.state;

    const {
      flight,
    } = this.props;

    if(showActions) {
      return null;
    }

    return (
      <span>
        {flight.constraint.beacon}@{flight.constraint.flightLevel}
      </span>
    );
  }

  render() {
    const {
      flight,
      onRequestDelete,
      onRequestEdit,
      style,
      ...otherProps
    } = this.props;

    return (
      <F
        flexDirection="column"
      >
        <F
          flexDirection="row"
          justifyContent="space-between"
        >
          <F
            flexDirection="row"
            style={{
              fontSize: 28,
            }}
            alignItems="center"
          >
            <b>{flight.arcid} ({flight.implementingSector})</b>

          </F>
          <F
            flexDirection="row"
          >
            {this._renderActions()}
          </F>
        </F>
        <F
          flexDirection="row"
          justifyContent="space-between"
        >
          <List
            style={{
              flexGrow: 1,
              margin: 0,
              padding: 0,
            }}
          >
            <ListItem
              disabled={true}
              leftIcon={<AddCircle />}
              primaryText={flight.onloadSector}
            />
          </List>
          <List
            style={{
              flexGrow: 1,
              margin: 0,
              padding: 0,
            }}
          >
            <ListItem
              disabled={true}
              leftIcon={<Build />}
              primaryText={flight.implementingSector}
            />
          </List>
        </F>
        <List
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <ListItem
            disabled={true}
            leftIcon={<Location />}
            primaryText={flight.constraint.beacon}
          />
          <ListItem
            disabled={true}
            leftIcon={<FlightTakeoff />}
            primaryText={flight.constraint.flightLevel}
          />
        </List>

        <Divider />
      </F>
    );
  }
}

export default FlightRow;
