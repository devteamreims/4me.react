import React, {Component} from 'react';
import { Provider } from 'react-redux';

import App from './core/components/App';
import { getOrgans } from './organs';

class Root extends Component {
  constructor(props) {
    super(props);
    const { store } = props;

    this._organs = getOrgans(store);
  }

  render() {
    const {
      store,
    } = this.props;

    const organs = this._organs;

    const DevTools = process.env.NODE_ENV === 'development' && require('./dev/DevTools').default;

    return (
      <Provider store={store}>
        <div id="main-container">
          <App organs={organs} />
          {DevTools && <DevTools />}
        </div>
      </Provider>
    );
  }
}

export default Root;
