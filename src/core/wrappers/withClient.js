import { connect } from 'react-redux';

import {
  getCwpId,
  getCwpType,
  isCwpDisabled,
  getCwpName,
} from '../selectors/cwp';

const getClient = state => ({
  id: getCwpId(state),
  type: getCwpType(state),
  disabled: isCwpDisabled(state),
  name: getCwpName(state),
});

const mapStateToProps = state => ({
  client: getClient(state),
});

export default connect(mapStateToProps);
