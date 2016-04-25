import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'status', {});

const getSocketStatus = (state) => _.get(getRaw(state), 'socket');
const getPrettySocketStatus = (state) => {
  return {
    ...getSocketStatus(state),
    name: 'XMAN Socket',
    description: 'Realtime socket connection to XMAN backend',
  };
};

const getFetchersStatuses = (state) => _.get(getRaw(state), 'fetcherServices');
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
    status: 'normal',
    items,
  };
};
