import React, { Component } from 'react';
import _ from 'lodash';
import R from 'ramda';

import SingleGroupPicker from './SingleGroupPicker';

const defaultSectorGroups = [
  [
    {
      name: '4N',
      sectors: ['HN', 'KN', 'UB', 'UN'],
    }, {
      name: '5R',
      sectors: ['HYR', 'KR', 'XR', 'UR'],
    }
  ], [
    {
      name: 'KD2F',
      sectors: ['KD', 'KF', 'UF'],
    }, {
      name: '4H',
      sectors: ['HH', 'KH', 'XH', 'UH'],
    }, {
      name: '4E',
      sectors: ['HE', 'KE', 'XE', 'UE'],
    }, {
      name: 'FIR',
      sectors: ['E', 'SE'],
    },
  ],
];

const getSectorGroups = () =>
  R.pathOr(defaultSectorGroups, ['FOURME_CONFIG', 'CONTROL_ROOM', 'sectorGroups'], window);

class SectorPicker extends Component {
  render() {
    const {
      boundSectors,
      tempSectors,
      toggleSectors,
      backupedRadios,
    } = this.props;

    const styles = {
      outerDiv: {
        display: 'flex',
        flexDirection: 'column',
      },
      innerDiv: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
      },
      element: {
        flexGrow: 1,
      },
    };

    const sectorGroups = getSectorGroups();

    return (
      <div style={styles.outerDiv}>
        {_.map(sectorGroups, (topLevelGroup, index) =>
          <div
            key={index}
            style={styles.innerDiv}
          >
            {_.map(topLevelGroup, (group, index) =>
              <SingleGroupPicker
                key={index}
                boundSectors={boundSectors}
                tempSectors={tempSectors}
                toggleSectors={toggleSectors}
                groupName={group.name}
                sectors={group.sectors}
                style={styles.element}
                backupedRadios={backupedRadios}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

SectorPicker.propTypes = {
  boundSectors: React.PropTypes.array.isRequired,
  tempSectors: React.PropTypes.array.isRequired,
  toggleSectors: React.PropTypes.func.isRequired,
  backupedRadios: React.PropTypes.array.isRequired,
};

export default SectorPicker;
