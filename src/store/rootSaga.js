// @flow
import { fork } from 'redux-saga/effects';

const sagas = [];

export function createRootSaga(): * {
  return function *rootSaga() {
    yield sagas.map(saga => fork(saga));
  };
}
