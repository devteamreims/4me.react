import _ from 'lodash';

import xman from './xman';
import arcid from './arcid';
import mapping from './mapping';

const stubNotifications = {};

const getNotifications = () => {
  return stubNotifications;
};

const stubStatus = {
  status: 'normal',
  items: [],
};

const getStatus = () => {
  return stubStatus;
};

const defaults = {
  bootstrap: () => () => {},
  getNotifications,
  onSectorChange: () => () => {},
  getStatus,
};

const organs = _(
  [
    xman,
    arcid,
    mapping,
  ]
)
  .map(organ => _.defaults(organ, defaults))
  .map(organ => Object.assign({}, {
    linkTo: _.kebabCase(organ.name),
    displayName: _.capitalize(organ.name),
  }, organ))
  .value();

export function getReducers() {
  return _.reduce(organs, (prev, organ) => {
    if(!organ.rootReducer) {
      return prev;
    }
    return _.merge(prev, {[organ.name]: organ.rootReducer});
  }, {});
}


export default organs;
