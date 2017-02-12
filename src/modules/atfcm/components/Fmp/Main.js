// @flow
import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import VerticalDivider from '../../../../shared/components/VerticalDivider';

import AddStamButton from './AddStam/Button';
import AddStamDialog from './AddStam/Dialog';
import AddFlightToStamDialog from './AddFlightToStam/Dialog';

import StamCards from './StamCard';

const columnStyle = {
  padding: 10,
  width: '33%',
  minHeight: '100%',
  overflowY: 'auto',
};

import type {
  ActiveStam,
  PreparedStam,
  HistoryStam,
  StamId,
} from '../../types';

type OwnProps = {
  preparedStams: Array<PreparedStam>,
  activeStams: Array<ActiveStam>,
  historyStams: Array<HistoryStam>,
};

type Props = OwnProps & StateProps & DispatchProps;

import {
  showDialog as showAddStamDialog,
  deleteStam as delStam,
  sendStam,
  archiveStam,
} from '../../actions/stam';

export class FmpMain extends Component<void, Props, void> {
  props: Props;

  handleOpenDialog = () => {
    this.props.dispatch(showAddStamDialog());
  };

  handleDeleteStam = (id: StamId) => () => {
    if(!id) {
      return;
    }
    this.props.dispatch(delStam(id));
  };

  handleSendStam = (id: StamId) => (delay: ?number) => {
    if(!id) {
      return;
    }

    this.props.dispatch(sendStam({id, delay}));
  };

  handleArchiveStam = (id: StamId) => (delay: ?number) => {
    if(!id) {
      return;
    }

    this.props.dispatch(archiveStam({id, delay}));
  };

  _renderPreparedStams() {
    const {
      preparedStams,
      loadingStamIds,
    } = this.props;

    if(!preparedStams || preparedStams.length === 0) {
      return (
        <span>No stams yet !</span>
      );
    }

    return preparedStams.map(stam => (
      <div style={{marginBottom: 20}} >
        <StamCards.prepared
          stam={stam}
          key={stam.id}
          loading={loadingStamIds.includes(stam.id)}
          onRequestDelete={this.handleDeleteStam(stam.id)}
          onRequestSend={this.handleSendStam(stam.id)}
        />
      </div>
    ));
  }

  _renderActiveStams() {
    const {
      activeStams,
      loadingStamIds,
    } = this.props;

    if(!activeStams || activeStams.length === 0) {
      return (
        <span>No stams yet !</span>
      );
    }

    return activeStams.map(stam => (
      <div style={{marginBottom: 20}} >
        <StamCards.active
          stam={stam}
          key={stam.id}
          loading={loadingStamIds.includes(stam.id)}
          onRequestDelete={this.handleDeleteStam(stam.id)}
          onRequestSend={this.handleSendStam(stam.id)}
          onRequestArchive={this.handleArchiveStam(stam.id)}
        />
      </div>
    ));
  }

  _renderHistoryStams() {
    const {
      historyStams,
    } = this.props;

    if(!historyStams || historyStams.length === 0) {
      return (
        <span>No stams yet !</span>
      );
    }

    return historyStams.map(stam => (
      <div style={{marginBottom: 20}} >
        <StamCards.archive
          stam={stam}
          key={stam.id}
        />
      </div>
    ));
  }

  render() {
    return (
      <Flexbox flexGrow={1} flexDirection="column">
        <Flexbox
          flexDirection="row"
          flexGrow={1}
        >
          <Flexbox
            flexDirection="column"
            flexGrow={1}
            style={columnStyle}
          >
            <h1>Prepared</h1>
            {this._renderPreparedStams()}
            <div style={{textAlign: 'center'}}>
              <AddStamButton onClick={this.handleOpenDialog} />
            </div>
          </Flexbox>
          <VerticalDivider />
          <Flexbox
            flexDirection="column"
            flexGrow={1}
            style={columnStyle}
          >
            <h1>Active</h1>
            {this._renderActiveStams()}
          </Flexbox>
          <VerticalDivider />
          <Flexbox
            flexDirection="column"
            flexGrow={1}
            style={columnStyle}
          >
            <h1>History</h1>
            {this._renderHistoryStams()}
          </Flexbox>
          <AddStamDialog />
          <AddFlightToStamDialog />
        </Flexbox>
      </Flexbox>
    );
  }
}

import { getLoadingIds } from '../../reducers/ui/stams';

import type { RootState, Dispatch } from '../../../../store';
import type { Connector } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  loadingStamIds: getLoadingIds(state),
});

type StateProps = {
  loadingStamIds: Array<StamId>,
};

type DispatchProps = {
  dispatch: Dispatch,
};

const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });

const connector: Connector<OwnProps, Props> = connect(mapStateToProps, mapDispatchToProps);

export default connector(FmpMain);
