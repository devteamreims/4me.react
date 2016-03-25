import React, { Component } from 'react';

export default class LoadingScreen extends Component {
  render() {
    const message = this.props.message || 'Loading ...';
    return (
      <div>
        {message}
        {this.props.children}
      </div>
    );
  }
}
