// @flow
import stamSaga from './stam';
import flightSaga from './flight';

import { fork } from 'redux-saga/effects';

export default function* atfcmSaga(): Generator<*, *, *> {
  console.log('ATFCM ROOT SAGA');
  yield [
    fork(stamSaga),
    fork(flightSaga),
  ];
}
