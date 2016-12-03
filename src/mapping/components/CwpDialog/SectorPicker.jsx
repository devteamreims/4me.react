import React, { Component } from 'react';
import getEnv from '4me.env';

const {
  getClusters,
  getSectorGroupByElementarySectors,
} = getEnv('LFEE').sectors;

import SingleGroupPicker from './SingleGroupPicker';

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

    const clusters = getClusters();

    return (
      <div style={styles.outerDiv}>
        {clusters.map((cluster, index) =>
          <div
            key={index}
            style={styles.innerDiv}
          >
            {cluster.map((sectorBlock, index) =>
              <SingleGroupPicker
                key={index}
                boundSectors={boundSectors}
                tempSectors={tempSectors}
                toggleSectors={toggleSectors}
                groupName={getSectorGroupByElementarySectors(sectorBlock).name}
                sectors={sectorBlock}
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
