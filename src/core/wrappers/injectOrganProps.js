// @flow
import { connect } from 'react-redux';

import type { Sectors, Client } from '../types/index';
import type { RootState } from '../../store/rootReducer';

import {
  getClient,
} from '../selectors/client';

import {
  getSectors,
} from '../selectors/sector';

type ExpectedProps = {
  sectors: Sectors,
  client: Client,
};

const mapStateToProps = (state: RootState): ExpectedProps => {
  const sectors = getSectors(state);
  const client = getClient(state);

  if(!client) {
    throw new Error('Unknown client !');
  }


  const props = {
    sectors,
    client,
  };

  return props;
};

// Heavily inspired by react-redux types declaration
export function injectOrganProps<OP>(
  Component: Class<React$Component<*, OP, *>>
): Class<React$Component<*, ExpectedProps & OP, *>> {
  return connect(mapStateToProps)(Component);
}


export const injectExtendedOrganProps = injectOrganProps;
