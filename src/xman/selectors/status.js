import _ from 'lodash';
import p from './prefix';

import {
  maxStatus,
} from '../../core/selectors/status';

export const getRaw = (state) => _.get(p(state), 'status', {});

const getSocketStatus = (state) => _.get(getRaw(state), 'socket');
const getPrettySocketStatus = (state) => {
  return {
    ...getSocketStatus(state),
    name: 'XMAN Socket',
    description: 'Realtime socket connection to XMAN backend',
  };
};

export const getFetchersStatuses = (state) => _.get(getRaw(state), 'fetcherServices');

export const getSingleFetcherStatus = (state, fetcher) => _.get(getFetchersStatuses(state), fetcher);

export const doesFetcherExist = (state, fetcher) => !_.isEmpty(getSingleFetcherStatus(state, fetcher));

const getPrettyFetchersStatuses = (state) => {
  const prettyData = fetcher => ({
    name: `XMAN Fetcher : ${fetcher}`,
    description: `${fetcher} XMAN data source`,
  });

  return _.map(getFetchersStatuses(state), (value, key) => ({
    ...value,
    ...prettyData(key),
  }));
};

const getPositionServiceStatus = (state) => _.get(getRaw(state), 'positionService');
const getPrettyPositionServiceStatus = (state) => {
  return {
    ...getPositionServiceStatus(state),
    name: 'XMAN Flight positions',
    description: 'Data source for flight positions',
  };
};


export const getStatus = (state) => {
  const items = [
    getPrettySocketStatus(state),
    ...getPrettyFetchersStatuses(state),
    getPrettyPositionServiceStatus(state),
  ];

  return {
    status: maxStatus(_.map(items, item => item.status)),
    items,
  };
};

export const isForcedOff = (state, fetcher) => {
  return _.get(getSingleFetcherStatus(state, fetcher), 'forceOff', false);
};

export const isForcedMcs = (state, fetcher) => {
  return _.get(getSingleFetcherStatus(state, fetcher), 'forceMcs', false);
};


export const getMessages = (state) => {
  let messages = [];

  if(_.get(getSocketStatus(state), 'status', 'normal') !== 'normal') {
    return ['Could not reach XMAN backend'];
  }

  if(_.get(getPositionServiceStatus(state), 'status', 'normal') !== 'normal') {
    messages.push('XMAN could not fetch flight positions');
  }

  _.each(getFetchersStatuses(state), (value, fetcher) => {
    if(_.get(value, 'status', 'normal') === 'critical') {
      messages.push(`XMAN could not fetch ${fetcher} flights`);
    } else if(_.get(value, 'status', 'normal') !== 'normal') {
      messages.push(_.get(value, 'error', `Something is wrong with ${fetcher} data`));
    } else if(isForcedOff(state, fetcher)) {
      messages.push(`XMAN ${fetcher} has been turned off by the supervisor`);
    } else if(isForcedMcs(state, fetcher)) {
      messages.push(`XMAN ${fetcher} is in minimum clean speed mode`);
    }
  });

  return messages;
};

export const shouldDisplayList = (state) => {
  // Lost connection to backend
  if(_.get(getSocketStatus(state), 'status', 'normal') !== 'normal') {
    return false;
  }

  // Position service is off
  if(_.get(getPositionServiceStatus(state), 'status', 'normal') !== 'normal') {
    return false;
  }

  // Fetchers in warning state won't hide the flight list
  const areAllFetchersOk = _.every(
    _(getFetchersStatuses(state))
      .map(val => _.get(val, 'status', 'normal'))
      .value(),
    status => status !== 'critical'
  );

  if(!areAllFetchersOk) {
    return false;
  }

  return true;
};

export const shouldDisplayMessage = (state) => {
  return !_.isEmpty(getMessages(state));
};
