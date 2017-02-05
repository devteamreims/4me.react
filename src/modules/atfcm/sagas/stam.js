// @flow

import {
  ADD_REQUEST,
  ADD_SUCCESS,
  ADD_FAILURE,
  DEL_SUCCESS,
  DEL_REQUEST,
  DEL_FAILURE,
  SEND_SUCCESS,
  SEND_REQUEST,
  SEND_FAILURE,
} from '../actions/stam';

import { take, takeLatest, call, put } from 'redux-saga/effects';

const mockCommit = stam => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Invalid !'));
  }, 2000);
});

const mockDelete = id => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({id});
  }, 2000);
});

const mockSend = ({id, when}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({id, when});
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
    // Here, we need to remove orphan flights from our state
    // TODO
    yield put({type: DEL_SUCCESS, id});
  } catch(error) {
    yield put({type: DEL_FAILURE, id, error});
  }
}

export function* sendStam({id, when}): Generator<*, *, *> {
  try {
    const data = yield call(mockSend, {id, when});
    yield put({type: SEND_SUCCESS, id, when});
  } catch(error) {
    yield put({type: SEND_FAILURE, id});
  }
}

export default function* stamSaga(): Generator<*, *, *> {
  yield [
    takeLatest(ADD_REQUEST, commitStam),
    takeLatest(DEL_REQUEST, deleteStam),
    takeLatest(SEND_REQUEST, sendStam),
  ];
}
