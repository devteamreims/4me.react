import api from '../../../api';
import axios from 'axios';

export const SET_FORCE_OFF = 'xman/fetcher-status/SET_FORCE_OFF';
export const SET_FORCE_MCS = 'xman/fetcher-status/SET_FORCE_MCS';

import {
  doesFetcherExist,
  isForcedOff,
  isForcedMcs,
} from '../selectors/status';

export function toggleForceOff(fetcher, value) {
  return (dispatch, getState) => {
    if(!doesFetcherExist(getState(), fetcher)) {
      console.log(`xman/actions/fetcherStatus/toggleForceOff: ${fetcher} does not exist !`);
      return;
    }

    const newStatus = value === undefined ? !isForcedOff(getState(), fetcher) : !!value;

    const apiUrl = api.xman.status.setFetcher(fetcher);

    const params = {forceOff: newStatus};

    dispatch(setForceOffAction(fetcher, newStatus));

    return axios.put(apiUrl, {...params})
      .catch(err => dispatch(setForceOffAction(fetcher, !newStatus))); // eslint-disable-line no-unused-vars
  };
}

export function toggleForceMcs(fetcher, value) {
  return (dispatch, getState) => {
    if(!doesFetcherExist(getState(), fetcher)) {
      console.log(`xman/actions/fetcherStatus/toggleForceMcs: ${fetcher} does not exist !`);
      return;
    }

    const newStatus = value === undefined ? !isForcedMcs(getState(), fetcher) : !!value;

    const apiUrl = api.xman.status.setFetcher(fetcher);

    const params = {forceMcs: newStatus};

    dispatch(setForceMcsAction(fetcher, newStatus));

    return axios.put(apiUrl, {...params})
      .catch(err => dispatch(setForceMcsAction(fetcher, !newStatus))); // eslint-disable-line no-unused-vars
  };
}

function setForceOffAction(fetcher, forceOff = false) {
  return {
    type: SET_FORCE_OFF,
    payload: {
      fetcher,
      forceOff,
    },
  };
}

function setForceMcsAction(fetcher, forceMcs = false) {
  return {
    type: SET_FORCE_MCS,
    payload: {
      fetcher,
      forceMcs,
    },
  };
}
