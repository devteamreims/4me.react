import { connect } from 'react-redux';

import { getSectors } from '../selectors/sectors';

const mapStateToProps = (state) => ({
  sectors: getSectors(state),
});

const withSectors = connect(mapStateToProps);

export default withSectors;
