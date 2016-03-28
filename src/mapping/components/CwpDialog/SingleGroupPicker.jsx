import React, { Component } from 'react';
import _ from 'lodash';

import Checkbox from 'material-ui/lib/checkbox';

class SingleGroupPicker extends Component {
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
      <fieldset
        style={this.props.style}
      >
        <legend
          onClick={this.props.toggleSectors(this.props.sectors)}
        >
          {this.props.groupName}
        </legend>
        {_.map(this.props.sectors, sector =>
            <Checkbox
              key={sector}
              label={sector}
              checked={this.isSectorChecked(sector)}
              disabled={this.isSectorDisabled(sector)}
              onCheck={this.props.toggleSectors([sector])}
            />
        )}
      </fieldset>
    );
  }
}

SingleGroupPicker.propTypes = {
  boundSectors: React.PropTypes.array.isRequired,
  tempSectors: React.PropTypes.array.isRequired,
  toggleSectors: React.PropTypes.func.isRequired,
  groupName: React.PropTypes.string.isRequired,
  sectors: React.PropTypes.array.isRequired,
};

export default SingleGroupPicker;
