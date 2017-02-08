// @flow
import React, { Component } from 'react';
import R from 'ramda';
import moment from 'moment';
import { connect } from 'react-redux';

import {
  Card,
  CardActions,
  CardText,
} from 'material-ui/Card';

import FlightRow from '../FlightRow';
import SendButton from './SendButton';
import UnsendButton from './UnsendButton';
import ArchiveButton from './ArchiveButton';
import Progress from './Progress';

import * as Colors from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import Delete from 'material-ui/svg-icons/action/delete';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';

import F from 'flexbox-react';

import { LightTheme } from '../../../../../shared/components/Theme';
import ColorizedContent from '../../../../../shared/components/ColorizedContent';

import type {
  PreparedStam,
  ActiveStam,
  Flight,
  Arcid,
} from '../types';

type Props = {
  stam: PreparedStam | ActiveStam,
  loading?: boolean,
  onRequestAddFlight: () => Promise<void>,
  onRequestDelete: () => void,
  onRequestSend: () => void,
  onRequestArchive: () => void,
};

export class StamCard extends Component {
  props: Props & StateProps;

  state: {
    isAddFlightFormValid: boolean,
    isAddFlightFormSubmitting: boolean,
  };

  static defaultProps = {
    loading: false,
    onRequestSend: () => {},
    onRequestArchive: () => {},
  };

  constructor(props: Props) {
    super(props);
  }

  addFlightForm = null;

  isStamSent = (): boolean => {
    const { stam } = this.props;

    if(!stam.sendTime) {
      return false;
    }

    return moment(stam.sendTime).isBefore(moment());
  };

  isStamArchived = (): boolean => {
    const { stam } = this.props;

    if(!stam.archiveTime) {
      return false;
    }

    return moment(stam.archiveTime).isBefore(moment());
  };

  isReadOnly = (flight: Flight): boolean => {
    const { loadingFlightIds = [] } = this.props;

    return loadingFlightIds.includes(flight.id);
  };

  handleOpenForm = (flight: ?Flight) => {
    const {
      showForm,
      stam,
    } = this.props;

    if(!stam || !stam.id || typeof showForm !== 'function') {
      return;
    }

    showForm(stam, flight);
  };

  handleHideForm = () => {
    const {
      hideForm,
    } = this.props;

    if(typeof hideForm !== 'function') {
      return;
    }

    hideForm();
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

  // Handle submit from child component
  handleFormSubmit = (data: Object) => {
    // TODO : Dispatch redux action submitting the form
  };

  handleDeleteFlight = (flight: Flight) => {
    const {
      deleteFlight,
    } = this.props;

    if(typeof deleteFlight !== 'function') {
      console.error('atfcm/Fmp/StamCard: deleteFlight prop is not a function');
      return;
    }

    deleteFlight(flight.id);
  };

  handleFormChange = () => {
    const {
      touchForm,
    } = this.props;

    if(typeof touchForm !== 'function') {
      return;
    }

    touchForm();
  };

  _renderForm() {
    const {
      isFlightFormOpen,
      isFlightFormLoading,
      flightFormData,
      globalFlightFormError,
      flightFormFieldErrors,
      touchForm,
    } = this.props;


    if(!isFlightFormOpen) {
      return null;
    }

    return null;

    return (
      <AddFlightToStam
        ref={(addFlightForm) => {
          this.addFlightForm = addFlightForm;
        }}
        onValid={this.handleFormIsValid}
        onInvalid={this.handleFormIsInvalid}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleFormChange}
        loading={isFlightFormLoading}
        flight={flightFormData}
        globalError={globalFlightFormError}
        fieldErrors={flightFormFieldErrors}
      />
    );
  }

  _renderFormActions() {
    const {
      isAddFlightFormValid,
    } = this.state;

    const {
      isFlightFormOpen,
      isFlightFormLoading,
    } = this.props;

    if(!isFlightFormOpen) {
      return null;
    }

    const addOrSave = true ? 'Save' : 'Add';

    return [
      <FlatButton
        label="discard"
        labelStyle={{color: Colors.red500}}
        onClick={this.handleHideForm}
      />,
      <FlatButton
        label={isFlightFormLoading ? 'Loading ...' : addOrSave}
        onClick={this.handleAddFlightButton}
        disabled={!isAddFlightFormValid || isFlightFormLoading}
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
        onRequestEdit={this.handleOpenForm.bind(this, flight)}
        onRequestDelete={this.handleDeleteFlight.bind(this, flight)}
        disabledActions={loading || this.isReadOnly(flight)}
      />
    ));
  }

  _renderInside() {
    const {
      isFlightFormOpen,
    } = this.props;

    if(isFlightFormOpen) {
      return this._renderForm();
    }

    // Form is not open, render flight list
    return this._renderFlights();
  }

  _renderActions() {
    const {
      stam,
      onRequestSend,
      onRequestArchive,
      loading,
      loadingFlightIds = [],
      isFlightFormOpen,
    } = this.props;

    const {
      flights,
      sendTime,
      archiveTime,
    } = stam;

    if(isFlightFormOpen) {
      return this._renderFormActions();
    }

    if(this.isStamArchived()) {
      return null;
    }

    const areButtonsDisabled = loadingFlightIds.length !== 0;
    const areFlightsPresent = flights && flights.length;

    if(this.isStamSent()) {
      return [
        <UnsendButton
          disabled={loading || areButtonsDisabled || !areFlightsPresent}
          sendTime={sendTime}
          onCancelSend={() => onRequestSend(null)}
        />,
        <ArchiveButton
          disabled={loading || areButtonsDisabled || !areFlightsPresent}
          archiveTime={archiveTime}
          onSelectTime={onRequestArchive}
          onCancelArchive={() => onRequestArchive(null)}
        />
      ];
    }

    return [
      <SendButton
        disabled={loading || areButtonsDisabled || !areFlightsPresent}
        sendTime={sendTime}
        onSelectTime={onRequestSend}
        onCancelSend={() => onRequestSend(null)}
      />
    ];
  }

  _renderTopActions() {
    const {
      onRequestDelete,
      loading,
      loadingFlightIds = [],
      isFlightFormOpen,
    } = this.props;

    if(isFlightFormOpen) {
      return null;
    }

    return (
      <div>
        <IconButton
          onClick={this.handleOpenForm.bind(this, null)}
          disabled={loading || loadingFlightIds.length}
        >
          <ActionAdd />
        </IconButton>
        <IconButton
          disabled={loading || loadingFlightIds.length}
          onClick={onRequestDelete}
        >
          <Delete />
        </IconButton>
      </div>
    );
  }

  _renderProgress() {
    const {
      loading,
      stam,
      isFlightFormOpen,
    } = this.props;

    const { sendTime } = stam;

    if(loading) {
      return (
        <LinearProgress />
      );
    }

    if(isFlightFormOpen) {
      return (
        <Divider />
      );
    }

    return (
      <Progress sendTime={sendTime} />
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
          {this._renderProgress()}
          <CardActions>
            {this._renderActions()}
          </CardActions>
        </Card>
      </LightTheme>
    );
  }
}

type StateProps = {
  deleteFlight: (id: *) => void,
  hideForm: () => void,
  showForm: (*) => void,
  touchForm: () => void,
};


import {
  deleteFlight,
  showForm,
  hideForm,
  touchForm,
} from '../../../actions/flight';

const mapDispatchToProps = {
  deleteFlight,
  showForm,
  hideForm,
  touchForm,
};

export default connect(null, mapDispatchToProps)(StamCard);
