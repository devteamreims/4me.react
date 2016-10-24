import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';


import SectorPicker from './SectorPicker';
import SectorSuggestor from './SectorSuggestor';
import CwpEnabler from './CwpEnabler';
import Loader from './Loader';


class CwpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = this._getDefaultState();
  }

  _getDefaultState() {
    return {
      tempSectors: _.clone(this.props.boundSectors),
      isDisabled: this.props.isDisabled,
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};

    // Discard any state when we close or open the dialog
    if(nextProps.open !== this.props.open) {
      this.setState(this._getDefaultState);
      return;
    }

    if(nextProps.isDisabled !== this.props.isDisabled) {
      // Here we have an external prop change, discard internal state
      Object.assign(newState, {
        isDisabled: nextProps.isDisabled,
      });
    }


    Object.assign(newState, {
      tempSectors: _.clone(nextProps.boundSectors),
    });

    this.setState(newState);
  }

  addSector = (state, sector) => {
    let tempSectors = _(state)
      .concat(sector)
      .concat(...this.props.boundSectors)

    return tempSectors.compact().uniq().value();
  };

  removeSector = (state, sector) => {
    let tempSectors = _(state)
      .without(sector)
      .concat(...this.props.boundSectors);


    return tempSectors.compact().uniq().value();
  };

  toggleSector = (state, sector) => {

    if(_.includes(state, sector)) {
      return this.removeSector(state, sector);
    }

    return this.addSector(state, sector);
  };

  handleToggleSectors = (sectors) => (ev, checked) => {
    const state = this.state.tempSectors;
    const tempSectors = _.reduce(sectors, this.toggleSector, state);
    this.setState({tempSectors});
  };

  handleSuggestion = (sectors) => (ev) => {
    console.log('Selecting sectors from suggestion !');
    console.log(sectors);
    this.props.bindSectorsToCwp(this.props.cwpId, sectors)
      .then(() => this.props.onRequestClose());
  };

  handleConfirm = (ev) => {
    console.log('New sectors are :');
    console.log(this.state.tempSectors);

    const {
      cwpId,
    } = this.props;

    const shouldUpdateCwpStatus = this.state.isDisabled !== this.props.isDisabled;
    const shouldEnableCwp = shouldUpdateCwpStatus && !this.state.isDisabled;
    const shouldDisableCwp = shouldUpdateCwpStatus && this.state.isDisabled;

    if(shouldUpdateCwpStatus) {
      console.log(`Changing cwp ${cwpId} status : isDisabled : ${this.props.isDisabled} => ${this.state.isDisabled}`);
      this.props.setStatus(cwpId, this.state.isDisabled);
    }

    this.props.bindSectorsToCwp(cwpId, this.state.tempSectors)
      .then(() => this.props.onRequestClose());
  };

  handleEnableDisable = (ev, toggleEnabled) => {
    if(toggleEnabled) {
      this.setState({isDisabled: false});
    } else {
      this.setState({isDisabled: true});
    }
  };

  computeTitleString = () => {
    const {
      prettyBoundSectors,
      prettySectors,
      title,
    } = this.props;

    const {
      tempSectors,
    } = this.state;

    const prettyTempSectors = prettySectors(tempSectors);

    if(prettyTempSectors === '' && prettyBoundSectors === '') {
      return title;
    }

    let fullTitle = `${title}`;

    if(prettyBoundSectors !== '') {
      fullTitle += ` : ${prettyBoundSectors}`;
    }

    if(prettyTempSectors !== prettyBoundSectors) {
      fullTitle += ` => ${prettyTempSectors}`;
    }

    return fullTitle;
  };

  render() {
    const {
      title,
      boundSectors,
      prettyBoundSectors,
      prettySectors,
      open,
      cwpId,
      hasNoSectorsBound,
      backupedRadios,
      isLoading,
      ...other
    } = this.props;

    const {
      isDisabled,
      tempSectors,
    } = this.state;

    const actionStyle = {
      marginLeft: 12,
    };

    const actions = [
      <FlatButton
        label="CANCEL"
        onTouchTap={this.props.onRequestClose}
        style={actionStyle}
      />,
      <FlatButton
        label="CONFIRM"
        onTouchTap={this.handleConfirm}
        style={actionStyle}
        disabled={isLoading}
      />
    ];

    const style = {
      title: {
        cursor: 'pointer',
        color: this.context.muiTheme.palette.textColor,
      },
    };

    const fullTitle = (
      <AppBar
        title={<span style={style.title}>{this.computeTitleString()}</span>}
        showMenuIconButton={false}
        style={{padding: '0 12px', marginBottom: '12px'}}
      />
    );

    let content = [];

    if(isLoading) {
      content = [
        ...content,
        <Loader />
      ];
    } else {
      if(!isDisabled) {
        content = [
          ...content,
          <SectorSuggestor
            key="sector-suggestor"
            cwpId={cwpId}
            onSuggestionClick={this.handleSuggestion}
          />,
          <SectorPicker
            key="sector-picker"
            boundSectors={boundSectors}
            tempSectors={tempSectors}
            toggleSectors={this.handleToggleSectors}
            backupedRadios={backupedRadios}
          />
        ];
      }

      if(hasNoSectorsBound) {
        content = [
          <div
            style={{marginBottom: 10}}
          >
            <CwpEnabler
              key="cwp-enabler"
              isEnabled={!isDisabled}
              onStatusChange={this.handleEnableDisable}
            />
          </div>,
          ...content
        ];
      }
    }

    return (
      <Dialog
        open={open}
        title={fullTitle}
        //titleStyle={{backgroundColor: 'blue'}}
        style={{padding: 0, margin: 0}}
        contentStyle={{maxWidth: 'none'}}
        actions={actions}
        autoScrollBodyContent={true}
        {...other}
      >
        {content}
      </Dialog>
    );
  }
}

CwpDialog.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

import { getPrettifySectors } from '../../../core/selectors/sectorTree';

import {
  getSectorsByCwpId,
  isDisabled as isCwpDisabled,
  isEmpty as isCwpEmpty,
  isLoading as isMapLoading,
} from '../../selectors/map';

import {
  getName,
  getBackupedRadios,
} from '../../selectors/cwp';

const mapStateToProps = (state, ownProps) => {
  const {
    cwpId,
  } = ownProps;

  const cwpName = getName(state, cwpId);
  const boundSectors = getSectorsByCwpId(state, cwpId);
  const prettySectors = getPrettifySectors(state);
  const prettyBoundSectors = prettySectors(boundSectors);
  const isDisabled = isCwpDisabled(state, cwpId);
  const hasNoSectorsBound = isCwpEmpty(state, cwpId);
  const backupedRadios = getBackupedRadios(state, cwpId);

  const title = `${cwpName}`;

  return {
    title,
    boundSectors,
    prettyBoundSectors,
    prettySectors,
    isDisabled,
    hasNoSectorsBound,
    backupedRadios,
    isLoading: isMapLoading(state),
  };
};

import {
  bindSectorsToCwp,
  setStatus,
} from '../../actions/map';

const mapDispatchToProps = {
  bindSectorsToCwp,
  setStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(CwpDialog);
