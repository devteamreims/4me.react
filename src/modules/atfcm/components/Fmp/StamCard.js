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
import FlightRow from './FlightRow';

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
type Arcid = string;

export type Flight = {
  arcid: Arcid,
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
  addFlight: () => Promise<void>,
  removeFlight: () => Promise<void>,
};

export class StamCard extends Component {
  props: Props;
  state: {
    formOpen: boolean,
    selectedFlightForForm: ?Flight,
    isAddFlightFormValid: boolean,
    isAddFlightFormSubmitting: boolean,
    readOnlyFlights: Array<Arcid>,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      formOpen: false,
      isAddFlightFormValid: false,
      isAddFlightFormSubmitting: false,
      selectedFlightForForm: null,
      readOnlyFlights: [],
    };
  }

  addFlightForm = null;

  isReadOnly = (flight: Flight): boolean => {
    const { readOnlyFlights } = this.state;

    return readOnlyFlights.includes(flight.arcid);
  };

  addReadOnly = (flight: Flight) => {
    const { readOnlyFlights } = this.state;
    console.log(`Setting flight ${flight.arcid} to readonly`);
    this.setState({readOnlyFlights: R.append(flight.arcid, readOnlyFlights)});
  };

  delReadOnly = (flight: Flight) => {
    const { readOnlyFlights } = this.state;
    this.setState({readOnlyFlights: R.without([flight.arcid], readOnlyFlights)});
  };

  handleOpenForm = (flight: ?Flight) => {
    this.setState({
      formOpen: true,
      selectedFlightForForm: flight,
    });
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
      formOpen: false,
      selectedFlightForForm: null,
      isAddFlightFormValid: false,
      isAddFlightFormSubmitting: false,
    });
  };

  // Handle submit from child component
  handleFormSubmit = (data: Object, resetModel: *, invalidateModel: *) => {
    const {
      addFlight,
    } = this.props;

    if(typeof addFlight !== 'function') {
      console.error('atfcm/Fmp/StamCard: addFlight prop is not a function');
      return;
    }

    this.setState({isAddFlightFormSubmitting: true});

    addFlight(data).then(
      () => {
        this.setState({
          isAddFlightFormSubmitting: false,
          formOpen: false,
        });
        return;
      },
      () => {
        invalidateModel({
          implementingSector: 'Not a valid sector !',
        });

        this.setState({isAddFlightFormSubmitting: false});
        return;
      }
    );
  };

  handleDeleteFlight = (flight: Flight) => {
    const {
      removeFlight,
    } = this.props;

    if(typeof removeFlight !== 'function') {
      console.error('atfcm/Fmp/StamCard: addFlight prop is not a function');
      return;
    }
    this.addReadOnly(flight);

    removeFlight(flight).then(
      () => {
        this.delReadOnly(flight);
      },
      err => {
        this.delReadOnly(flight);
      }
    );
  };

  _renderForm() {
    const {
      formOpen,
      selectedFlightForForm,
      isAddFlightFormSubmitting,
    } = this.state;

    if(!formOpen) {
      return null;
    }

    const additionalProps = {};
    if(selectedFlightForForm) {
      Object.assign(additionalProps, {flight: selectedFlightForForm});
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
        {...additionalProps}
      />
    );
  }

  _renderFormActions() {
    const {
      formOpen,
      isAddFlightFormValid,
      isAddFlightFormSubmitting,
      selectedFlightForForm,
    } = this.state;

    if(!formOpen) {
      return null;
    }

    const addOrSave = selectedFlightForForm ? 'Save' : 'Add';

    return [
      <RaisedButton
        label="discard"
        backgroundColor={Colors.red500}
        onClick={this.handleDiscardButton}
      />,
      <RaisedButton
        label={isAddFlightFormSubmitting ? 'Loading ...' : addOrSave}
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
      <FlightRow
        flight={flight}
        onRequestEdit={this.handleOpenForm.bind(this, flight)}
        onRequestDelete={this.handleDeleteFlight.bind(this, flight)}
        disabledActions={this.isReadOnly(flight)}
      />
    ));
  }

  _renderInside() {
    const {
      formOpen,
      readOnlyFlights,
    } = this.state;

    if(formOpen) {
      return this._renderForm();
    }

    // Form is not open, render flight list
    return [
      this._renderFlights(),
      <RaisedButton
        label="Add"
        onClick={this.handleOpenForm.bind(this, null)}
        disabled={readOnlyFlights.length}
      />,
    ];
  }

  _renderActions() {
    const {
      formOpen,
      readOnlyFlights,
    } = this.state;

    const {
      flights,
    } = this.props;

    if(formOpen) {
      return this._renderFormActions();
    }

    const areButtonsDisabled = readOnlyFlights.length !== 0;
    const areFlightsPresent = flights && flights.length;

    return [
      <RaisedButton
        backgroundColor={Colors.red500}
        label="remove"
        disabled={areButtonsDisabled}
      />,
      <RaisedButton
        disabled={areButtonsDisabled || !areFlightsPresent}
        backgroundColor={Colors.green500}
        label="send"
      />,
    ];
  }


  render() {
    const {
      stamId,
      offloadSector,
      flights,
    } = this.props;

    const {
      formOpen,
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
        <Divider />
        <CardText>
          <F flexDirection="column">
            {this._renderInside()}
          </F>
        </CardText>
        {!formOpen &&
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
