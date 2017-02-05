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
  ARCHIVE_SUCCESS,
  ARCHIVE_REQUEST,
  ARCHIVE_FAILURE,
} from '../actions/stam';

import { removeOrphanFlights } from '../actions/flight';

import { getStamById } from '../reducers/entities/stams';

import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';

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

const mockArchive = ({id, when}) => new Promise((resolve, reject) => {
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
    const stam = yield select(getStamById, id);

    yield put({type: DEL_SUCCESS, id});

    if(stam.flights && stam.flights.length) {
      const ids = stam.flights.map(flight => flight.id);
      yield put(removeOrphanFlights(ids));
    }
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

export function* archiveStam({id, when}): Generator<*, *, *> {
  try {
    const data = yield call(mockArchive, {id, when});
    yield put({type: ARCHIVE_SUCCESS, id, when});
  } catch(error) {
    yield put({type: ARCHIVE_FAILURE, id});
  }
}

export default function* stamSaga(): Generator<*, *, *> {
  yield [
    takeLatest(ADD_REQUEST, commitStam),
    takeEvery(DEL_REQUEST, deleteStam),
    takeEvery(SEND_REQUEST, sendStam),
    takeEvery(ARCHIVE_REQUEST, archiveStam),
  ];
}
