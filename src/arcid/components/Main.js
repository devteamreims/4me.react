import React, { Component } from 'react';

import { connect } from 'react-redux';
import R from 'ramda';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import SearchBox from './SearchBox';
import HistoryOrResults from './HistoryOrResults';
import FlightProfile from './FlightProfile';

import ErrorModal from '../../core/components/ErrorModal';
import RedirectToDashboard from '../../core/components/RedirectToDashboard';

import theme from '../../theme';

const style = {
  outer: {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100%',
    position: 'relative',
    width: '100%',
  },
  leftPanel: {
    overflowX: 'hidden',
    maxWidth: 282,
    // paddingLeft: 10,
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
      sectors,
    } = this.props;

    const shouldRedirectToDashboard = !R.isEmpty(sectors);

    if(isErrored) {
      return (
        <ErrorModal
          title="ETFMS PROFILE unavailable"
        >
          {shouldRedirectToDashboard && <RedirectToDashboard />}
          Could not connect to arcid backend
        </ErrorModal>
      );
    }

    return (
      <div style={style.outer}>
        {shouldRedirectToDashboard && <RedirectToDashboard />}
        <Paper
          zDepth={3}
          style={style.leftPanel}
        >
          <div style={style.searchBoxContainer}>
            <SearchBox />
          </div>
          <Divider style={{flexShrink: '0'}} />
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
