import React, { Component } from 'react';

import TrendUp from 'material-ui/lib/svg-icons/action/trending-up';
import TrendFlat from 'material-ui/lib/svg-icons/action/trending-flat';
import TrendDown from 'material-ui/lib/svg-icons/action/trending-down';


import {
  blue500,
  green500,
} from 'material-ui/lib/styles/colors';

const colors = {
  CLIMB: blue500,
  CRUISE: undefined,
  DESCENT: green500,
};

class Trend extends Component {

  render() {
    const {
      trend,
    } = this.props;

    const color = colors[trend];

    switch(trend) {
      case 'CLIMB':
        return <TrendUp color={color} />
      case 'CRUISE':
        return <TrendFlat color={color} />
      case 'DESCENT':
        return <TrendDown color={color} />
    }

    return (
      <span></span>
    );
  }
}

Trend.propTypes = {
  trend: React.PropTypes.oneOf(['CLIMB', 'CRUISE', 'DESCENT']).isRequired,
};

export default Trend;
