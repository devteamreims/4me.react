import React, { Component } from 'react';

import { connect } from 'react-redux';

export class Status extends Component {

  render() {
    return (
      <div>
        Status Component !!
      </div>
    );
  }
}


const mapDispatchToProps = {
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
