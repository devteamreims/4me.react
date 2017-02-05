// @flow

import {
  DEL_REQUEST,
  DEL_FAILURE,
  DEL_SUCCESS,
} from '../actions/flight';

import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';

const mockDelete = id => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({id});
  }, 2000);
});

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
  ];
}
