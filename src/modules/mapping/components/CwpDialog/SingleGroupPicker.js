import React, { Component } from 'react';
import _ from 'lodash';

import {mapping as mappingConfig} from '../../../../config';

import Checkbox from 'material-ui/Checkbox';
import MicOk from 'material-ui/svg-icons/av/mic';

import {
  success,
} from '../../../../theme/colors';

class SingleGroupPicker extends Component {
  isSectorDisabled = (sector) => {
    return _.includes(this.props.boundSectors, sector);
  };

  isSectorChecked = (sector) => {
    return _.includes(this.props.tempSectors, sector);
  };

  shouldDisplayEmergencyFrequencies() {
    return !_.get(mappingConfig, 'disableEmergencyRadios', false);
  }

  render() {
    const {
      style,
      toggleSectors,
      backupedRadios,
      sectors,
    } = this.props;

    return (
      <fieldset
        style={style}
      >
        <legend
          onClick={toggleSectors(this.props.sectors)}
          style={{cursor: 'pointer'}}
        >
          {this.props.groupName}
        </legend>
        {_.map(sectors, sector => {
          let label = sector;
          if(_.includes(backupedRadios, sector)) {
            label = (
              <span>
                {sector}
                {this.shouldDisplayEmergencyFrequencies() &&
                  <MicOk style={{width: 16, height: 16}} color={success} />
                }
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
