// @flow
import React, { Component } from 'react';
import R from 'ramda';

import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';

import LinearProgress from 'material-ui/LinearProgress';
import * as Colors from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import StamAvatar from '../StamAvatar';

import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import ActionAdd from 'material-ui/svg-icons/action/alarm-add';

import F from 'flexbox-react';

import { sectors as envSectors } from '../../../../shared/env';

import AddFlightToStam from './AddFlightToStam';

const boxStyle = {
  padding: 10,
};

type ElementarySector = string;

type Flight = {
  arcid: string,
  constraint: {
    beacon: string,
    flightLevel: number,
  },
  implementingSector: ElementarySector,
  onloadSector: ElementarySector,
};

type Props = {
  offloadSector: ElementarySector,
  flights: Array<Flight>,
  stamId: string,
};

export class StamCard extends Component {
  props: Props;
  state: {
    addingFlight: boolean,
    isAddFlightFormValid: boolean,
    isAddFlightFormSubmitting: boolean,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      addingFlight: false,
      isAddFlightFormValid: false,
      isAddFlightFormSubmitting: false,
    };
  }

  addFlightForm = null;

  handleOpenForm = () => {
    this.setState({addingFlight: true});
  };

  handleFormIsValid = () => {
    this.setState({isAddFlightFormValid: true});
  };

  handleFormIsInvalid = () => {
    this.setState({isAddFlightFormValid: false});
  };

  handleAddFlightButton = () => {
    if(!this.addFlightForm) {
      return;
    }

    const { isAddFlightFormValid } = this.state;

    if(!isAddFlightFormValid) {
      return;
    }

    // Trigger the submit in the child component
    this.addFlightForm.submit();
  };

  handleDiscardButton = () => {
    this.setState({
      addingFlight: false,
      isAddFlightFormValid: false,
      isAddFlightFormSubmitting: false,
    });
  };

  // Handle submit from child component
  handleFormSubmit = (data: Object, resetModel: *, invalidateModel: *) => {
    console.log('Form has been submitted, data is', data);

    this.setState({isAddFlightFormSubmitting: true});
    setTimeout(() => {
      invalidateModel({
        implementingSector: 'Not a valid sector !',
      });
      this.setState({isAddFlightFormSubmitting: false});
    }, 2000);
  };

  _renderForm() {
    const {
      addingFlight,
      isAddFlightFormSubmitting,
    } = this.state;

    if(!addingFlight) {
      return null;
    }

    return (
      <AddFlightToStam
        ref={(addFlightForm) => {
          this.addFlightForm = addFlightForm;
        }}
        onValid={this.handleFormIsValid}
        onInvalid={this.handleFormIsInvalid}
        onSubmit={this.handleFormSubmit}
        loading={isAddFlightFormSubmitting}
      />
    );
  }

  _renderFormActions() {
    const {
      addingFlight,
      isAddFlightFormValid,
      isAddFlightFormSubmitting,
    } = this.state;

    if(!addingFlight) {
      return null;
    }

    return [
      <RaisedButton
        label="discard"
        backgroundColor={Colors.red500}
        onClick={this.handleDiscardButton}
      />,
      <RaisedButton
        label={isAddFlightFormSubmitting ? 'Loading ...' : 'Add'}
        onClick={this.handleAddFlightButton}
        disabled={!isAddFlightFormValid || isAddFlightFormSubmitting}
      />
    ];
  }


  _renderFlights() {
    const {
      flights,
    } = this.props;


    if(R.isEmpty(flights)) {
      return <div>No flights yet !</div>;
    }

    return flights.map(flight => (
      <div>
        <h4>{flight.arcid}</h4>
        <Divider />
      </div>
    ));
  }

  _renderInside() {
    const {
      addingFlight,
    } = this.state;

    if(addingFlight) {
      return this._renderForm();
    }

    // Form is not open, render flight list
    return [
      this._renderFlights(),
      <RaisedButton label="Add" onClick={this.handleOpenForm} />,
    ];
  }

  _renderActions() {
    const {
      addingFlight,
    } = this.state;

    if(addingFlight) {
      return this._renderFormActions();
    }

    return [
      <RaisedButton backgroundColor={Colors.red500} label="remove" />,
      <RaisedButton backgroundColor={Colors.green500} label="send" />,
    ];
  }


  render() {
    const {
      stamId,
      offloadSector,
      flights,
    } = this.props;

    const {
      addingFlight,
    } = this.state;

    return (
      <Card>
        <CardHeader
          title={`OFFLOAD ${offloadSector}`}
          subtitle={<i>{stamId}</i>}
          avatar={
            <StamAvatar
              stamId={stamId}
            >
              {offloadSector}
            </StamAvatar>
          }
        />
        <CardText>
          <F flexDirection="column">
            {this._renderInside()}
          </F>
        </CardText>
        {!addingFlight &&
          <LinearProgress mode="determinate" color={Colors.green500} value={50} />
        }
        <CardActions>
          {this._renderActions()}
        </CardActions>
      </Card>
    );
  }
}

export default StamCard;
