import React, { Component } from 'react';
import _ from 'lodash';

import Checkbox from 'material-ui/lib/checkbox';
import MicOk from 'material-ui/lib/svg-icons/av/mic';

import {
  success,
} from '../../../theme/colors';

const style = {
  legend: {
    cursor: 'pointer',
  },
};

class SingleGroupPicker extends Component {
  isSectorDisabled = (sector) => {
    return _.includes(this.props.boundSectors, sector);
  };

  isSectorChecked = (sector) => {
    return _.includes(this.props.tempSectors, sector);
  };

  render() {
    const {
      style,
      toggleSectors,
      backupedRadios,
      sectors,
      ...other
    } = this.props;

    return (
      <fieldset
        style={style}
      >
        <legend
          onClick={toggleSectors(this.props.sectors)}
          style={style.legend}
        >
          {this.props.groupName}
        </legend>
        {_.map(sectors, sector => {
          let label = sector;
          if(_.includes(backupedRadios, sector)) {
            label = (
              <span>
                {sector}
                <MicOk style={{width: 16, height: 16}} color={success} />
              </span>
            );
          }
          return (
              <Checkbox
              key={sector}
              label={label}
              checked={this.isSectorChecked(sector)}
              disabled={this.isSectorDisabled(sector)}
              onCheck={toggleSectors([sector])}
            />
          );
        })}
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
  backupedRadios: React.PropTypes.array.isRequired,
};

export default SingleGroupPicker;
