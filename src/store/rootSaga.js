// @flow
import { fork } from 'redux-saga/effects';

import atfcmSaga from '../modules/atfcm/sagas';

const sagas = [
  atfcmSaga,
];

export function createRootSaga() {
  return function* rootSaga(): Generator<*, *, *> {
    yield sagas.map(saga => fork(saga));
  };
}
