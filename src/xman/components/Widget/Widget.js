// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import Widget from '../../../core/components/Dashboard/Widget';
import Controls from '../FlightListControls';
import StatusMessage from '../StatusMessage';
import CompactFlightList from './CompactFlightList';

import { uri } from '../../';

type Props = {
  cols: number,
  sectors: Array<string>,
  shouldDisplayList: boolean,
  shouldDisplayMessage: boolean,
};

class WidgetComponent extends Component {
  props: Props;

  render() {
    const {
      cols,
      sectors,
      shouldDisplayList,
      shouldDisplayMessage,
    } = this.props;

    if(!shouldDisplayList) {
      return (
        <Widget
          cols={cols}
          title="XMAN : Error !"
        />
      );
    }

    // If we have no sectors bound, do not display filter controls
    const showFilterControl: boolean = !R.isEmpty(sectors);
    const title = showFilterControl ?
      <Controls showFilterControl={showFilterControl} /> :
      undefined;

    return (
      <Widget
        cols={cols}
        title={title}
        linkTo={uri}
      >
        {shouldDisplayMessage &&
          <StatusMessage
            key="status-message-0"
            style={{textAlign: 'center', margin: 0, padding: 10}}
          />
        }
        <CompactFlightList />
      </Widget>
    );
  }
}

import {
  shouldDisplayList,
  shouldDisplayMessage,
} from '../../selectors/status';

const mapStateToProps = state => ({
  shouldDisplayList: shouldDisplayList(state),
  shouldDisplayMessage: shouldDisplayMessage(state),
});

export default connect(mapStateToProps)(WidgetComponent);
