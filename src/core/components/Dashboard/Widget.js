// @flow
import React, { Component } from 'react';

import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { Link } from 'react-router';

const styles = {
  gridTile: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridTileChildren: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    maxHeight: '100%',
    overflowY: 'auto',
    padding: 0,
  },
};

const Wrapper = props => <Paper zDepth={3} {...props} />;

type Props = {
  cols: number,
  children?: React.Element<any>,
  title?: null | string | React.Element<any>,
  linkTo?: string,
}

class Widget extends Component {
  props: Props;

  static defaultProps: Props = {
    cols: 1,
    // If title is null or undefined, material-ui will not render the title bar
    title: <span />,
  };

  _renderIcon() {
    const { linkTo } = this.props;

    if(!linkTo) {
      return null;
    }


    // See more here : https://react-router.now.sh/Link about react-router
    return (
      <Link to={linkTo}>{
        ({ transition }) => (
          <IconButton onClick={transition}>
            <ArrowForward />
          </IconButton>
        )
      }</Link>
    );
  }

  render() {
    const {
      cols,
      children,
      title,
    } = this.props;


    const innerStyle = Object.assign({}, styles.gridTileChildren);

    // We still allow users to pass 'null' as title
    // The effect will be to remove the title bar
    // Therefore we only add padding if title is not null
    if(title !== null) {
      Object.assign(innerStyle, {
        // Add 48px padding to our widget content
        // 48px is the height of the material-ui title bar
        // See : https://github.com/callemall/material-ui/blob/master/src/GridList/GridTile.js
        paddingBottom: 48,
      });
    }

    return (
      <GridTile
        style={styles.gridTile}
        cols={cols}
        title={title}
        actionIcon={this._renderIcon()}
        containerElement={<Wrapper />}
        titleBackground="rgba(0, 0, 0, 0.8)"
      >
        <div style={innerStyle}>
          {children}
        </div>
      </GridTile>
    );
  }
}


export default Widget;
