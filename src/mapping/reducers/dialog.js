import _ from 'lodash';

import {
  OPEN,
  CLOSE,
} from '../actions/dialog';

const defaultState = {
  open: false,
  cwpId: null,
};

export default function dialogReducer(state = defaultState, action) {
  switch(action.type) {
    case OPEN:
      return {
        open: true,
        cwpId: action.cwpId,
      };
    case CLOSE:
      return {
        open: false,
        cwpId: null,
      };
  }
  return state;
}
