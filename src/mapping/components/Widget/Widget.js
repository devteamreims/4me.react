import React, {Component} from 'react';
import { connect } from 'react-redux';

import Widget from '../../../core/components/Dashboard/Widget';

import ControlRoomLayout from '../ControlRoomLayout';
import CwpButton from './CwpButton';
import Title from './Title';

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
        title={
          <Title
            selectedCwpId={hoveredCwpId || myCwpId}
            sectorCount={sectorCount}
          />
        }
      >
        <div style={{display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
          <ControlRoomLayout
            cwpButtonComponent={
              <CwpButton
                onMouseEnter={this.handleMouseEnterOnCwpButton}
                onMouseLeave={this.handleMouseLeaveOnCwpButton}
                style={{margin: 3}}
              />
            }
            roomStatusComponent={<RoomStatus />}
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
