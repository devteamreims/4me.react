// @flow
import React, { Component } from 'react';
import R from 'ramda';
import moment from 'moment';
import { connect } from 'react-redux';

import {
  Card,
  CardActions,
  CardText,
  CardTitle,
} from 'material-ui/Card';

import FlightRow from '../../shared/FlightRow';
import {
  AddFlightButton,
  PublishButton,
  ArchiveButton,
  MoreButton,
} from './IconButtons';

import Progress from './Progress';

import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';

import F from 'flexbox-react';

import ColorizedContent from '../../../../../shared/components/ColorizedContent';
import TimeAgo from '../../../../../shared/components/TimeAgo';
import type {
  PreparedStam,
  ActiveStam,
  Flight,
} from '../../../types';

import type {
  FlightRowFields,
} from '../FlightRow/FlightRow';

type OwnProps = {
  stam: PreparedStam | ActiveStam,
  loading?: boolean,
  onRequestAddFlight?: () => void,
  onRequestDelete?: () => void,
  onRequestSend?: () => void,
  onRequestArchive?: () => void,
  disabledFlightFields?: Array<FlightRowFields>,
  expandable?: boolean,
  initiallyExpanded?: boolean,
};

type Props = OwnProps & StateProps & DispatchProps;
export class StamCard extends Component {
  props: Props;

  static defaultProps = {
    loading: false,
    readOnly: false,
    loadingFlightIds: [],
    disabledFlightFields: [],
    expandable: false,
    initiallyExpanded: true,
  };

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

    if(!stam.archivetime) {
      return false;
    }

    return moment(stam.archiveTime).isBefore(moment());
  };

  hasInteractionCallback = (name: $Keys<Props>): boolean => {
    return typeof this.props[name] === 'function';
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
      onRequestShowFlightForm,
      onRequestDeleteFlight,
      disabledFlightFields,
    } = this.props;

    const {
      flights,
    } = stam;


    if(flights.length === 0) {
      return <div>No flights yet !</div>;
    }

    return flights.map(flight => (
      <FlightRow
        flight={flight}
        onRequestEdit={
          this.hasInteractionCallback('onRequestShowFlightForm') ?
            onRequestShowFlightForm.bind(null, stam, flight) :
            undefined
        }
        onRequestDelete={
          this.hasInteractionCallback('onRequestDeleteFlight') ?
            onRequestDeleteFlight.bind(null, flight) :
            undefined
        }
        disabledActions={loading || this.isFlightReadOnly(flight)}
        disabledFlightFields={disabledFlightFields}
      />
    ));
  }

  _renderActions() {
    const {
      stam,
      onRequestSend,
      onRequestArchive,
      onRequestShowFlightForm,
      onRequestDelete,
      loading,
      loadingFlightIds,
    } = this.props;

    const {
      flights,
      sendTime,
      archiveTime,
    } = stam;

    // Stam is archived, no actions available
    if(this.isStamArchived()) {
      return null;
    }

    let leftActions = [];
    let moreButtonCallbacks = {};

    const areButtonsDisabled = loadingFlightIds.length !== 0;
    const areFlightsPresent = flights && flights.length;

    if(this.isStamSent()) {
      // Stam is already sent,
      // Just add an archive button on the left
      // The rest goes under the <MoreButton />
      if(this.hasInteractionCallback('onRequestArchive')) {
        leftActions.push(
          <ArchiveButton
            key="archive-button"
            disabled={loading || areButtonsDisabled}
            sendTime={archiveTime}
            onSelectTime={onRequestArchive}
            onCancel={onRequestArchive.bind(null, null)}
          />
        );
      }

      if(this.hasInteractionCallback('onRequestShowFlightForm')) {
        moreButtonCallbacks.onAddFlight = onRequestShowFlightForm.bind(null, stam, null);
      }

      if(this.hasInteractionCallback('onRequestDelete')) {
        moreButtonCallbacks.onDeleteStam = onRequestDelete;
      }

      if(this.hasInteractionCallback('onRequestSend')) {
        moreButtonCallbacks.onCancelSend = onRequestSend.bind(null, null);
      }
    } else {
      // Stam is in preparation
      // Add flight button and send button on the left
      // DeleteStam on the right
      if(this.hasInteractionCallback('onRequestSend')) {
        leftActions.push(
          <PublishButton
            key="publish-button"
            disabled={loading || areButtonsDisabled || !areFlightsPresent}
            sendTime={sendTime}
            onSelectTime={onRequestSend.bind(null)}
            onCancel={onRequestSend.bind(null, null)}
          />
        );
      }

      if(this.hasInteractionCallback('onRequestShowFlightForm')) {
        leftActions.push(
          <AddFlightButton
            key="add-flight-button"
            disabled={loading || areButtonsDisabled}
            onClick={onRequestShowFlightForm.bind(null, stam, null)}
          />
        );
      }


      if(this.hasInteractionCallback('onRequestDelete')) {
        moreButtonCallbacks.onDeleteStam = onRequestDelete;
      }
    }

    if(leftActions.length === 0 && Object.keys(moreButtonCallbacks).length === 0) {
      return null;
    }

    return (
      <F
        flexDirection="row"
        justifyContent="space-between"
        style={{margin: 0}}
      >
        <F>{leftActions}</F>
        <F>
          <MoreButton
            disabled={loading || areButtonsDisabled}
            {...moreButtonCallbacks}
          />
        </F>
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

  getSubtitleString() {
    const {
      stam,
    } = this.props;

    const {
      offloadSector,
      flights,
    } = stam;

    const pluralFlights = flights.length === 1 ? 'flight' : 'flights';

    const flightString = `${flights.length || 0} ${pluralFlights}`;
    let verb = 'created';
    let targetTime = stam.createdAt;

    if(this.isStamSent()) {
      verb = 'published';
      targetTime = stam.sendTime;
    } else if(this.isStamArchived()) {
      verb = 'archived';
      targetTime = stam.archiveTime;
    }

    return (
      <span>{flightString} - {verb} <TimeAgo when={targetTime} /></span>
    );
  }

  render() {
    const {
      stam,
      expandable,
      initiallyExpanded,
    } = this.props;

    const {
      offloadSector,
    } = stam;

    const colorizedOffloadSector = (
      <ColorizedContent hash={offloadSector}>
        {offloadSector}
      </ColorizedContent>
    );

    const actions = this._renderActions();
    const hasActions = !!actions;

    return (
      <Card
        initiallyExpanded={initiallyExpanded}
      >
        <CardTitle
          title={colorizedOffloadSector}
          subtitle={this.getSubtitleString()}
          actsAsExpander={expandable}
          showExpandableButton={expandable}
        />
        {!hasActions ? this._renderProgress() : <Divider />}
        <CardText
          expandable={expandable}
        >
          <F flexDirection="column">
            {this._renderFlights()}
          </F>
        </CardText>
        {hasActions && this._renderProgress()}
        {hasActions &&
          <CardActions>
            {actions}
          </CardActions>
        }
      </Card>
    );
  }
}

type StateProps = {
  loadingFlightIds?: Array<*>,
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
  onRequestDeleteFlight?: (id: *) => void,
  onRequestShowFlightForm?: (*) => void,
};

import {
  deleteFlight,
  showForm,
} from '../../../actions/flight';

const mapDispatchToProps = {
  onRequestDeleteFlight: deleteFlight,
  onRequestShowFlightForm: showForm,
};

export const ReadOnlyStamCard = StamCard;
export default connect(mapStateToProps, mapDispatchToProps)(StamCard);
