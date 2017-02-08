// @flow
import React, { Component } from 'react';

import { HOC as formsyfy } from 'formsy-react';

type Props = {
  getValue: * => *,
  setValue: * => *,
};

class FormsyHidden extends Component {
  props: Props;

  render() {
    const {
      getValue,
      setValue,
    } = this.props;

    return (
      <input
        type="hidden"
        value={getValue()}
        onChange={(ev) => setValue(ev.target.value)}
      />
    );
  }
}

export default formsyfy(FormsyHidden);
