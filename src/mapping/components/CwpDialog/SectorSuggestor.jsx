import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import getEnv from '4me.env';
const { prettyName } = getEnv(window.FOURME_CONFIG.FOURME_ENV).sectors;
const { getSectorSuggestions } = getEnv(window.FOURME_CONFIG.FOURME_ENV).clients;

import RaisedButton from 'material-ui/RaisedButton';

import {
  accent1Color,
} from '../../../theme/colors';

import Loader from './Loader';

class SectorSuggestor extends Component {
  componentDidUpdate() {
    // This line forces our container Dialog to reposition itself
    // See devteamreims/4ME#135
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    const {
      isLoading,
      suggestions = [],
      onSuggestionClick,
    } = this.props;


    if(isLoading) {
      return <Loader />;
    }

    const buttonStyle = {
      marginRight: 12,
      marginBottom: 12,
    };

    const labelStyle = {
      fontSize: 20,
    };


    return (
      <div>
        {suggestions.map((s, index) => (
          <RaisedButton
            key={`suggestion-${index}`}
            label={prettyName(s)}
            onTouchTap={onSuggestionClick(s)}
            style={buttonStyle}
            labelStyle={labelStyle}
            backgroundColor={accent1Color}
          />
        ))}
      </div>
    );
  }
}

SectorSuggestor.propTypes = {
  cwpId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  onSuggestionClick: React.PropTypes.func.isRequired,
};

import {
  isLoading as isMapLoading,
  getMap,
} from '../../selectors/map';

const mapStateToProps = (state, ownProps) => {
  const {
    cwpId,
  } = ownProps;

  const isLoading = isMapLoading(state);
  const rawMap = getMap(state);

  // Our state map is not compliant with what's expected in 4me.env
  const map = R.map(mapItem => {
    return {
      clientId: mapItem.cwpId,
      sectors: mapItem.sectors || [],
    };
  }, rawMap);

  const suggestions = getSectorSuggestions(map, cwpId);

  return {
    isLoading,
    suggestions,
  };
};


export default connect(mapStateToProps)(SectorSuggestor);
