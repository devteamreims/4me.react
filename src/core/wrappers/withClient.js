import { connect } from 'react-redux';

import {
  getClient,
} from '../selectors/cwp';

const mapStateToProps = state => ({
  client: getClient(state),
});

export default connect(mapStateToProps);
