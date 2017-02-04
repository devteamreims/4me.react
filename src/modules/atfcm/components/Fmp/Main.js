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
  addStam?: () => void,
  delStam?: (StamId) => void,
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

  _renderPreparedStams() {
    const { preparedStams } = this.props;

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
          onRequestAddFlight={() => Promise.resolve()}
          onRequestDeleteFlight={() => Promise.resolve()}
          onRequestDelete={() => Promise.resolve()}
          onRequestSend={() => Promise.resolve()}
        />
      </div>
    ));
  }

  _renderActiveStams() {
    const { activeStams } = this.props;

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
          onRequestAddFlight={() => Promise.resolve()}
          onRequestDeleteFlight={() => Promise.resolve()}
          onRequestDelete={() => Promise.resolve()}
          onRequestSend={() => Promise.resolve()}
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

import { isVisible } from '../../reducers/ui/addStamModal';

type StateProps = {
  isAddStamDialogVisible: boolean,
  showAddStamDialog: () => void,
  hideAddStamDialog: () => void,
  addStam: * => void,
};

const mapStateToProps = state => ({
  isAddStamDialogVisible: isVisible(state),
});

import {
  showDialog as showAddStamDialog,
  hideDialog as hideAddStamDialog,
  commitStam as addStam,
} from '../../actions/stam';

const mapDispatchToProps = {
  showAddStamDialog,
  hideAddStamDialog,
  addStam,
};

export default connect(mapStateToProps, mapDispatchToProps)(FmpMain);
