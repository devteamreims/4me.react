import { connect } from 'react-redux';

import {
  getPrettifySectors,
} from '../selectors/sectorTree';

const mapStateToProps = (state) => ({
  prettifySectors: getPrettifySectors(state),
});

export default Component => connect(mapStateToProps)(Component);
