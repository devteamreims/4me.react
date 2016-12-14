// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';

import Widget from '../../../core/components/Dashboard/Widget';

import getEnv from '4me.env';
const { getControlRoomLayout } = getEnv(window.FOURME_CONFIG.FOURME_ENV).components;
const ControlRoomLayout = getControlRoomLayout();

import CwpButton from './CwpButton';
import Title from './Title';

import { uri } from '../../';

class ControlRoomWidget extends Component {
  static propTypes = {
    cols: React.PropTypes.number,
    sectorCount: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    cols: 1,
  };

  state = {
    hoveredCwpId: null,
  };

  handleMouseEnterOnCwpButton = (event, cwpId) => {
    this.setState({hoveredCwpId: cwpId});
  };

  handleMouseLeaveOnCwpButton = (event, cwpId) => { // eslint-disable-line no-unused-vars
    this.setState({hoveredCwpId: null});
  }

  render() {
    const {
      cols,
      client,
      sectorCount,
    } = this.props;

    const {
      hoveredCwpId
    } = this.state;

    const RoomStatus = () => (
      <div style={{margin: '0 24px'}} />
    );

    const myCwpId = client.type === 'cwp' ? client.id : null;

    return (
      <Widget
        cols={cols}
        linkTo={uri}
        title={
          <Title
            selectedCwpId={hoveredCwpId || myCwpId}
            sectorCount={sectorCount}
          />
        }
      >
        <div style={{display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
          <ControlRoomLayout
            cwpButton={
              <CwpButton
                onMouseEnter={this.handleMouseEnterOnCwpButton}
                onMouseLeave={this.handleMouseLeaveOnCwpButton}
                style={{margin: 3}}
              />
            }
            roomStatus={<RoomStatus />}
          />
        </div>
      </Widget>
    );
  }
}

import {
  getOpenedCwpCount,
} from '../../selectors/map';

const mapStateToProps = state => ({
  sectorCount: getOpenedCwpCount(state),
});

export default connect(mapStateToProps)(ControlRoomWidget);
