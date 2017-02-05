// @flow

import {
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
  DEL_SUCCESS,
  DEL_REQUEST,
  DEL_FAILURE,
} from '../actions/stam';

import { take, takeLatest, call, put } from 'redux-saga/effects';

const mockCommit = stam => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Invalid !'));
  }, 2000);
});

const mockDelete = id => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Stam does not exist !'));
  }, 2000);
});

export function* commitStam({stam}): Generator<*, *, *> {
  try {
    const data = yield call(mockCommit, stam);
    yield put({type: ADD_SUCCESS});
  } catch(error) {
    yield put({type: ADD_FAILURE, error});
  }
}

export function* deleteStam({id}): Generator<*, *, *> {
  try {
    const data = yield call(mockDelete, id);
    yield put({type: DEL_SUCCESS, id});
  } catch(error) {
    yield put({type: DEL_FAILURE, error});
  }
}

export default function* stamSaga(): Generator<*, *, *> {
  yield [
    takeLatest(ADD_REQUEST, commitStam),
    takeLatest(DEL_REQUEST, deleteStam),
  ];
}
