import {
  isLoading as isMappingLoading, // eslint-disable-line no-unused-vars
  getMap,
  getSectorsByCwpId,
  isEmpty as isCwpEmpty,
} from '../selectors/map';

import {
  getCwpById,
} from '../selectors/cwp';

import axios from 'axios';
import _ from 'lodash';

import api from '../../api';

export const FETCH = 'mapping/map/FETCH';
export const FETCH_FAIL = 'mapping/map/FETCH_FAIL';
export const FETCH_COMPLETE = 'mapping/map/FETCH_COMPLETE';

export const COMMIT = 'mapping/map/COMMIT';
export const COMMIT_COMPLETE = 'mapping/map/COMMIT_COMPLETE';
export const COMMIT_FAIL = 'mapping/map/COMMIT_FAIL';

export const SET_CWP_STATUS = 'mapping/map/SET_CWP_STATUS';

// Refresh CWPs
// Uses redux thunk
export function refreshMap() {
  return (dispatch) => {
    // Check if loading
    // let isLoading = isMappingLoading(getState());

    // Here we should abort current request and restart one
    // This is not currently implemented in axios
    // See here : https://github.com/mzabriskie/axios/issues/50

    // Current workaround is to let first request fly and to just resend one
    /*
    if(isLoading) {
      console.log('Already loading !!');
      return;
    }
    */

    dispatch(start());

    const apiUrl = api.mapping.map.getMap;


    console.log('Loading Mapping from backend');

    return axios.get(apiUrl)
      .then((response) => {
        return dispatch(complete(response.data));
      })
      .catch((error) => {
        return dispatch(fail(error));
      });
  };
}

export function bindSectorsToCwp(cwpId, sectors) {
  return (dispatch, getState) => {
    // Sanity check
    const cwpExists = !_.isEmpty(getCwpById(getState(), cwpId));

    if(!cwpExists) {
      console.log(`Could not bind sectors to unknown cwp : ${cwpId}!`);
      return Promise.reject();
    }

    const boundSectors = getSectorsByCwpId(getState(), cwpId);

    if(!_.isEmpty(_.without(boundSectors, ...sectors))) {
      console.log(`Could not remove sectors from cwp : ${cwpId}`);
      return Promise.reject();
    }

    if(_.isEmpty(_.without(sectors, ...boundSectors))) {
      console.log(`Nothing more bound to cwp ${cwpId}, discard`);
      return Promise.resolve();
    }

    const removeSectorsFromOtherCwps = (cwp) => {
      const newSectors = _(_.get(cwp, 'sectors', []))
        .without(...sectors)
        .value();
      return Object.assign({}, cwp, {sectors: newSectors});
    };

    const addSectorsToGivenCwp = () => {
      const newSectors = _(boundSectors)
        .concat(...sectors)
        .uniq()
        .value();

      return {
        cwpId: parseInt(cwpId),
        sectors: newSectors
      };
    };

    // Compute new map
    const newMap = _(getMap(getState()))
      .reject(cwp => cwp.cwpId === cwpId)
      .map(removeSectorsFromOtherCwps)
      .reject(cwp => _.isEmpty(cwp.sectors))
      .concat(addSectorsToGivenCwp())
      .value();

    console.log('New map is :');
    console.log(newMap);

    // commitMap (we will get a refresh signal from the backend)
    return dispatch(commitMap(newMap));
  };
}

export function setStatus(cwpId, disabled = false) {
  return (dispatch, getState) => {
    const isEmpty = isCwpEmpty(getState(), cwpId);

    if(disabled && !isEmpty) {
      console.log(`Could not disable CWP ${cwpId} : bound sectors are still here !`);
      return Promise.reject();
    }

    return Promise.resolve(dispatch(setCwpStatusAction(cwpId, disabled)))
      .then(() => getMap(getState()))
      .then((newMap) => dispatch(commitMap(newMap)))
      .then(() => dispatch(refreshMap()));
  };
}

function commitMap(map) {
  return (dispatch) => {
    dispatch(commitStart());

    const apiUrl = api.mapping.map.commit;

    return axios.post(apiUrl, map)
      .catch((error) => {
        return dispatch(commitFail(error));
      })
      .then((response) => {
        console.log('Commit complete !');
        console.log(response);
        return dispatch(commitComplete(response));
      });
  };
}

export function commitFail(rawError) {
  const error = rawError.message || rawError.statusText || 'Unknown error';
  return {
    type: COMMIT_FAIL,
    error,
  };
}

export function commitStart() {
  return {
    type: COMMIT,
  };
}

export function commitComplete() {
  return {
    type: COMMIT_COMPLETE,
  };
}

export function fail(rawError) {
  const error = rawError.message || rawError.statusText || 'Unknown error';
  return {
    type: FETCH_FAIL,
    error,
  };
}

export function start() {
  return {
    type: FETCH
  };
}


export function complete(map = []) {
  return {
    type: FETCH_COMPLETE,
    map,
  };
}

export function setCwpStatusAction(cwpId, disabled = false) {
  return {
    type: SET_CWP_STATUS,
    cwpId,
    disabled,
  };
}
