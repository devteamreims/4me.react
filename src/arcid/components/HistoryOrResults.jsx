import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import History from './History';
import Results from './Results';

import theme from '../../theme';

const styles = {
  outer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    flexShrink: '1',
  },
  content: {
    flexGrow: '1',
    flexShrink: '1',
    overflowY: 'auto',
  },
  tab: {
    color: theme.palette.textColor,
  },
};

class HistoryOrResults extends Component {

  constructor(props) {
    super(props);
  }


  handleChange = (visibleTab) => {
    const {
      showResults,
      showHistory,
    } = this.props;
    if(visibleTab === 'history') {
      showHistory();
    } else if(visibleTab === 'results') {
      showResults();
    }
  };

  render() {
    const {
      visibleTab,
    } = this.props;

    let Content = <span></span>;

    if(visibleTab === 'history') {
      Content = <History />;
    } else if(visibleTab === 'results') {
      Content = <Results />
    }



    return (
      <div style={styles.outer}>
        <Tabs
          value={visibleTab}
          onChange={this.handleChange}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: '0',
          }}
        >
          <Tab
            label="History"
            value="history"
            style={styles.tab}
          />
          <Tab
            label="Results"
            value="results"
            style={styles.tab}
          />
        </Tabs>
        <div
          style={styles.content}
        >
          {Content}
        </div>
      </div>
    );
  }
}

import {
  getVisibleTab,
} from '../selectors/resultTabs';

const mapStateToProps = state => {

  const visibleTab = 'history';

  return {
    visibleTab: getVisibleTab(state),
  };
};

import {
  showResults,
  showHistory,
} from '../actions/resultTabs';

const mapDispatchToProps = {
  showResults,
  showHistory,
};


export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrResults);
