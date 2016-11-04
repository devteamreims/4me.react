import { connect } from 'react-redux';

import {
  getClient,
} from '../selectors/cwp';

import {
  getSectors,
} from '../selectors/sector';

const mapStateToProps = state => {
  const sectors = getSectors(state);
  const client = getClient(state);


  const props = {
    sectors,
    client,
  };

  return props;
};

export const injectOrganProps = Component => {
  return connect(mapStateToProps)(Component);
};


export const injectExtendedOrganProps = injectOrganProps;
