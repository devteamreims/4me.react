import { connect } from 'react-redux';

import {
  getClient,
} from '../selectors/cwp';

import {
  getSectors,
} from '../selectors/sector';

const getMapStateToProps = slug => {
  return state => {
    const sectors = getSectors(state);
    const client = getClient(state);


    const props = {
      sectors,
      client,
      slug,
    };

    return props;
  };
};

export const injectOrganProps = slug => Component => {
  const mapStateToProps = getMapStateToProps(slug);

  return connect(mapStateToProps)(Component);
};


export const injectExtendedOrganProps = injectOrganProps;
