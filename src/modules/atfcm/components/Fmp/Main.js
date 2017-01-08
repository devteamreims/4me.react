// @flow
import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import Dialog from 'material-ui/Dialog';

import AddStamButton from './AddStamButton';

const columnStyle = {
  padding: 10,
};

type State = {
  showAddStamDialog: boolean,
};

class FmpMain extends Component {
  state: State;

  constructor(props: {}) {
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
            <div style={{textAlign: 'center'}}>
              <AddStamButton onClick={this.handleOpenDialog} />
            </div>
          </Flexbox>
          <Flexbox
            flexDirection="column"
            flexGrow={1}
            style={columnStyle}
          >
            <h1>Active</h1>
          </Flexbox>
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
