// @flow

import {
  AUTOCOMPLETE_REQUEST,
  complete,
  error,
} from '../actions/autocomplete';

import {
  takeEvery,
  call,
  put,
  race,
} from 'redux-saga/effects';

import { delay } from 'redux-saga';

const mockAutocomplete = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([
      'AFR1234',
      'BAW456',
      'GAMXZ',
    ]);
  }, 2000);
});


export function* fetchAutocomplete(): Generator<*, *, *> {
  try {
    const { response, timeout } = yield race({
      response: call(mockAutocomplete),
      timeout: call(delay, 5000),
    });

    if(timeout) {
      throw new Error('Request timeout');
    }

    yield put(complete(response));
  } catch(err) {
    yield put(error(err));
  }
}

export default function* autocompleteSaga(): Generator<*, *, *> {
  yield [
    takeEvery(AUTOCOMPLETE_REQUEST, fetchAutocomplete),
  ];
}
