// @flow
import stamSaga from './stam';
import flightSaga from './flight';
import autocompleteSaga from './autocomplete';

import { fork } from 'redux-saga/effects';

export default function* atfcmSaga(): Generator<*, *, *> {
  console.log('ATFCM ROOT SAGA');
  yield [
    fork(stamSaga),
    fork(flightSaga),
    fork(autocompleteSaga),
  ];
}
