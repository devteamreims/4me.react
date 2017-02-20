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

import FlightRow from '../../shared/FlightRow';
import SendButton from './SendButton';
import UnsendButton from './UnsendButton';
import ArchiveButton from './ArchiveButton';
import Progress from './Progress';

import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import Delete from 'material-ui/svg-icons/action/delete';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';

import F from 'flexbox-react';

import ColorizedContent from '../../../../../shared/components/ColorizedContent';

import type {
  PreparedStam,
  ActiveStam,
  Flight,
} from '../../../types';

type Props = {
  stam: PreparedStam | ActiveStam,
  loading?: boolean,
  readOnly?: boolean,
  onRequestAddFlight?: () => void,
  onRequestDelete?: () => void,
  onRequestSend?: () => void,
  onRequestArchive?: () => void,
};

export class StamCard extends Component {
  props: Props & StateProps & DispatchProps;

  static defaultProps = {
    loading: false,
    readOnly: false,
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

  isFlightReadOnly = (flight: Flight): boolean => {
    const { loadingFlightIds } = this.props;

    return loadingFlightIds.includes(flight.id);
  };

  showFlightForm = (flight: ?Flight) => {
    const {
      showForm,
      stam,
    } = this.props;

    if(!stam || !stam.id || typeof showForm !== 'function') {
      return;
    }

    showForm(stam, flight);
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


  _renderFlights() {
    const {
      stam,
      loading,
      readOnly,
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
        onRequestEdit={readOnly ? undefined : this.showFlightForm.bind(this, flight)}
        onRequestDelete={readOnly ? undefined : this.handleDeleteFlight.bind(this, flight)}
        disabledActions={loading || this.isFlightReadOnly(flight)}
      />
    ));
  }

  _renderActions() {
    const {
      stam,
      onRequestSend,
      onRequestArchive,
      loading,
      loadingFlightIds,
    } = this.props;

    const {
      flights,
      sendTime,
      archiveTime,
    } = stam;

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
      loadingFlightIds,
    } = this.props;

    return (
      <F flexDirection="row">
        <IconButton
          onClick={this.showFlightForm.bind(this, null)}
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
      </F>
    );
  }

  _renderProgress() {
    const {
      loading,
      loadingFlightIds,
      stam,
    } = this.props;

    const { sendTime } = stam;

    if(loading || loadingFlightIds.length) {
      return (
        <LinearProgress />
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
      readOnly,
    } = this.props;

    const {
      offloadSector,
      sendTime,
    } = stam;

    const colorizedOffloadSector = (
      <ColorizedContent hash={offloadSector}>
        {offloadSector}
      </ColorizedContent>
    );

    return (
      <Card>
        <F
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          flewGrow={1}
          style={{marginLeft: 16, marginRight: 16}}
        >
          <h2>OFFLOAD {colorizedOffloadSector}</h2>
          {!readOnly && this._renderTopActions()}
        </F>
        {readOnly ? this._renderProgress() : <Divider />}
        <CardText>
          <F flexDirection="column">
            {this._renderFlights()}
          </F>
        </CardText>
        {!readOnly && this._renderProgress()}
        {!readOnly &&
          <CardActions>
            {this._renderActions()}
          </CardActions>
        }
      </Card>
    );
  }
}

type StateProps = {
  loadingFlightIds: Array<*>,
};

import { getLoadingIds } from '../../../reducers/ui/flights';

const mapStateToProps = (state, ownProps: Props) => {
  // Here we try to determine whether we should display our loading indicator or not
  // If the stam is marked as loading, then display it
  // If one or more of the flights associated with our stam are 'loading', display it
  const { stam } = ownProps;

  const ourFlightIds = stam.flights.map(flight => flight.id);

  return {
    loadingFlightIds: getLoadingIds(state).filter(flightId => ourFlightIds.includes(flightId)),
  };
};

type DispatchProps = {
  deleteFlight: (id: *) => void,
  showForm: (*) => void,
};

import {
  deleteFlight,
  showForm,
} from '../../../actions/flight';

const mapDispatchToProps = {
  deleteFlight,
  showForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(StamCard);
