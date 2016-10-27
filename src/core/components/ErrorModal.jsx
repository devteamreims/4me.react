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

ErrorModal.propTypes = {
  title: React.PropTypes.string,
};

export default ErrorModal;
