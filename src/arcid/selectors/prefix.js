import _ from 'lodash';

export default function prefix(state) {
  return _.get(state, 'arcid');
}
