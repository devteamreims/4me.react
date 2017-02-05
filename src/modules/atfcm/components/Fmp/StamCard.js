// @flow
import React, { Component } from 'react';
import R from 'ramda';
import moment from 'moment';
import { connect } from 'react-redux';

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
  onRequestDelete: () => void,
  onRequestSend: () => void,
} & StateProps;

export class StamCard extends Component {
  props: Props;

  state: {
    formOpen: boolean,
    selectedFlightForForm: ?Flight,
    isAddFlightFormValid: boolean,
    isAddFlightFormSubmitting: boolean,
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
    const { loadingFlightIds } = this.props;

    return loadingFlightIds.includes(flight.id);
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
      deleteFlight,
    } = this.props;

    if(typeof deleteFlight !== 'function') {
      console.error('atfcm/Fmp/StamCard: onRequestDeleteFlight prop is not a function');
      return;
    }

    deleteFlight(flight.id);
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
      <FlatButton
        label="discard"
        labelStyle={{color: Colors.red500}}
        onClick={this.handleDiscardButton}
      />,
      <FlatButton
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
        onRequestEdit={this.handleOpenForm.bind(this, flight)}
        onRequestDelete={this.handleDeleteFlight.bind(this, flight)}
        disabledActions={loading || this.isReadOnly(flight)}
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
    } = this.state;

    const {
      stam,
      onRequestSend,
      loading,
      loadingFlightIds,
    } = this.props;

    const {
      flights,
      sendTime,
    } = stam;

    if(formOpen) {
      return this._renderFormActions();
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
          onArchive={() => console.log('Archiving !')}
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
      loadingFlightIds,
    } = this.props;

    const {
      formOpen,
    } = this.state;

    if(formOpen) {
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

import { getLoadingIds } from '../../reducers/ui/flights';

type StateProps = {
  loadingFlightIds: Array<*>,
  deleteFlight: (id: *) => void,
};

const mapStateToProps = state => ({
  loadingFlightIds: getLoadingIds(state),
});

import { deleteFlight } from '../../actions/flight';

const mapDispatchToProps = {
  deleteFlight,
};

export default connect(mapStateToProps, mapDispatchToProps)(StamCard);
