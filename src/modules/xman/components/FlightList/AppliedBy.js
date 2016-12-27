import React from 'react';
import { connect } from 'react-redux';

import { sectors as envSectors } from '../../../../shared/env';
const { prettyName } = envSectors;

import TimeAgo from '../../../../shared/components/TimeAgo';

const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  when: {},
  sectors: {},
};

const AppliedBy = ({cwpName, sectors, when}) => {
  const prettySectors = prettyName(sectors);

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

export default connect(mapStateToProps)(AppliedBy);
