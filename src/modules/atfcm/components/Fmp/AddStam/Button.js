// @flow
import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

type Props = {
  onClick?: () => void,
};

class AddStamButton extends Component {
  props: Props;

  render() {
    return (
      <FloatingActionButton {...this.props}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

export default AddStamButton;
