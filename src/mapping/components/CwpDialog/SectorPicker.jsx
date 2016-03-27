import React, { Component } from 'react';
import _ from 'lodash';

import Checkbox from 'material-ui/lib/checkbox';

const FOURN = ['HN', 'KN', 'UB', 'UN'];
const FIVER = ['HR', 'YR', 'KR', 'XR', 'UR'];

class SectorPicker extends Component {

  constructor(props) {
    super(props);
  }

  isSectorDisabled = (sector) => {
    return _.includes(this.props.boundSectors, sector);
  };

  isSectorChecked = (sector) => {
    return _.includes(this.props.tempSectors, sector);
  };

  render() {
    return (
      <div>
        {this.props.tempSectors}
        <fieldset>
          <legend
            onClick={this.props.toggleSectors(FOURN)}
          >4N</legend>
          {_.map(FOURN, sector => {
            return (
              <Checkbox
                key={sector}
                label={sector}
                checked={this.isSectorChecked(sector)}
                disabled={this.isSectorDisabled(sector)}
                onCheck={this.props.toggleSectors([sector])}
              />
            );
          })}
        </fieldset>
      </div>
    );
  }
}

SectorPicker.propTypes = {
  boundSectors: React.PropTypes.array.isRequired,
  tempSectors: React.PropTypes.array.isRequired,
  toggleSectors: React.PropTypes.func.isRequired,
};

export default SectorPicker;
