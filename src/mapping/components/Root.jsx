import React, { Component } from 'react';

import { connect } from 'react-redux';

import CwpButton from './CwpButton';
import CwpDialog from './CwpDialog';
import RoomStatus from './RoomStatus';

import ErrorModal from '../../core/components/ErrorModal';

import _ from 'lodash';

const cwpRows = {
  north: [..._.range(20, 23 + 1), ..._.rangeRight(24, 27 + 1)],
  west: [..._.range(11, 13 + 1), ..._.rangeRight(14, 16 + 1)],
  east: [..._.range(30, 33 + 1), ..._.rangeRight(34, 37 + 1)],
};

const styles = {
  outerDiv: {
    display: 'flex',
    flexGrow: '0',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
    marginTop: '30px',
  },
  north: {
    container: {
      flexBasis: '100%',
      flexGrow: '1',
      display: 'flex',
      flexDirection: 'column-reverse',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignContent: 'center',
      maxHeight: '500px',
    },
    element: {
      flex: '1',
      flexBasis: '25%',
      flexGrow: '1',
      flexShrink: '0',
      textAlign: 'center',
      display: 'inline',
      padding: '5px',
    }
  },
  west: {
    container: {
      display: 'flex',
      flexGrow: '1',
      flexDirection: 'row-reverse',
      flexWrap: 'wrap-reverse',
      justifyContent: 'flex-start',
      maxWidth: '500px',
      paddingLeft: '100px',
    },
    element: {
      display: 'inline',
      padding: '5px',
      margin: '0',
    },
  },
  east: {
    container: {
      display: 'flex',
      flexGrow: '1',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '500px',
    },
    element: {
      display: 'inline',
      padding: '5px',
    },
  },
  roomStatus: {
    container: {
      display: 'flex',
      flexGrow: '0',
      flexDirection: 'row',
      flexWrap: 'wrap',
      //maxWidth: '100px',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};


class MappingButtons extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {

    const posToElement = pos => (
      <div
        key={pos}
        style={styles[pos].container}
      >
        {_.map(cwpRows[pos] || [], cwpId =>
          <div key={cwpId} style={styles[pos].element}>
            <CwpButton cwpId={cwpId} />
          </div>
        )}
      </div>
    );

    return (
      <div style={styles.outerDiv}>
        {posToElement('north')}
        {posToElement('west')}
        <div style={styles['roomStatus'].container}>
          <RoomStatus />
        </div>
        {posToElement('east')}
      </div>
    );
  }
}

class MappingRoot extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isDialogOpen !== this.props.isDialogOpen;
  }

  handleRequestClose = (event) => {
    const {
      closeDialog,
    } = this.props;

    closeDialog();
  };

  render() {
    const {
      isErrored,
      isDialogOpen,
      dialogCwpId,
    } = this.props;

    if(isErrored) {
      return (
        <ErrorModal
          title="MAPPING unavailable"
        >
          Could not connect to mapping backend
        </ErrorModal>
      );
    }

    return (
      <div>
        <CwpDialog
          open={isDialogOpen}
          modal={false}
          cwpId={dialogCwpId}
          onRequestClose={this.handleRequestClose}
        />
        <MappingButtons />
      </div>
    );
  }
}

import {
  isOpen,
  getCwpId as getDialogCwpId,
} from '../selectors/dialog';

import {
  isErrored,
} from '../selectors/status';

const mapStateToProps = (state) => {
  const isDialogOpen = isOpen(state);
  const dialogCwpId = getDialogCwpId(state);

  return {
    isDialogOpen,
    dialogCwpId,
    isErrored: isErrored(state),
  };
};

import {
  close as closeDialog
} from '../actions/dialog';

const mapDispatchToProps = {
  closeDialog,
};


export default connect(mapStateToProps, mapDispatchToProps)(MappingRoot);
