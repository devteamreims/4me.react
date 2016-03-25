import _ from 'lodash';

import Xman from './xman/Xman';
import Arcid from './arcid/Arcid';

const organs = [{
  name: 'xman',
  bootstrap: (dispatch, getState) => {console.log('Bootstrapping XMAN');},
  rootComponent: Xman,
  rootReducer: (state = {}, action) => state,
}, {
  name: 'arcid',
  bootstrap: (dispatch, getState) => {console.log('Bootstrapping ARCID');},
  rootComponent: Arcid,
}];

export function getReducers() {
  return _.reduce(organs, (prev, organ) => {
    if(!organ.rootReducer) {
      return prev;
    }
    return _.merge(prev, {[organ.name]: organ.rootReducer});
  }, {});
}


export default organs;
