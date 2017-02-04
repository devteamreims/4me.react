// @flow

import R from 'ramda';

// Formsy validations helpers

import { sectors } from '../../../shared/env';

// A bunch of validation functions
const doesSectorExist = (sector: any) => {
  if(typeof sector !== 'string') {
    return false;
  }

  return sectors.getElementarySectors().includes(sector);
};

export const checkSectorExistence = (values: Object, value: mixed) => {
  if(!value) {
    return true;
  }

  return doesSectorExist(R.toUpper(value)) ? true : 'This sector does not exist';
};
