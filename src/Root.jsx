import React, {Component} from 'react';
import { Provider } from 'react-redux';

import App from './core/components/App';

class Root extends Component {
  render() {
    const {
      store,
    } = this.props;

    const DevTools = process.env.NODE_ENV === 'development' && require('./dev/DevTools').default;

    return (
      <Provider store={store}>
        <div id="main-container">
          <App />
          {DevTools && <DevTools />}
        </div>
      </Provider>
    );
  }
}

export default Root;
