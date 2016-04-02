import React, { Component } from 'react';

import { connect } from 'react-redux';

import CwpButton from './CwpButton';
import CwpDialog from './CwpDialog';

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
    }
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
    }
  },
};

class MappingButtons extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div style={styles.outerDiv}>
        {_.map(['north', 'west', 'east'], pos =>
          <div
            key={pos}
            style={styles[pos].container}
          >
            {_.map(cwpRows[pos], cwpId =>
              <div key={cwpId} style={styles[pos].element}>
                <CwpButton cwpId={cwpId} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

class MappingRoot extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isDialogOpen !== this.props.isDialogOpen;
  }

  render() {
    return (
      <div>
        <CwpDialog
          open={this.props.isDialogOpen}
          modal={false}
          cwpId={this.props.cwpId}
          onRequestClose={this.props.closeDialog}
        />
        <MappingButtons />
      </div>
    );
  }
}

import {
  isOpen,
  getCwpId,
} from '../selectors/dialog';

import {
  close as closeDialog
} from '../actions/dialog';

const mapStateToProps = (state) => {
  const isDialogOpen = isOpen(state);
  const cwpId = getCwpId(state);

  return {
    isDialogOpen,
    cwpId,
  };
};

const mapDispatchToProps = {
  closeDialog,
};


export default connect(mapStateToProps, mapDispatchToProps)(MappingRoot);