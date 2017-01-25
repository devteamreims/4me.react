// @flow
import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import Dialog from 'material-ui/Dialog';
import VerticalDivider from '../../../../shared/components/VerticalDivider';

import AddStamButton from './AddStamButton';

import StamCard from './StamCard';

const columnStyle = {
  padding: 10,
  width: '33%',
  minHeight: '100%',
  overflowY: 'auto',
};

type State = {
  showAddStamDialog: boolean,
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
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      showAddStamDialog: false,
    };
  }

  handleOpenDialog = () => {
    this.setState({showAddStamDialog: true});
  };

  handleCloseDialog = () => {
    this.setState({showAddStamDialog: false});
  }

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
          key={stam.stamId}
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
      showAddStamDialog,
    } = this.state;

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
          </Flexbox>
          <VerticalDivider />
          <Flexbox
            flexDirection="column"
            flexGrow={1}
            style={columnStyle}
          >
            <h1>History</h1>
          </Flexbox>
          <Dialog
            open={showAddStamDialog}
            onRequestClose={this.handleCloseDialog}
          >
            Test !
          </Dialog>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default FmpMain;
