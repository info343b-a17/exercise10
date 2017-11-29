import React, { Component } from 'react';

export default class FlatButton extends Component {
  render() {
    return (
      <button>{this.props.children}</button>
    )
  }
}