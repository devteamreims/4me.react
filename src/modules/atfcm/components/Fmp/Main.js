// @flow
import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import VerticalDivider from '../../../../shared/components/VerticalDivider';

import AddStamButton from './AddStam/Button';
import AddStamDialog from './AddStam/Dialog';
import AddFlightToStamDialog from './AddFlightToStam/Dialog';

import {
  StamCard,
  WritableStamCard,
} from '../shared/StamCard/StamCard';

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


type Props = StateProps & DispatchProps;

export class FmpMain extends Component<void, Props, void> {
  props: Props;

  handleOpenDialog = () => {
    const { showAddStamDialog } = this.props;
    showAddStamDialog();
  };

  handleDeleteStam = (id: StamId) => (): void => {
    if(!id) {
      return;
    }

    const { delStam } = this.props;
    delStam(id);
  };

  handleSendStam = (id: StamId) => (delay: ?number): void => {
    if(!id) {
      return;
    }

    const { sendStam } = this.props;

    sendStam({id, delay});
  };

  handleArchiveStam = (id: StamId) => (delay: ?number): void => {
    if(!id) {
      return;
    }

    const { archiveStam } = this.props;

    archiveStam({id, delay});
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
        <WritableStamCard
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
        <WritableStamCard
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
        <StamCard
          stam={stam}
          key={stam.id}
          expandable={true}
          initiallyExpanded={false}
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

import {
  getPreparedStams,
  getActiveStams,
  getHistoryStams,
} from '../../reducers/entities/stams';

const mapStateToProps = (state: RootState) => ({
  loadingStamIds: getLoadingIds(state),
  preparedStams: getPreparedStams(state),
  activeStams: getActiveStams(state),
  historyStams: getHistoryStams(state),
});

type StateProps = {
  loadingStamIds: Array<StamId>,
  preparedStams: Array<PreparedStam>,
  activeStams: Array<ActiveStam>,
  historyStams: Array<HistoryStam>,
};

type DispatchProps = {
  showAddStamDialog: Function,
  delStam: Function,
  sendStam: Function,
  archiveStam: Function,
};

import {
  showDialog as showAddStamDialog,
  deleteStam as delStam,
  sendStam,
  archiveStam,
} from '../../actions/stam';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showAddStamDialog: () => dispatch(showAddStamDialog()),
  delStam: (id) => dispatch(delStam(id)),
  sendStam: (arg) => dispatch(sendStam(arg)),
  archiveStam: (arg) => dispatch(archiveStam(arg)),
});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default connector(FmpMain);
