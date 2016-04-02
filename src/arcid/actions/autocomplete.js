export const START = 'arcid/autocomplete/START';
export const COMPLETE = 'arcid/autocomplete/COMPLETE';
export const CLEAR = 'arcid/autocomplete/CLEAR';

import _ from 'lodash';

import axios from 'axios';
import api from '../../api';

export function startSearch(query) {
  return (dispatch, getState) => {
    if(!query) {
      dispatch(clear());
      return;
    }

    const apiUrl = api.arcid.autocomplete(query);

    dispatch(startAction(query));

    return axios.get(apiUrl)
      .then(resp => {
        const results = resp.data;
        return dispatch(setAutocomplete(results));
      })
      .catch(err => {
        return dispatch({
          type: COMPLETE,
          flights: [],
          error: 'An error occured fetching arcid autocompletion',
          rawError: err
        });
      });

  }
}

export function clearSearch() {
  return {
    type: CLEAR,
  };
}

function setAutocomplete(flights) {
  return {
    type: COMPLETE,
    flights,
  };
}


function startAction(query = '') {
  return {
    type: START,
    query,
  };
}
