import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import IconButton from 'material-ui/IconButton';
import MicOk from 'material-ui/svg-icons/av/mic';
import MicOff from 'material-ui/svg-icons/av/mic-off';
import Popover from 'material-ui/Popover';

import {
  success,
  error,
} from '../../../theme/colors';

class EmergencyFrequency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      isPopoverOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };


  render() {
    const {
      areRadiosOk,
      nonBackupedFrequencies,
      ...other
    } = this.props;

    const {
      isPopoverOpen,
      anchorEl,
    } = this.state;

    let color = success;
    let Icon = MicOk;
    let InsidePopover = (
      <p>All CWPs have proper radio backup</p>
    );

    if(!areRadiosOk) {
      color = error;
      Icon = MicOff;
      InsidePopover = [
        <h3>CWPs without radio backup</h3>,
        ..._.map(nonBackupedFrequencies, cwp => {
          return (
            <p>{cwp.name} : {cwp.nonBackupedFrequencies.join(',')}</p>
          );
        }),
      ];
    }

    return (
      <span>
        <IconButton onTouchTap={this.handleTouchTap}>
          <Icon {...other} color={color} />
        </IconButton>
        <Popover
          open={isPopoverOpen}
          anchorEl={anchorEl}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{horizontal: 'right', vertical: 'center'}}
          targetOrigin={{horizontal: 'left', vertical: 'center'}}
        >
          <div style={{margin: 10}}>
            {InsidePopover}
          </div>
        </Popover>
      </span>
    );
  }
}

import {
  areRadiosOk,
  getAllNonBackupedFrequencies,
} from '../selectors/frequencies';

const mapStateToProps = (state) => {
  return {
    areRadiosOk: areRadiosOk(state),
    nonBackupedFrequencies: getAllNonBackupedFrequencies(state)
  };
};

export default connect(mapStateToProps)(EmergencyFrequency);
