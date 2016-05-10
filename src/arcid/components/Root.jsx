import React, { Component } from 'react';

import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';

import SearchBox from './SearchBox';
import HistoryOrResults from './HistoryOrResults';
import FlightProfile from './FlightProfile';

import ErrorModal from '../../core/components/ErrorModal';

import theme from '../../theme';

const style = {
  outer: {
    //border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100%',
    position: 'relative',
    width: '100%',
  },
  leftPanel: {
    overflowX: 'hidden',
    width: '282px',
    //paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
  },
  rightPanel: {
    flexGrow: '1',
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '200px',
  },
  searchBoxContainer: {
    padding: 10,
    paddingRight: 0,
    backgroundColor: theme.palette.primary1Color,
    flexGrow: '0',
    flexShrink: '0',
  },
  history: {
    flexGrow: '1',
    overflowY: 'auto',
  }
};


class ArcidRoot extends Component {
  render() {
    const {
      isErrored,
    } = this.props;

    if(isErrored) {
      return (
        <ErrorModal
          title="ARCID unavailable"
        >
          Could not connect to arcid backend
        </ErrorModal>
      );
    }

    return (
      <div style={style.outer}>
        <Paper
          zDepth={3}
          style={style.leftPanel}
        >
          <div style={style.searchBoxContainer}>
            <SearchBox />
          </div>
          <Divider style={{flexShrink: '0'}}/>
          <HistoryOrResults />
        </Paper>
        <Paper
          zDepth={1}
          style={style.rightPanel}
        >
          <FlightProfile />
        </Paper>
      </div>
    );
  }
}

import {
  isErrored,
} from '../selectors/status';

const mapStateToProps = (state) => {
  return {
    isErrored: isErrored(state),
  };
};

export default connect(mapStateToProps)(ArcidRoot);
