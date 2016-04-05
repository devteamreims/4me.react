import React, { Component } from 'react';
import { connect } from 'react-redux';

//import moment from 'moment';

import TimeAgo from '../../../utils/components/TimeAgo';


const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  when: {},
  sectors: {},
};

class AppliedBy extends Component {

  render() {
    const {
      cwpName,
      prettySectors,
      when,
      flight,
    } = this.props;

    return (
      <div style={style.wrapper}>
        <span
          style={style.sectors}
        >
          {prettySectors || cwpName}
        </span>
        {when !== 0 && <TimeAgo when={when} style={style.when} />}
      </div>
    );
  }
}

AppliedBy.PropTypes = {
  ifplId: React.PropTypes.string.isRequired,
};

import {
  getPrettifySectors,
} from '../../../core/selectors/sectorTree';

import {
  getAppliedBySectors,
  getAppliedByCwpName,
  getAppliedByWhen,
} from '../../selectors/flight';

import {
  getFlightByIfplId,
} from '../../selectors/flight-list';

const mapStateToProps = (state, ownProps) => {
  const { ifplId } = ownProps;

  const flight = getFlightByIfplId(state, ifplId);

  const sectors = getAppliedBySectors(state, ifplId);
  const prettySectors = getPrettifySectors(state)(sectors);

  const cwpName = getAppliedByCwpName(state, ifplId);
  const when = getAppliedByWhen(state, ifplId);

  return {
    prettySectors,
    sectors,
    cwpName,
    when,
    flight,
  };
};

export default connect(mapStateToProps)(AppliedBy);
