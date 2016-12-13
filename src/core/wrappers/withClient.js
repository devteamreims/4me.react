import { connect } from 'react-redux';

import {
  getClient,
} from '../selectors/client';

const mapStateToProps = state => ({
  client: getClient(state),
});

export default connect(mapStateToProps);
