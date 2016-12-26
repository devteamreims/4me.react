import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import R from 'ramda';

import getEnv from '4me.env';
const { prettyName } = getEnv(window.FOURME_CONFIG.FOURME_ENV).sectors;
const { getClientById } = getEnv(window.FOURME_CONFIG.FOURME_ENV).clients;

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

import SectorPicker from './SectorPicker';
import SectorSuggestor from './SectorSuggestor';
import CwpEnabler from './CwpEnabler';
import Loader from './Loader';


class CwpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = this._getDefaultState();
  }

  _getDefaultState() { // eslint-disable-line
    return {
      tempSectors: _.clone(this.props.boundSectors),
      isDisabled: this.props.isDisabled,
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};

    // Discard any state when we close the dialog
    if(!nextProps.open) {
      this.setState(this._getDefaultState);
      return;
    }

    if(nextProps.isDisabled !== this.props.isDisabled) {
      // Here we have an external prop change, discard internal state
      Object.assign(newState, {
        isDisabled: nextProps.isDisabled,
      });
    }

    if(nextProps.cwpId !== this.props.cwpId) {
      // Here, we know we changed CWP, reset internal state
      Object.assign(newState, {
        tempSectors: _.clone(nextProps.boundSectors),
        isDisabled: nextProps.isDisabled,
      });
    }


    this.setState(newState);
  }

  addSector = (state, sector) => {
    const tempSectors = _(state)
      .concat(sector)
      .concat(...this.props.boundSectors);

    return tempSectors.compact().uniq().value();
  };

  removeSector = (state, sector) => {
    const tempSectors = _(state)
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

  handleToggleSectors = (sectors) => (ev, checked) => { // eslint-disable-line no-unused-vars
    const state = this.state.tempSectors;
    const tempSectors = _.reduce(sectors, this.toggleSector, state);
    this.setState({tempSectors});
  };

  handleSuggestion = (sectors) => (ev) => { // eslint-disable-line no-unused-vars
    console.log('Selecting sectors from suggestion !');
    console.log(sectors);
    this.props.bindSectorsToCwp(this.props.cwpId, sectors)
      .then(() => this.props.onRequestClose());
  };

  handleConfirm = (ev) => { // eslint-disable-line no-unused-vars
    console.log('New sectors are :');
    console.log(this.state.tempSectors);

    const {
      cwpId,
    } = this.props;

    const shouldUpdateCwpStatus = this.state.isDisabled !== this.props.isDisabled;

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
      title,
      boundSectors,
    } = this.props;

    const {
      tempSectors,
    } = this.state;

    let fullTitle = `${title}`;

    if(!R.isEmpty(boundSectors)) {
      fullTitle += ` : ${prettyName(boundSectors, '+')}`;
    }

    const areDifferentFromBound = R.pipe(
      R.symmetricDifference(boundSectors),
      R.isEmpty,
      R.not,
    );

    if(areDifferentFromBound(tempSectors)) {
      fullTitle += ` => ${prettyName(tempSectors, '+')}`;
    }

    return fullTitle;
  };

  render() {
    const {
      title, // eslint-disable-line no-unused-vars
      boundSectors,
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
        <Loader key="loader" />
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
            key="cwp-enabler"
          >
            <CwpEnabler
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

import {
  getSectorsByCwpId,
  isDisabled as isCwpDisabled,
  isEmpty as isCwpEmpty,
  isLoading as isMapLoading,
} from '../../selectors/map';

const mapStateToProps = (state, ownProps) => {
  const {
    cwpId,
  } = ownProps;

  const client = getClientById(cwpId);
  const cwpName = client ? client.name : `P${cwpId}`;

  const boundSectors = getSectorsByCwpId(state, cwpId);
  const isDisabled = isCwpDisabled(state, cwpId);
  const hasNoSectorsBound = isCwpEmpty(state, cwpId);
  // TODO: Reimplement backuped radios
  const backupedRadios = [];

  const title = `${cwpName}`;

  return {
    title,
    boundSectors,
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
