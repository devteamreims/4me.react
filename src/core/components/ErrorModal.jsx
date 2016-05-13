import React, { Component } from 'react';

import Paper from 'material-ui/lib/paper';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

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
            <CardTitle title={title}/>
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
