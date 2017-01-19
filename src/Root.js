import React, {Component} from 'react';
import { Provider } from 'react-redux';

import App from './core/components/App';
import configureStore from './store/configureStore';

import { DarkTheme } from './shared/components/Theme';

import DevTools from './dev/DevTools';

export class Root extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore();
  }

  render() {
    return (
      <DarkTheme>
        <Provider store={this.store}>
          <div id="main-container">
            {this.props.children}
          </div>
        </Provider>
      </DarkTheme>
    );
  }
}

const AppRoot = () => {
  const showDevTools = process.env.NODE_ENV === 'development';
  return (
    <Root>
      <App />
      {showDevTools && <DevTools />}
    </Root>
  );
};

export default AppRoot;
