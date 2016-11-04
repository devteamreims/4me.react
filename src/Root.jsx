import React, {Component} from 'react';
import { Provider } from 'react-redux';

import App from './core/components/App';
import configureStore from './store/configureStore';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import mainTheme from './theme';

const theme = getMuiTheme(mainTheme);

import DevTools from './dev/DevTools';

class Root extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore();
  }

  render() {
    const showDevTools = process.env.NODE_ENV === 'development';

    return (
      <MuiThemeProvider muiTheme={theme} >
        <Provider store={this.store}>
          <div id="main-container">
            <App />
            {showDevTools && <DevTools />}
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default Root;
