import React from 'react';
import { connect } from 'react-redux';

import R from 'ramda';

import TimeAgo from '../../../utils/components/TimeAgo';

const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  when: {},
  sectors: {},
};

const AppliedBy = ({cwpName, prettifySectors, sectors, when}) => {
  const prettySectors = prettifySectors(sectors);

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
};

AppliedBy.propTypes = {
  ifplId: React.PropTypes.string.isRequired,
};

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

  const cwpName = getAppliedByCwpName(state, ifplId);
  const when = getAppliedByWhen(state, ifplId);

  return {
    sectors,
    cwpName,
    when,
    flight,
  };
};

import withPrettifySectors from '../../../core/wrappers/withPrettifySectors';

export default R.pipe(
  withPrettifySectors,
  connect(mapStateToProps),
)(AppliedBy);
