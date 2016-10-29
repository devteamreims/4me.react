import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import mainTheme from '../../theme';


export default function withMuiTheme(DecoratedComponent) {
  const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

  const wrapped = class extends Component {
    static displayName = `withMuiTheme(${displayName})`;

    static childContextTypes = {
      muiTheme: React.PropTypes.object,
    };

    getChildContext() {
      return {
        muiTheme: getMuiTheme(mainTheme),
      };
    }

    render() {
      return (
        <DecoratedComponent {...this.props} />
      );
    }
  };

  return wrapped;
}
