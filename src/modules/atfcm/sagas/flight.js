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

const mockCommit = flight => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject({
      message: 'An error occured',
      fields: {
        arcid: 'This flight does not exist',
        'constraint.beacon': 'This beacon does not exist',
      },
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
      response: call(mockCommit, flight),
      timeout: call(delay, 5000),
    });

    if(timeout) {
      throw new Error('Request timeout');
    }

    yield put({type: ADD_SUCCESS});
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
