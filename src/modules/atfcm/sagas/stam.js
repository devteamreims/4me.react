// @flow

import {
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
} from '../actions/stam';

import { take, takeEvery, call, put } from 'redux-saga/effects';

const mockCommit = stam => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Invalid !')), 2000);
});

export function* commitStam({stam}) {
  try {
    const data = yield call(mockCommit, stam);
    yield put({type: ADD_SUCCESS});
  } catch(error) {
    yield put({type: ADD_FAILURE, error});
  }
}

export default function *stamSaga() {
  yield takeEvery(ADD_REQUEST, commitStam);
}
