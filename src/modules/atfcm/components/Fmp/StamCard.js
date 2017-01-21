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
import SendButton from './SendButton';

import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import ActionAdd from 'material-ui/svg-icons/action/alarm-add';

import F from 'flexbox-react';

import AddFlightToStam from './AddFlightToStam';
import { LightTheme } from '../../../../shared/components/Theme';
import ColorizedContent from '../../../../shared/components/ColorizedContent';

const boxStyle = {
  padding: 10,
};

import type {
  Flight,
  ElementarySector,
  Arcid,
} from './types';

type Props = {
  offloadSector: ElementarySector,
  flights: Array<Flight>,
  stamId: string,
  onRequestAddFlight: () => Promise<void>,
  onRequestDeleteFlight: () => Promise<void>,
  onRequestDelete: () => Promise<void>,
  onRequestSend: () => Promise<void>,
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
      onRequestAddFlight,
    } = this.props;

    if(typeof onRequestAddFlight !== 'function') {
      console.error('atfcm/Fmp/StamCard: onRequestAddFlight prop is not a function');
      return;
    }

    this.setState({isAddFlightFormSubmitting: true});

    onRequestAddFlight(data).then(
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
      onRequestDeleteFlight,
    } = this.props;

    if(typeof onRequestDeleteFlight !== 'function') {
      console.error('atfcm/Fmp/StamCard: onRequestDeleteFlight prop is not a function');
      return;
    }
    this.addReadOnly(flight);

    onRequestDeleteFlight(flight).then(
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

    return (
      <SendButton
        disabled={areButtonsDisabled || !areFlightsPresent}
      />
    );
  }

  _renderTopActions() {
    const {
      onRequestDelete,
    } = this.props;

    const {
      formOpen,
    } = this.state;

    if(formOpen) {
      return null;
    }

    return (
      <IconButton onChange={onRequestDelete}>
        <Delete />
      </IconButton>
    );
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

    const colorizedOffloadSector = (
      <ColorizedContent theme="light" hash={offloadSector}>
        {offloadSector}
      </ColorizedContent>
    );

    return (
      <LightTheme>
        <Card>
          <F
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            flewGrow={1}
            style={{marginLeft: 16, marginRight: 16}}
          >
            <F
              flexDirection="row"
              alignItems="center"
            >
              <h2>OFFLOAD {colorizedOffloadSector}</h2>
            </F>
            {this._renderTopActions()}
          </F>
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
      </LightTheme>
    );
  }
}

export default StamCard;
