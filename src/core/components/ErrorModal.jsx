// @flow
import React, { Component } from 'react';

import {
  Card,
  CardActions,
  CardTitle,
  CardText,
} from 'material-ui/Card';

const style = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inside: {
    flexGrow: 0,
    minWidth: 400,
  },
};

class ErrorModal extends Component {
  props: {
    title?: string,
    children: ?React.Element<*>,
    actions?: React.Element<*>,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const {
      title,
      children,
      actions,
    } = this.props;

    return (
      <div style={style.wrapper}>
        <Card style={style.inside}>
          {title &&
            <CardTitle title={title} />
          }
          <CardText>{children}</CardText>
          {actions &&
            <CardActions>{actions}</CardActions>
          }
        </Card>
      </div>
    );
  }
}

export default ErrorModal;
