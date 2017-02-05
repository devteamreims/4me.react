// @flow
import React, { Component } from 'react';
import R from 'ramda';
import moment from 'moment';

import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';

import Avatar from 'material-ui/Avatar';

import StamAvatar from '../StamAvatar';
import FlightRow from './FlightRow';
import SendButton from './SendButton';
import Progress from './Progress';

import * as Colors from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import Delete from 'material-ui/svg-icons/action/delete';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';

import F from 'flexbox-react';

import AddFlightToStam from './AddFlightToStam';
import { LightTheme } from '../../../../shared/components/Theme';
import ColorizedContent from '../../../../shared/components/ColorizedContent';

const boxStyle = {
  padding: 10,
};

import type {
  PreparedStam,
  ActiveStam,
  Flight,
  Arcid,
} from './types';

type Props = {
  stam: PreparedStam | ActiveStam,
  loading?: boolean,
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

  static defaultProps = {
    loading: false,
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

  isStamSent = (): boolean => {
    const { stam } = this.props;

    if(!stam.sendTime) {
      return false;
    }

    return !moment(stam.sendTime).isAfter(moment());
  };

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
        console.error('atfcm/Fmp/StamCard: onRequestDelete: error thrown');
        console.error(err);
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
      stam,
      loading,
    } = this.props;

    const {
      flights,
    } = stam;


    if(R.isEmpty(flights)) {
      return <div>No flights yet !</div>;
    }

    return flights.map(flight => (
      <FlightRow
        flight={flight}
        hideActions={this.isStamSent()}
        onRequestEdit={this.handleOpenForm.bind(this, flight)}
        onRequestDelete={this.handleDeleteFlight.bind(this, flight)}
        disabledActions={loading || this.isReadOnly(flight) || this.isStamSent()}
      />
    ));
  }

  _renderInside() {
    const {
      formOpen,
    } = this.state;

    if(formOpen) {
      return this._renderForm();
    }

    // Form is not open, render flight list
    return this._renderFlights();
  }

  _renderActions() {
    const {
      formOpen,
      readOnlyFlights,
    } = this.state;

    const {
      stam,
      onRequestSend,
      loading,
    } = this.props;

    const {
      flights,
      sendTime,
    } = stam;

    if(formOpen) {
      return this._renderFormActions();
    }

    const areButtonsDisabled = readOnlyFlights.length !== 0;
    const areFlightsPresent = flights && flights.length;

    return (
      <SendButton
        disabled={loading || areButtonsDisabled || !areFlightsPresent}
        sendTime={sendTime}
        onSelectTime={onRequestSend}
      />
    );
  }

  _renderTopActions() {
    const {
      onRequestDelete,
      loading,
    } = this.props;

    const {
      formOpen,
      readOnlyFlights,
    } = this.state;

    if(formOpen) {
      return null;
    }

    return (
      <div>
        {!this.isStamSent() &&
          <IconButton
            onClick={this.handleOpenForm.bind(this, null)}
            disabled={loading || readOnlyFlights.length}
          >
            <ActionAdd />
          </IconButton>
        }
        <IconButton
          disabled={loading || readOnlyFlights.length}
          onClick={onRequestDelete}
        >
          <Delete />
        </IconButton>
      </div>
    );
  }

  render() {
    const {
      stam,
      loading,
    } = this.props;

    const {
      offloadSector,
      sendTime,
    } = stam;

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
          {loading &&
            <LinearProgress />
          }
          {formOpen ?
            <Progress sendTime={sendTime} /> :
            <Divider />
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
