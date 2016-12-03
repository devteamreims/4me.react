import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import getEnv from '4me.env';
const { prettyName } = getEnv(window.FOURME_CONFIG.FOURME_ENV).sectors;

import RaisedButton from 'material-ui/RaisedButton';

import {
  accent1Color,
} from '../../../theme/colors';

import Loader from './Loader';

class SectorSuggestor extends Component {

  componentDidMount() {
    const { fetchSuggestions } = this.props;
    fetchSuggestions();
  }

  componentDidUpdate() {
    // This line forces our container Dialog to reposition itself
    // See devteamreims/4ME#135
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    const {
      isLoading,
      suggestions,
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
        {_.map(suggestions, (s, index) => (
          <RaisedButton
            key={index}
            label={prettyName(s.sectors)}
            onTouchTap={onSuggestionClick(s.sectors)}
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
  isLoading as isSuggestionLoading,
  getSuggestions,
} from '../../selectors/suggest';

import {
  isLoading as isMapLoading,
} from '../../selectors/map';

const mapStateToProps = (state, ownProps) => {
  const {
    cwpId
  } = ownProps;

  const isLoading = isSuggestionLoading(state) || isMapLoading(state);
  const suggestions = _.take(getSuggestions(state, cwpId), 10);

  return {
    isLoading,
    suggestions,
  };
};

import { fetchSuggestions } from '../../actions/suggest';

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    cwpId,
  } = ownProps;

  return {
    fetchSuggestions: () => dispatch(fetchSuggestions(cwpId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SectorSuggestor);
