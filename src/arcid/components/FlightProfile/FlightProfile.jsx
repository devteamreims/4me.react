import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import _ from 'lodash';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import Spinner from '../Spinner';
import PointProfile from './PointProfile';
import TimeAgo from '../../../utils/components/TimeAgo';

const styles = {
  container: {
    //margin: 10,
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
  },
};

class FlightProfile extends Component {

  handleForceRefresh = (event) => {
    const {
      fetchProfile,
      flight,
    } = this.props;

    fetchProfile(flight, true);
  };

  render() {
    const {
      selectedIfplId,
      isErrored,
      error,
      flight,
      isEmpty,
      isLoading,
    } = this.props;

    let Content;

    if(isErrored) {
      Content = (
        <span>{error}</span>
      );
    } else if(isEmpty) {
      Content = (
        <span></span>
      );
    } else {

      const formattedEobt = moment.utc(flight.eobt).format('YYYY-MM-DD HH:mm');
      Content = (
        <div style={{display: 'flex', flexGrow: '1', flexDirection: 'column'}}>
          <div
            style={{
              display: 'flex',
              flexGrow: '0',
              flexShrink: '0',
              flexDirection: 'column',
              padding: '10px',
            }}
          >
            <h1>{flight.callsign}</h1>
            <span>{flight.departure} -> {flight.destination}</span>
            <span>EOBT : {flight.eobt}</span>
            <span>Delay: {flight.delay} min</span>
            <span>Type of aircraft : {flight.aircraftType}</span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              <div>Last Updated : <TimeAgo when={flight.fetched} /></div>
              <FlatButton
                label="Force refresh"
                onTouchTap={this.handleForceRefresh}
              />
            </div>
          </div>
          <Divider style={{flexShrink: '0'}}/>
          <PointProfile
            pointProfile={flight.pointProfile}
          />
        </div>
      );
    }


    return (
      <div style={styles.container}>
        <Spinner show={isLoading} />
        {Content}
      </div>
    );
  }
}

import {
  getSelectedIfplId,
  isErrored,
  getError,
  getProfile,
  isEmpty,
  isLoading,
} from '../../selectors/profile';

const mapStateToProps = state => {
  return {
    selectedIfplId: getSelectedIfplId(state),
    isErrored: isErrored(state),
    error: getError(state),
    flight: getProfile(state),
    isEmpty: isEmpty(state),
    isLoading: isLoading(state),
  };
};

import {
  getProfile as fetchProfile,
} from '../../actions/profile';

const mapDispatchToProps = {
  fetchProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightProfile);
