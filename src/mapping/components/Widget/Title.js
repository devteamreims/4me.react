import React, {Component} from 'react';
import {connect} from 'react-redux';

import getEnv from '4me.env';
const { prettyName } = getEnv(window.FOURME_CONFIG.FOURME_ENV).sectors;

import R from 'ramda';

class WidgetTitle extends Component {
  static propTypes = {
    selectedCwpId: React.PropTypes.number,
    sectors: React.PropTypes.arrayOf(React.PropTypes.string),
    prettySectors: React.PropTypes.string,
    cwpName: React.PropTypes.string,
    sectorCount: React.PropTypes.number,
  };

  static defaultProps = {
    sectorCount: 0,
  };

  render() {
    const {
      selectedCwpId,
      sectors,
      sectorCount,
    } = this.props;

    if(!selectedCwpId || R.isEmpty(sectors)) {
      return (
        <span>
          {sectorCount} sectors
        </span>
      );
    }

    const {
      cwpName,
    } = this.props;

    return (
      <span>
        {cwpName}: {prettyName(sectors)}
      </span>
    );
  }
}


import {
  getSectorsByCwpId,
} from '../../selectors/map';

import {
  getName,
} from '../../selectors/cwp';

const mapStateToProps = (state, ownProps) => {
  if(!ownProps.selectedCwpId) {
    return {};
  }

  const sectors = getSectorsByCwpId(state, ownProps.selectedCwpId);
  const cwpName = getName(state, ownProps.selectedCwpId);

  return {
    cwpName,
    sectors,
  };
};

export default connect(mapStateToProps)(WidgetTitle);
