import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';

import _ from 'lodash';

class SectorSuggestor extends Component {

  componentWillMount() {
    console.log('Mounting Suggestor !');
    console.log(this.props.cwpId);
    this.props.fetchSuggestions();
  }

  render() {
    let inner;

    if(this.props.isLoading) {
      const style = {
        container: {
          textAlign: 'center',
        },
        refresh: {
          display: 'inline-block',
          position: 'relative',
        },
      };

      inner = (
        <div style={style.container}>
          <RefreshIndicator
            left={0}
            top={0}
            status="loading"
            style={style.refresh}
          />
        </div>
      );

    } else {
      const buttonStyle = {
        marginRight: 12,
        marginBottom: 12,
      };

      inner = _.map(this.props.suggestions, (s, index) =>
        (
          <RaisedButton
            key={index}
            label={s.prettySectors}
            onTouchTap={this.props.onSuggestionClick(s.sectors)}
            style={buttonStyle}
            primary
          />
        )
      );
    }

    return (
      <div>{inner}</div>
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

import { getPrettifySectors } from '../../../core/selectors/sectorTree';

const mapStateToProps = (state, ownProps) => {
  const {
    cwpId
  } = ownProps;

  const isLoading = isSuggestionLoading(state) || isMapLoading(state);
  const prettySectors = getPrettifySectors(state);
  const suggestions = _.map(getSuggestions(state, cwpId), s =>
    ({
      prettySectors: prettySectors(s.sectors),
      ...s,
    })
  );



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
