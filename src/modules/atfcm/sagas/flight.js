// @flow

import {
  DEL_REQUEST,
  DEL_FAILURE,
  DEL_SUCCESS,
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
  commitFlightError,
} from '../actions/flight';

import {
  takeEvery,
  takeLatest,
  call,
  put,
  select,
  race,
} from 'redux-saga/effects';

import { delay } from 'redux-saga';

const mockCommit = (flight, stamId) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject({
    //   message: 'An error occured',
    //   fields: {
    //     arcid: 'This flight does not exist',
    //     'constraint.beacon': 'This beacon does not exist',
    //   },
    // });
    //
/*
    arcid: Arcid,
    constraint: {
      beacon: string,
      flightLevel: number,
    },
    implementingSector: ElementarySector,
    onloadSector: ElementarySector,
*/
    const idNum = Math.floor(Math.random() * 10000 + 1);
    const id = `stam_${idNum}`;
    resolve({
      id,
      ...flight,
    });
  }, 2000);
});

const mockDelete = id => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({id});
  }, 2000);
});

export function* commitFlight({flight, stamId}): Generator<*, *, *> {
  try {
    if(!stamId) {
      return;
    }

    const { response, timeout } = yield race({
      response: call(mockCommit, flight, stamId),
      timeout: call(delay, 5000),
    });

    if(timeout) {
      throw new Error('Request timeout');
    }


    yield put({type: ADD_SUCCESS, stamId, flight: response});
  } catch(err) {
    yield put(commitFlightError(err));
  }
}

export function* deleteFlight({id}): Generator<*, *, *> {
  try {
    const data = yield call(mockDelete, id);
    yield put({type: DEL_SUCCESS, id});
  } catch(error) {
    yield put({type: DEL_FAILURE, id, error});
  }
}

export default function* flightSaga(): Generator<*, *, *> {
  yield [
    takeEvery(DEL_REQUEST, deleteFlight),
    takeLatest(ADD_REQUEST, commitFlight),
  ];
}
