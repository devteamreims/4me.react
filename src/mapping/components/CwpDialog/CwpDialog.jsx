import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';
import Divider from 'material-ui/lib/divider';


import SectorPicker from './SectorPicker';
import SectorSuggestor from './SectorSuggestor';


class CwpDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempSectors: _.clone(props.boundSectors),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tempSectors: _.clone(nextProps.boundSectors),
    });
  }

  addSector = (state, sector) => {
    const tempSectors = _(state)
      .concat(sector)
      .concat(...this.props.boundSectors)
      .uniq()
      .value();

    return tempSectors;
  };

  removeSector = (state, sector) => {
    const tempSectors = _(state)
      .without(sector)
      .concat(...this.props.boundSectors)
      .uniq()
      .value();

    return tempSectors;
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
    this.props.bindSectorsToCwp(this.props.cwpId, this.state.tempSectors)
      .then(() => this.props.onRequestClose());
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
      ...other
    } = this.props;

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
      />
    ];

    const fullTitle = (
      <AppBar
        title={this.computeTitleString()}
        iconElementLeft={<div></div>}
      />
    );

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
        <SectorSuggestor
          cwpId={cwpId}
          onSuggestionClick={this.handleSuggestion}
        />
        <SectorPicker
          boundSectors={boundSectors}
          tempSectors={this.state.tempSectors}
          toggleSectors={this.handleToggleSectors}
        />
      </Dialog>
    );
  }
}

import { getPrettifySectors } from '../../../core/selectors/sectorTree';

import {
  getSectorsByCwpId,
} from '../../selectors/map';

import {
  getName,
} from '../../selectors/cwp';

const mapStateToProps = (state, ownProps) => {
  const {
    cwpId,
  } = ownProps;

  const cwpName = getName(state, cwpId);
  const boundSectors = getSectorsByCwpId(state, cwpId);
  const prettySectors = getPrettifySectors(state);
  const prettyBoundSectors = prettySectors(boundSectors);

  const title = `${cwpName}`;
  return {
    title,
    boundSectors,
    prettyBoundSectors,
    prettySectors,
  };
};

import {
  bindSectorsToCwp,
} from '../../actions/map';

const mapDispatchToProps = {
  bindSectorsToCwp,
};

export default connect(mapStateToProps, mapDispatchToProps)(CwpDialog);
