// @flow
import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import VerticalDivider from '../../../../shared/components/VerticalDivider';

import AddStamButton from './AddStam/Button';
import AddStamDialog from './AddStam/Dialog';

import StamCard from './StamCard';

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
} from './types';

type Props = {
  preparedStams: Array<PreparedStam>,
  activeStams: Array<ActiveStam>,
  historyStams: Array<HistoryStam>,
};

export class FmpMain extends Component {
  props: Props & StateProps;

  handleOpenDialog = () => {
    const {
      showAddStamDialog,
    } = this.props;

    showAddStamDialog();
  };

  handleCloseDialog = () => {
    const {
      hideAddStamDialog,
    } = this.props;

    hideAddStamDialog();
  };

  handleDeleteStam = (id: StamId) => () => {
    const { delStam } = this.props;
    if(typeof delStam !== 'function') {
      return;
    }

    delStam(id);
  };

  handleSendStam = (id: StamId) => (delay: ?number) => {
    const { sendStam } = this.props;
    if(typeof sendStam !== 'function') {
      return;
    }

    sendStam({id, delay});
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
        <StamCard
          stam={stam}
          key={stam.id}
          loading={loadingStamIds.includes(stam.id)}
          onRequestAddFlight={() => Promise.resolve()}
          onRequestDeleteFlight={() => Promise.resolve()}
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
        <StamCard
          stam={stam}
          key={stam.id}
          loading={loadingStamIds.includes(stam.id)}
          onRequestAddFlight={() => Promise.resolve()}
          onRequestDeleteFlight={() => Promise.resolve()}
          onRequestDelete={this.handleDeleteStam(stam.id)}
          onRequestSend={this.handleSendStam(stam.id)}
        />
      </div>
    ));
  }

  _renderHistoryStams() {
    const {
      historyStams,
      loadingStamIds,
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
          loading={loadingStamIds.includes(stam.id)}
          onRequestAddFlight={() => Promise.resolve()}
          onRequestDeleteFlight={() => Promise.resolve()}
          onRequestDelete={this.handleDeleteStam(stam.id)}
          onRequestSend={this.handleSendStam(stam.id)}
        />
      </div>
    ));
  }

  render() {
    const {
      isAddStamDialogVisible,
      addStam,
    } = this.props;

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
          <AddStamDialog
            open={isAddStamDialogVisible}
            onRequestClose={this.handleCloseDialog}
            addStam={addStam}
          />
        </Flexbox>
      </Flexbox>
    );
  }
}


type StateProps = {
  isAddStamDialogVisible: boolean,
  showAddStamDialog: () => void,
  hideAddStamDialog: () => void,
  addStam: () => void,
  delStam: (StamId) => void,
  sendStam: ({id: StamId, when: Date}) => void,
  loadingStamIds: Array<StamId>,
};

import { isVisible } from '../../reducers/ui/addStamModal';
import { getLoadingIds } from '../../reducers/ui/stams';

const mapStateToProps = state => ({
  isAddStamDialogVisible: isVisible(state),
  loadingStamIds: getLoadingIds(state),
});

import {
  showDialog as showAddStamDialog,
  hideDialog as hideAddStamDialog,
  commitStam as addStam,
  deleteStam as delStam,
  sendStam,
} from '../../actions/stam';

const mapDispatchToProps = {
  showAddStamDialog,
  hideAddStamDialog,
  addStam,
  delStam,
  sendStam,
};

export default connect(mapStateToProps, mapDispatchToProps)(FmpMain);
