// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';

import R from 'ramda';

import Widget from '../../../../shared/components/Widget';
import Controls from '../FlightListControls';
import StatusMessage from '../StatusMessage';
import CompactFlightList from './CompactFlightList';

type StateProps = {
  shouldDisplayList: boolean,
  shouldDisplayMessage: boolean,
};

type Props = StateProps & {
  cols: number,
  sectors: Array<string>,
  pathName: string,
};

class WidgetComponent extends Component {
  props: Props;

  render() {
    const {
      cols,
      sectors,
      shouldDisplayList,
      shouldDisplayMessage,
      pathName,
    } = this.props;

    if(!shouldDisplayList) {
      return (
        <Widget
          cols={cols}
          linkTo={pathName}
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
        linkTo={pathName}
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
