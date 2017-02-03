// @flow

export default {
  xman: {
    uri: 'xman',
    stateSlice: 'xman',
  },
  mapping: {
    uri: 'mapping',
    stateSlice: 'mapping',
  },
  etfmsProfile: {
    uri: 'etfms-profile',
    stateSlice: 'etfmsProfile',
  },
  example: {
    uri: 'example-module',
    stateSlice: 'exampleModule',
  },
  atfcm: {
    uri: 'atfcm',
    stateSlice: 'atfcm',
  },
};

export type ModuleState = {
  xman: Object,
  mapping: Object,
  etfmsProfile: Object,
  example: Object,
  atfcm: Object,
};
